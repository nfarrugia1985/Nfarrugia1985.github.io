'use strict';

/**
 * Lift & Cut 2.4 — adaptive weight-loss coaching engine.
 *
 * This is a transparent, local-first implementation inspired by the general
 * concept of combining trend weight with logged energy intake. It is not the
 * proprietary MacroFactor algorithm and is not affiliated with MacroFactor.
 */

const LC_COACHING = {
  VERSION: '2.4.0',
  ENERGY_KCAL_PER_KG: 7700,
  TREND_ALPHA: 0.24,
  WINDOWS: [14, 21, 28],
  MIN_TDEE: 900,
  MAX_TDEE: 6000,
  STATUS_SCORES: {
    'Complete': 100,
    'Mostly complete': 80,
    'Partial': 45,
    'Not logged': 0
  }
};

function coachingSettingDefaults() {
  return {
    dietView: 'diary',
    coachingEnabled: true,
    coachingTargetRatePctPerWeek: 0.5,
    coachingRateMinPctPerWeek: 0.25,
    coachingRateMaxPctPerWeek: 0.75,
    coachingMaxAdjustmentKcal: 150,
    coachingMinimumCalories: '',
    coachingWeighInGoalPerWeek: 4,
    coachingCompleteDaysGoalPerWeek: 5,
    coachingExcludeRflRecommendations: true,
    coachingShowMethodDetails: false
  };
}

function ensureCoachingState() {
  if (!state || typeof state !== 'object') return;
  const defaults = coachingSettingDefaults();
  state.settings ||= {};
  Object.entries(defaults).forEach(([key, value]) => {
    if (state.settings[key] === undefined || state.settings[key] === null) state.settings[key] = value;
  });
  ['nutritionDays', 'targetAdjustments', 'weeklyReviews'].forEach(key => {
    if (!Array.isArray(state[key])) state[key] = [];
  });
  (state.nutritionDays || []).forEach(row => {
    row.id ||= uid('nutrition-day');
    row.status ||= 'Mostly complete';
    row.completenessPct = row.completenessPct === '' || row.completenessPct === undefined
      ? (LC_COACHING.STATUS_SCORES[row.status] ?? 0)
      : clamp(toNum(row.completenessPct), 0, 100);
    row.untrackedKcal = Math.max(0, toNum(row.untrackedKcal));
    row.excludeFromEngine = Boolean(row.excludeFromEngine);
    row.updatedAt ||= nowISO();
  });
  (state.targetAdjustments || []).forEach(row => {
    row.id ||= uid('target-change');
    row.applied = row.applied !== false;
    row.updatedAt ||= nowISO();
  });
  (state.weeklyReviews || []).forEach(row => {
    row.id ||= uid('review');
    row.updatedAt ||= nowISO();
  });
  (state.dietPhases || []).forEach(phase => normaliseCoachingPhase(phase));
}

function normaliseCoachingPhase(phase) {
  if (!phase) return phase;
  phase.goalType ||= phase.mode === 'Maintenance / transition' ? 'Maintain weight' : phase.mode === 'RFL / PSMF' ? 'RFL manual' : 'Lose weight';
  if (phase.targetRatePctPerWeek === undefined) phase.targetRatePctPerWeek = phase.mode === 'Normal / moderate deficit' ? toNum(state?.settings?.coachingTargetRatePctPerWeek) || 0.5 : '';
  if (phase.targetWeightKg === undefined) phase.targetWeightKg = '';
  if (phase.calorieTargetAtStart === undefined) phase.calorieTargetAtStart = phase.mode === 'RFL / PSMF' ? state?.settings?.rflCalorieTarget || '' : state?.settings?.normalCalorieTarget || '';
  if (phase.proteinTargetAtStart === undefined) phase.proteinTargetAtStart = phase.mode === 'RFL / PSMF' ? state?.settings?.rflProteinTarget || '' : state?.settings?.normalProteinTarget || '';
  return phase;
}

function coachingAddDays(dateISO, amount) {
  const date = parseDate(dateISO);
  if (!date) return '';
  date.setDate(date.getDate() + amount);
  return localDateISO(date);
}

function coachingDateRange(startISO, endISO) {
  const start = parseDate(startISO), end = parseDate(endISO);
  if (!start || !end || start > end) return [];
  const rows = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    rows.push(localDateISO(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return rows;
}

function coachingStartOfWeek(dateISO) {
  const date = parseDate(dateISO) || new Date();
  const day = date.getDay();
  const offset = state.settings.weekStartsMonday !== false ? (day === 0 ? -6 : 1 - day) : -day;
  date.setDate(date.getDate() + offset);
  return localDateISO(date);
}

function coachingPhaseForDate(dateISO) {
  const phases = [...(state.dietPhases || [])]
    .filter(p => p.startDate && p.startDate <= dateISO)
    .sort((a, b) => String(b.startDate).localeCompare(String(a.startDate)));
  return phases.find(p => {
    const end = p.actualEndDate || (p.status === 'Active' ? '9999-12-31' : p.plannedEndDate || '9999-12-31');
    return dateISO <= end;
  }) || null;
}

function coachingModeForDate(dateISO) {
  return coachingPhaseForDate(dateISO)?.mode || state.settings.dietMode || 'Normal / moderate deficit';
}

function coachingTargetSet(mode) {
  const rfl = mode === 'RFL / PSMF';
  const prefix = rfl ? 'rfl' : 'normal';
  return {
    kcal: toNum(state.settings[`${prefix}CalorieTarget`]),
    protein: toNum(state.settings[`${prefix}ProteinTarget`]),
    carbs: toNum(state.settings[`${prefix}CarbTarget`]),
    fat: toNum(state.settings[`${prefix}FatTarget`])
  };
}

function coachingCalorieTargetForDate(dateISO) {
  const phase = coachingPhaseForDate(dateISO);
  const mode = phase?.mode || coachingModeForDate(dateISO);
  let target = phase?.calorieTargetAtStart !== '' && phase?.calorieTargetAtStart !== undefined
    ? toNum(phase.calorieTargetAtStart)
    : coachingTargetSet(mode).kcal;
  const relevant = [...(state.targetAdjustments || [])]
    .filter(x => x.applied !== false && x.date && x.date <= dateISO && (!phase || !x.phaseId || x.phaseId === phase.id))
    .sort((a, b) => String(b.date + (b.updatedAt || '')).localeCompare(String(a.date + (a.updatedAt || ''))));
  if (relevant[0]?.newTargetKcal) target = toNum(relevant[0].newTargetKcal);
  if (phase?.status === 'Active' && dateISO === localDateISO()) target = coachingTargetSet(mode).kcal || target;
  return target;
}

function coachingProteinTargetForDate(dateISO) {
  const phase = coachingPhaseForDate(dateISO);
  const mode = phase?.mode || coachingModeForDate(dateISO);
  if (phase?.proteinTargetAtStart !== '' && phase?.proteinTargetAtStart !== undefined) return toNum(phase.proteinTargetAtStart);
  return coachingTargetSet(mode).protein;
}

function coachingWeightObservations() {
  const grouped = new Map();
  (state.bodyMetrics || []).forEach(row => {
    const value = toNum(row.weightKg);
    if (!row.date || value <= 0) return;
    const item = grouped.get(row.date) || {sum: 0, count: 0};
    item.sum += value;
    item.count += 1;
    grouped.set(row.date, item);
  });
  return [...grouped.entries()]
    .map(([date, item]) => ({date, weight: item.sum / item.count}))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function coachingTrendSeries(endDate = localDateISO()) {
  const observations = coachingWeightObservations().filter(x => x.date <= endDate);
  if (!observations.length) return [];
  const observedMap = new Map(observations.map(x => [x.date, x.weight]));
  const dates = coachingDateRange(observations[0].date, endDate);
  let trend = observations[0].weight;
  let lastObservedDate = observations[0].date;
  const result = [];
  dates.forEach((date, index) => {
    const observed = observedMap.get(date);
    if (index === 0) trend = observed;
    else if (observed !== undefined) {
      const gap = Math.max(1, daysBetween(lastObservedDate, date));
      const alpha = 1 - Math.pow(1 - LC_COACHING.TREND_ALPHA, gap);
      const innovation = observed - trend;
      const cap = Math.max(1.4, trend * 0.012 * Math.sqrt(gap));
      trend = trend + alpha * clamp(innovation, -cap, cap);
      lastObservedDate = date;
    }
    result.push({date, scale: observed === undefined ? '' : observed, trend, observed: observed !== undefined});
  });
  return result;
}

function coachingTrendConfidence(endDate = localDateISO()) {
  const observations = coachingWeightObservations().filter(x => x.date <= endDate);
  if (!observations.length) return {score: 0, label: 'Low', detail: 'No weigh-ins'};
  const cutoff28 = coachingAddDays(endDate, -27);
  const recent = observations.filter(x => x.date >= cutoff28);
  const last = observations[observations.length - 1];
  const age = Math.max(0, daysBetween(last.date, endDate));
  const span = recent.length > 1 ? daysBetween(recent[0].date, recent[recent.length - 1].date) + 1 : 1;
  let score = Math.min(55, recent.length / 16 * 55) + Math.min(25, span / 21 * 25);
  score += age <= 1 ? 20 : age <= 3 ? 14 : age <= 7 ? 7 : 0;
  score = clamp(Math.round(score), 0, 100);
  return {score, label: coachingConfidenceLabel(score), detail: `${recent.length} weigh-in${recent.length === 1 ? '' : 's'} in 28 days · latest ${age === 0 ? 'today' : `${age}d ago`}`};
}

function coachingLinearSlope(points, valueKey = 'trend') {
  const rows = (points || []).filter(x => x.date && Number.isFinite(toNum(x[valueKey])));
  if (rows.length < 2) return 0;
  const origin = parseDate(rows[0].date);
  const xs = rows.map(row => daysBetween(rows[0].date, row.date));
  const ys = rows.map(row => toNum(row[valueKey]));
  const xMean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const yMean = ys.reduce((a, b) => a + b, 0) / ys.length;
  let numerator = 0, denominator = 0;
  xs.forEach((x, i) => {
    numerator += (x - xMean) * (ys[i] - yMean);
    denominator += (x - xMean) ** 2;
  });
  return denominator ? numerator / denominator : 0;
}

function coachingRateMetrics(endDate = localDateISO(), requestedDays = 21) {
  const series = coachingTrendSeries(endDate);
  if (series.length < 8) return {available: false, currentTrend: series.at(-1)?.trend || 0, kgPerWeek: 0, lossPctPerWeek: 0, change7Kg: 0, confidence: coachingTrendConfidence(endDate)};
  const startDate = coachingAddDays(endDate, -(requestedDays - 1));
  const recent = series.filter(x => x.date >= startDate);
  const slope = coachingLinearSlope(recent, 'trend');
  const current = recent.at(-1)?.trend || 0;
  const sevenDate = coachingAddDays(endDate, -7);
  const sevenPoint = [...series].reverse().find(x => x.date <= sevenDate) || series[0];
  const change7 = current && sevenPoint ? current - sevenPoint.trend : 0;
  const kgPerWeek = slope * 7;
  const lossPctPerWeek = current > 0 ? -kgPerWeek / current * 100 : 0;
  return {
    available: recent.length >= 8,
    currentTrend: current,
    kgPerWeek,
    lossKgPerWeek: -kgPerWeek,
    lossPctPerWeek,
    change7Kg: change7,
    days: recent.length,
    confidence: coachingTrendConfidence(endDate)
  };
}

function coachingNutritionRecord(dateISO) {
  return (state.nutritionDays || []).find(x => x.date === dateISO) || null;
}

function coachingFoodTotalsForDate(dateISO) {
  const rows = (state.foodLog || []).filter(x => x.date === dateISO);
  const totals = rows.reduce((a, row) => ({
    kcal: a.kcal + toNum(row.kcal),
    protein: a.protein + toNum(row.protein),
    carbs: a.carbs + toNum(row.carbs),
    fat: a.fat + toNum(row.fat)
  }), {kcal: 0, protein: 0, carbs: 0, fat: 0});
  return {...totals, entries: rows.length, meals: new Set(rows.map(x => x.meal).filter(Boolean)).size};
}

function coachingNutritionDayAssessment(dateISO) {
  const record = coachingNutritionRecord(dateISO);
  const totals = coachingFoodTotalsForDate(dateISO);
  const calorieTarget = coachingCalorieTargetForDate(dateISO);
  const proteinTarget = coachingProteinTargetForDate(dateISO);
  let status = record?.status || '';
  let score = record ? clamp(toNum(record.completenessPct) || (LC_COACHING.STATUS_SCORES[record.status] ?? 0), 0, 100) : 0;
  let inferred = false;
  if (!record) {
    inferred = true;
    if (!totals.entries) {
      status = 'Not logged';
      score = 0;
    } else {
      status = 'Unconfirmed';
      score = 45;
      if (totals.meals >= 2) score += 10;
      if (calorieTarget > 0 && totals.kcal >= calorieTarget * 0.5) score += 10;
      if (proteinTarget > 0 && totals.protein >= proteinTarget * 0.5) score += 10;
      score = Math.min(score, 75);
    }
  }
  const untrackedKcal = Math.max(0, toNum(record?.untrackedKcal));
  const effectiveKcal = totals.kcal + untrackedKcal;
  const excluded = Boolean(record?.excludeFromEngine);
  const reliable = score >= 70 && !excluded && effectiveKcal > 0;
  return {
    date: dateISO,
    record,
    status,
    score,
    inferred,
    untrackedKcal,
    effectiveKcal,
    excluded,
    reliable,
    totals,
    calorieTarget,
    proteinTarget
  };
}

function coachingIntakeSummary(startDate, endDate) {
  const days = coachingDateRange(startDate, endDate).map(coachingNutritionDayAssessment);
  const reliable = days.filter(x => x.reliable);
  const logged = days.filter(x => x.totals.entries > 0);
  const completenessPct = days.length ? days.reduce((sum, row) => sum + row.score, 0) / days.length : 0;
  const weightSum = reliable.reduce((sum, row) => sum + Math.max(0.5, row.score / 100), 0);
  const avgKcal = weightSum ? reliable.reduce((sum, row) => sum + row.effectiveKcal * Math.max(0.5, row.score / 100), 0) / weightSum : 0;
  const avgProtein = weightSum ? reliable.reduce((sum, row) => sum + row.totals.protein * Math.max(0.5, row.score / 100), 0) / weightSum : 0;
  const targetDays = reliable.filter(row => row.calorieTarget > 0 && Math.abs(row.effectiveKcal - row.calorieTarget) <= row.calorieTarget * 0.1).length;
  const proteinDays = reliable.filter(row => row.proteinTarget > 0 && row.totals.protein >= row.proteinTarget * 0.9).length;
  const checkins = (state.dailyCheckins || []).filter(x => x.date >= startDate && x.date <= endDate && x.dietAdherencePct !== '' && x.dietAdherencePct !== undefined);
  const selfReported = checkins.length ? checkins.reduce((sum, row) => sum + toNum(row.dietAdherencePct), 0) / checkins.length : 0;
  return {
    startDate,
    endDate,
    days,
    reliableDays: reliable.length,
    loggedDays: logged.length,
    excludedDays: days.filter(x => x.excluded).length,
    completenessPct,
    avgKcal,
    avgProtein,
    targetDays,
    proteinDays,
    selfReportedAdherencePct: selfReported
  };
}

function coachingExpenditureEstimate(endDate = localDateISO()) {
  const series = coachingTrendSeries(endDate);
  if (series.length < 14) return {available: false, estimate: 0, confidence: {score: 0, label: 'Low'}, reasons: ['At least two weeks of weight and intake data are needed.'], candidates: []};
  const activePhase = coachingPhaseForDate(endDate);
  const phaseStart = activePhase?.startDate || series[0].date;
  const candidates = [];

  LC_COACHING.WINDOWS.forEach(windowDays => {
    let startDate = coachingAddDays(endDate, -(windowDays - 1));
    if (phaseStart > startDate) startDate = phaseStart;
    const spanDays = daysBetween(startDate, endDate) + 1;
    if (spanDays < 12) return;
    const intake = coachingIntakeSummary(startDate, endDate);
    const observations = coachingWeightObservations().filter(x => x.date >= startDate && x.date <= endDate);
    const trendPoints = series.filter(x => x.date >= startDate && x.date <= endDate);
    const minimumReliable = Math.max(7, Math.ceil(spanDays * 0.5));
    if (intake.reliableDays < minimumReliable || observations.length < Math.max(3, Math.ceil(spanDays / 10))) return;
    const slope = coachingLinearSlope(trendPoints, 'trend');
    if (Math.abs(slope) > 0.25) return;
    const estimate = intake.avgKcal - slope * LC_COACHING.ENERGY_KCAL_PER_KG;
    if (!Number.isFinite(estimate) || estimate < LC_COACHING.MIN_TDEE || estimate > LC_COACHING.MAX_TDEE) return;
    const coverage = intake.reliableDays / spanDays;
    const weighFrequency = observations.length / Math.max(1, spanDays / 7);
    const weight = (spanDays / 14) * Math.min(1, coverage / 0.8) * Math.min(1, weighFrequency / 4) * Math.max(0.5, intake.completenessPct / 100);
    candidates.push({windowDays: spanDays, startDate, intake, observations: observations.length, slope, estimate, weight, coverage, weighFrequency});
  });

  if (!candidates.length) {
    const last28Start = coachingAddDays(endDate, -27);
    const intake = coachingIntakeSummary(last28Start, endDate);
    const observations = coachingWeightObservations().filter(x => x.date >= last28Start && x.date <= endDate);
    const reasons = [];
    if (intake.reliableDays < 7) reasons.push('Mark more food-log days Complete or Mostly complete.');
    if (observations.length < 3) reasons.push('Log weight more frequently.');
    if (!reasons.length) reasons.push('More consistent data across the same diet phase are needed.');
    return {available: false, estimate: 0, confidence: {score: 20, label: 'Low'}, reasons, candidates: []};
  }

  const totalWeight = candidates.reduce((sum, row) => sum + row.weight, 0);
  const estimate = candidates.reduce((sum, row) => sum + row.estimate * row.weight, 0) / totalWeight;
  const longest = candidates.reduce((best, row) => row.windowDays > best.windowDays ? row : best, candidates[0]);
  const durationScore = Math.min(18, longest.windowDays / 28 * 18);
  const nutritionScore = Math.min(32, longest.intake.completenessPct / 100 * 32);
  const coverageScore = Math.min(25, longest.coverage / 0.8 * 25);
  const weighScore = Math.min(25, longest.weighFrequency / 4 * 25);
  let score = durationScore + nutritionScore + coverageScore + weighScore;
  if (activePhase?.mode === 'RFL / PSMF') score -= 15;
  const latestObservation = coachingWeightObservations().filter(x => x.date <= endDate).at(-1);
  if (latestObservation && daysBetween(latestObservation.date, endDate) > 5) score -= 10;
  score = clamp(Math.round(score), 0, 100);
  return {
    available: true,
    estimate,
    rounded: Math.round(estimate / 25) * 25,
    confidence: {score, label: coachingConfidenceLabel(score)},
    analysisDays: longest.windowDays,
    intake: longest.intake,
    candidates,
    reasons: []
  };
}

function coachingConfidenceLabel(score) {
  if (score >= 80) return 'High';
  if (score >= 55) return 'Medium';
  return 'Low';
}

function coachingConfidenceClass(label) {
  return label === 'High' ? 'good' : label === 'Medium' ? 'warn' : 'danger';
}

function coachingRecommendation(engine) {
  const mode = engine.mode;
  const currentTarget = coachingTargetSet(mode).kcal;
  if (mode === 'RFL / PSMF') {
    return {status: 'manual', action: 'RFL targets stay manual', currentTarget, proposedTarget: currentTarget, changeKcal: 0, reason: 'Lift & Cut will monitor weight, intake completeness and recovery, but will not auto-adjust an RFL prescription.'};
  }
  if (!engine.expenditure.available || engine.expenditure.confidence.label === 'Low') {
    return {status: 'insufficient', action: 'Keep the current target', currentTarget, proposedTarget: currentTarget, changeKcal: 0, reason: engine.expenditure.reasons?.[0] || 'More complete weight and nutrition data are needed before changing calories.'};
  }
  const lastAppliedAdjustment = (state.targetAdjustments || [])
    .filter(item => item && item.applied !== false && (item.date || item.updatedAt))
    .sort((a, b) => String(b.updatedAt || b.date).localeCompare(String(a.updatedAt || a.date)))[0];
  if (lastAppliedAdjustment) {
    const adjustmentDate = String(lastAppliedAdjustment.date || lastAppliedAdjustment.updatedAt || '').slice(0, 10);
    const daysSinceAdjustment = Math.max(0, daysBetween(adjustmentDate, localDateISO()));
    if (adjustmentDate && daysSinceAdjustment < 7) {
      const remaining = 7 - daysSinceAdjustment;
      return {
        status: 'hold',
        action: currentTarget ? `Keep ${Math.round(currentTarget)} kcal` : 'Keep the current target',
        currentTarget,
        proposedTarget: currentTarget,
        changeKcal: 0,
        reason: `The calorie target was changed ${daysSinceAdjustment === 0 ? 'today' : `${daysSinceAdjustment} day${daysSinceAdjustment === 1 ? '' : 's'} ago`}. Build ${remaining} more day${remaining === 1 ? '' : 's'} of data before another coaching adjustment.`
      };
    }
  }
  const phase = engine.phase;
  const maintenance = mode === 'Maintenance / transition' || phase?.goalType === 'Maintain weight';
  const targetRate = maintenance ? 0 : clamp(toNum(phase?.targetRatePctPerWeek) || toNum(state.settings.coachingTargetRatePctPerWeek) || 0.5, 0, 2);
  const desiredDeficit = maintenance ? 0 : engine.rate.currentTrend * (targetRate / 100) * LC_COACHING.ENERGY_KCAL_PER_KG / 7;
  const rawTarget = engine.expenditure.estimate - desiredDeficit;
  const maxAdjustment = Math.max(25, toNum(state.settings.coachingMaxAdjustmentKcal) || 150);
  const confidenceLimit = engine.expenditure.confidence.label === 'High' ? maxAdjustment : Math.min(maxAdjustment, 100);
  let proposed = Math.round(rawTarget / 25) * 25;
  if (currentTarget > 0) proposed = currentTarget + clamp(proposed - currentTarget, -confidenceLimit, confidenceLimit);
  const minimum = toNum(state.settings.coachingMinimumCalories);
  if (minimum > 0) proposed = Math.max(minimum, proposed);
  proposed = Math.round(proposed / 25) * 25;
  const change = currentTarget > 0 ? proposed - currentTarget : 0;
  const action = !currentTarget ? `Set ${proposed} kcal` : Math.abs(change) < 25 ? `Keep ${currentTarget} kcal` : `${change > 0 ? 'Increase' : 'Decrease'} to ${proposed} kcal`;
  return {
    status: Math.abs(change) < 25 ? 'hold' : 'change',
    action,
    currentTarget,
    proposedTarget: proposed,
    rawTarget,
    changeKcal: change,
    targetRate,
    desiredDeficit,
    reason: maintenance
      ? `Estimated expenditure is ${Math.round(engine.expenditure.estimate / 25) * 25} kcal/day; the maintenance target is adjusted gradually.`
      : `Based on estimated expenditure and a planned loss rate of ${round(targetRate, 2)}% per week. The weekly change is capped at ${confidenceLimit} kcal.`
  };
}

function coachingGoalPrediction(engine) {
  const phase = engine.phase;
  let target = toNum(phase?.targetWeightKg) || toNum(state.settings.targetWeightKg);
  if (!target && toNum(phase?.targetLossKg) && toNum(phase?.startWeightKg)) target = toNum(phase.startWeightKg) - toNum(phase.targetLossKg);
  const current = engine.rate.currentTrend;
  if (!target || !current) return {available: false, target, reason: 'Set a target weight to see a goal-date estimate.'};
  if (current <= target) return {available: true, achieved: true, target, current, date: localDateISO(), label: 'Goal reached'};
  const currentLossRate = engine.rate.lossKgPerWeek;
  const targetRatePct = clamp(toNum(phase?.targetRatePctPerWeek) || toNum(state.settings.coachingTargetRatePctPerWeek) || 0.5, 0, 2);
  const plannedKgPerWeek = current * targetRatePct / 100;
  const plannedDays = plannedKgPerWeek > 0 ? Math.ceil((current - target) / plannedKgPerWeek * 7) : 0;
  const plannedDate = plannedDays ? coachingAddDays(localDateISO(), plannedDays) : '';
  if (currentLossRate <= 0.05 || engine.rate.confidence.label === 'Low') {
    return {available: false, target, current, plannedDate, reason: 'A stable downward trend is needed for a recent-rate prediction.'};
  }
  const days = Math.ceil((current - target) / currentLossRate * 7);
  const date = coachingAddDays(localDateISO(), days);
  const margin = engine.expenditure.confidence.label === 'High' ? 0.2 : 0.35;
  const fast = currentLossRate * (1 + margin);
  const slow = Math.max(0.05, currentLossRate * (1 - margin));
  const earliest = coachingAddDays(localDateISO(), Math.ceil((current - target) / fast * 7));
  const latest = coachingAddDays(localDateISO(), Math.ceil((current - target) / slow * 7));
  return {available: true, achieved: false, target, current, date, earliest, latest, plannedDate, currentLossRate, plannedKgPerWeek};
}

function computeCoachingEngine(endDate = localDateISO()) {
  ensureCoachingState();
  const phase = coachingPhaseForDate(endDate);
  const mode = phase?.mode || state.settings.dietMode || 'Normal / moderate deficit';
  const rate = coachingRateMetrics(endDate, 21);
  const expenditure = coachingExpenditureEstimate(endDate);
  const intake7 = coachingIntakeSummary(coachingAddDays(endDate, -6), endDate);
  const intake21 = coachingIntakeSummary(coachingAddDays(endDate, -20), endDate);
  const base = {endDate, phase, mode, rate, expenditure, intake7, intake21};
  base.recommendation = coachingRecommendation(base);
  base.goal = coachingGoalPrediction(base);
  base.confidence = expenditure.available ? expenditure.confidence : rate.confidence;
  return base;
}

function coachingWeekSummary(endDate = localDateISO()) {
  const startDate = coachingAddDays(endDate, -6);
  const engine = computeCoachingEngine(endDate);
  const intake = coachingIntakeSummary(startDate, endDate);
  const series = coachingTrendSeries(endDate).filter(x => x.date >= startDate);
  const startTrend = series[0]?.trend || 0;
  const endTrend = series.at(-1)?.trend || 0;
  const change = startTrend && endTrend ? endTrend - startTrend : 0;
  const lossPct = endTrend ? -change / endTrend * 100 : 0;
  const workouts = (state.workoutSessions || []).filter(x => x.date >= startDate && x.date <= endDate && x.completed !== false).length;
  const sets = (state.workoutLogs || []).filter(x => x.date >= startDate && x.date <= endDate && !x.warmup).length;
  const checkins = (state.dailyCheckins || []).filter(x => x.date >= startDate && x.date <= endDate);
  const average = (key) => {
    const rows = checkins.map(x => toNum(x[key])).filter(x => x > 0);
    return rows.length ? rows.reduce((a, b) => a + b, 0) / rows.length : 0;
  };
  const calorieTarget = coachingCalorieTargetForDate(endDate);
  return {
    startDate,
    endDate,
    phaseId: engine.phase?.id || '',
    phaseName: engine.phase?.name || '',
    mode: engine.mode,
    trendStartKg: startTrend,
    trendEndKg: endTrend,
    changeKg: change,
    lossPct,
    avgKcal: intake.avgKcal,
    completenessPct: intake.completenessPct,
    reliableDays: intake.reliableDays,
    loggedDays: intake.loggedDays,
    proteinDays: intake.proteinDays,
    targetDays: intake.targetDays,
    calorieTarget,
    workouts,
    workSets: sets,
    avgSteps: average('steps'),
    avgSleep: average('sleepHrs'),
    avgHunger: average('hunger'),
    avgEnergy: average('energy'),
    estimatedExpenditure: engine.expenditure.available ? engine.expenditure.rounded : '',
    recommendedTarget: engine.recommendation.proposedTarget || '',
    recommendation: engine.recommendation.action,
    confidence: engine.expenditure.confidence?.label || 'Low'
  };
}

function coachingReviewNarrative(review, engine = computeCoachingEngine(review.endDate)) {
  const lines = [];
  if (review.trendEndKg) {
    const direction = review.changeKg < -0.05 ? 'down' : review.changeKg > 0.05 ? 'up' : 'stable';
    lines.push(`Trend weight was ${direction} ${Math.abs(toNum(review.changeKg)).toFixed(2)} kg over seven days (${Math.abs(toNum(review.lossPct)).toFixed(2)}%).`);
  } else lines.push('More weigh-ins are needed to assess the weekly trend.');
  lines.push(`Nutrition logging scored ${Math.round(review.completenessPct)}%, with ${review.reliableDays}/7 days reliable for coaching.`);
  if (review.avgKcal) lines.push(`Reliable days averaged ${Math.round(review.avgKcal)} kcal${review.calorieTarget ? ` versus a ${Math.round(review.calorieTarget)} kcal target` : ''}.`);
  if (review.proteinDays || coachingProteinTargetForDate(review.endDate)) lines.push(`Protein reached at least 90% of target on ${review.proteinDays}/${Math.max(1, review.reliableDays)} reliable days.`);
  lines.push(`${review.workouts} workout${review.workouts === 1 ? '' : 's'} and ${review.workSets} work sets were logged${review.avgSleep ? `; sleep averaged ${round(review.avgSleep, 1)} hours` : ''}${review.avgSteps ? ` and steps averaged ${Math.round(review.avgSteps)}` : ''}.`);
  lines.push(engine.recommendation.reason);
  return lines;
}

function coachingHistoricalWeeks(count = 8) {
  const rows = [];
  const currentWeekStart = coachingStartOfWeek(localDateISO());
  for (let i = 0; i < count; i++) {
    const start = coachingAddDays(currentWeekStart, -7 * i);
    const end = coachingAddDays(start, 6);
    const actualEnd = end > localDateISO() ? localDateISO() : end;
    const intake = coachingIntakeSummary(start, actualEnd);
    const series = coachingTrendSeries(actualEnd).filter(x => x.date >= start && x.date <= actualEnd);
    const startTrend = series[0]?.trend || 0;
    const endTrend = series.at(-1)?.trend || 0;
    const workouts = (state.workoutSessions || []).filter(x => x.date >= start && x.date <= actualEnd && x.completed !== false).length;
    rows.push({
      startDate: start,
      endDate: actualEnd,
      trendEndKg: endTrend,
      changeKg: startTrend && endTrend ? endTrend - startTrend : 0,
      avgKcal: intake.avgKcal,
      completenessPct: intake.completenessPct,
      reliableDays: intake.reliableDays,
      workouts
    });
  }
  return rows;
}

function coachingTrendChartSvg(days = 56, endDate = localDateISO()) {
  const startDate = coachingAddDays(endDate, -(days - 1));
  const series = coachingTrendSeries(endDate).filter(x => x.date >= startDate);
  if (series.length < 2) return `<div class="empty">Add at least two weight entries to see scale and trend weight.</div>`;
  const width = 680, height = 250, padX = 40, padY = 26;
  const scaleValues = series.filter(x => x.scale !== '').map(x => toNum(x.scale));
  const values = series.map(x => toNum(x.trend)).concat(scaleValues);
  let min = Math.min(...values), max = Math.max(...values);
  const margin = Math.max(0.5, (max - min) * 0.12);
  min -= margin; max += margin;
  if (min === max) { min -= 1; max += 1; }
  const x = i => padX + i * ((width - padX * 2) / Math.max(1, series.length - 1));
  const y = v => height - padY - ((v - min) / (max - min)) * (height - padY * 2);
  const trendPath = series.map((row, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(row.trend).toFixed(1)}`).join(' ');
  const rawDots = series.map((row, i) => row.scale === '' ? '' : `<circle cx="${x(i)}" cy="${y(toNum(row.scale))}" r="3.2" class="trend-raw-dot"><title>${esc(row.date)} scale: ${round(row.scale, 2)} kg</title></circle>`).join('');
  const latest = series.at(-1);
  return `<div class="chart-wrap coaching-trend-chart"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Scale and trend weight chart">
    <line x1="${padX}" y1="${y(min)}" x2="${width - padX}" y2="${y(min)}" class="chart-grid-line"/>
    <line x1="${padX}" y1="${y(max)}" x2="${width - padX}" y2="${y(max)}" class="chart-grid-line"/>
    ${rawDots}
    <path d="${trendPath}" class="trend-line"/>
    <circle cx="${x(series.length - 1)}" cy="${y(latest.trend)}" r="5" class="trend-latest-dot"><title>${esc(latest.date)} trend: ${round(latest.trend, 2)} kg</title></circle>
    <text x="4" y="${y(max) + 4}" class="chart-axis-label">${round(max, 1)}</text>
    <text x="4" y="${y(min) + 4}" class="chart-axis-label">${round(min, 1)}</text>
    <text x="${padX}" y="${height - 5}" class="chart-axis-label">${esc(formatDate(series[0].date))}</text>
    <text x="${width - padX}" y="${height - 5}" text-anchor="end" class="chart-axis-label">${esc(formatDate(latest.date))}</text>
  </svg><div class="chart-legend"><span><i class="legend-dot raw"></i>Scale weight</span><span><i class="legend-line"></i>Trend weight</span></div></div>`;
}

function coachingConfidencePill(confidence) {
  const label = confidence?.label || 'Low';
  const score = Math.round(toNum(confidence?.score));
  return `<span class="pill ${coachingConfidenceClass(label)}">${esc(label)}${score ? ` · ${score}%` : ''}</span>`;
}

function setDietView(value) {
  ensureCoachingState();
  state.settings.dietView = value === 'coach' ? 'coach' : 'diary';
  saveState();
  render();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function openCoachPage() {
  state.settings.dietView = 'coach';
  saveState();
  setPage('diet');
}

function renderDietSectionNav(active = 'diary') {
  return `<div class="segmented-control diet-segmented" role="tablist" aria-label="Diet sections">
    <button type="button" class="${active === 'diary' ? 'active' : ''}" onclick="setDietView('diary')">Diary & recipes</button>
    <button type="button" class="${active === 'coach' ? 'active' : ''}" onclick="setDietView('coach')">Weight-loss coach</button>
  </div>`;
}

function renderNutritionDayStatusCard(dateISO, compact = true) {
  const day = coachingNutritionDayAssessment(dateISO);
  const statusClass = day.score >= 85 ? 'good' : day.score >= 60 ? 'warn' : day.score > 0 ? 'gray' : 'danger';
  return `<div class="nutrition-day-card ${compact ? 'compact-day-card' : ''}">
    <div>
      <div class="small muted">Intake completeness</div>
      <strong>${esc(day.status)} · ${Math.round(day.score)}%</strong>
      <div class="tiny muted">${day.reliable ? 'Included in expenditure estimate' : day.excluded ? 'Excluded from coaching' : 'Not yet reliable for expenditure'}${day.untrackedKcal ? ` · +${Math.round(day.untrackedKcal)} untracked kcal` : ''}</div>
    </div>
    <button type="button" class="secondary compact" onclick="openNutritionDayStatusModal('${esc(dateISO)}')">Review day</button>
  </div>`;
}

function openNutritionDayStatusModal(dateISO = selectedDietDate) {
  ensureCoachingState();
  const day = coachingNutritionDayAssessment(dateISO);
  const record = day.record;
  showModal(`<div class="card-title"><span>Nutrition day status</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="notice">The coaching engine uses actual logged intake, not whether you followed the target. Mark whether the diary is complete so incomplete days do not distort expenditure.</div>
    <form class="stack" style="margin-top:10px" onsubmit="saveNutritionDayStatus(event,'${esc(dateISO)}','${esc(record?.id || '')}')">
      <label>Date<input id="nutritionDayDate" type="date" value="${esc(dateISO)}"></label>
      <label>Logging status<select id="nutritionDayStatus">${Object.keys(LC_COACHING.STATUS_SCORES).map(status => `<option ${status === (record?.status || (day.totals.entries ? 'Mostly complete' : 'Not logged')) ? 'selected' : ''}>${esc(status)}</option>`).join('')}</select></label>
      <label>Estimated calories not logged<input id="nutritionDayUntracked" type="number" min="0" step="25" value="${esc(record?.untrackedKcal || '')}" placeholder="0"></label>
      <label class="inline-check"><input id="nutritionDayExclude" type="checkbox" ${record?.excludeFromEngine ? 'checked' : ''}> Exclude this day from expenditure calculations</label>
      <label>Notes<textarea id="nutritionDayNotes" placeholder="Restaurant meal, illness, travel, uncertain portion...">${esc(record?.notes || '')}</textarea></label>
      <div class="nutrition-day-preview">
        <span>Currently logged</span><strong>${Math.round(day.totals.kcal)} kcal · ${round(day.totals.protein, 1)} g protein</strong>
      </div>
      <button type="submit">Save day status</button>
    </form>`);
}

function saveNutritionDayStatus(event, originalDate, id) {
  event.preventDefault();
  ensureCoachingState();
  const date = document.getElementById('nutritionDayDate').value || originalDate || localDateISO();
  const status = document.getElementById('nutritionDayStatus').value;
  let row = state.nutritionDays.find(x => x.id === id) || state.nutritionDays.find(x => x.date === originalDate);
  if (!row) {
    row = {id: uid('nutrition-day')};
    state.nutritionDays.push(row);
  }
  Object.assign(row, {
    date,
    status,
    completenessPct: LC_COACHING.STATUS_SCORES[status] ?? 0,
    untrackedKcal: Math.max(0, toNum(document.getElementById('nutritionDayUntracked').value)),
    excludeFromEngine: document.getElementById('nutritionDayExclude').checked,
    notes: document.getElementById('nutritionDayNotes').value.trim(),
    updatedAt: nowISO()
  });
  if (originalDate !== date) state.nutritionDays = state.nutritionDays.filter(x => x.id === row.id || x.date !== date);
  selectedDietDate = date;
  saveState();
  closeModal();
  render();
  showToast('Nutrition day status saved');
}

function renderDashboardCoachingCard(engine = computeCoachingEngine()) {
  const rec = engine.recommendation;
  const rateText = engine.rate.available ? `${engine.rate.lossPctPerWeek >= 0 ? '' : '+'}${round(engine.rate.lossPctPerWeek, 2)}% / week` : 'Building trend';
  return `<div class="card coach-dashboard-card">
    <div class="card-title"><span>Weight-loss coach</span>${coachingConfidencePill(engine.expenditure.confidence || engine.rate.confidence)}</div>
    <div class="coach-mini-grid">
      <div><span>Trend</span><strong>${engine.rate.currentTrend ? `${round(engine.rate.currentTrend, 1)} kg` : '—'}</strong></div>
      <div><span>Rate</span><strong>${esc(rateText)}</strong></div>
      <div><span>Expenditure</span><strong>${engine.expenditure.available ? `${Math.round(engine.expenditure.rounded)} kcal` : '—'}</strong></div>
    </div>
    <div class="coach-action ${rec.status}"><strong>${esc(rec.action)}</strong><span>${esc(rec.reason)}</span></div>
    <button class="secondary" onclick="openCoachPage()">Open weekly coaching</button>
  </div>`;
}

function renderProgressCoachingSummary(engine = computeCoachingEngine()) {
  const goal = engine.goal;
  const goalText = goal.achieved ? 'Goal reached' : goal.available ? formatDate(goal.date, {day: 'numeric', month: 'short', year: 'numeric'}) : goal.plannedDate ? `Planned ${formatDate(goal.plannedDate, {day: 'numeric', month: 'short', year: 'numeric'})}` : 'More data needed';
  return `<div class="card">
    <div class="card-title"><span>Adaptive progress</span><button class="secondary compact" onclick="openCoachPage()">Open coach</button></div>
    <div class="cards coaching-kpis">
      <div><div class="small muted">Trend weight</div><div class="kpi small-kpi">${engine.rate.currentTrend ? round(engine.rate.currentTrend, 1) : '—'}</div><div class="small">kg</div></div>
      <div><div class="small muted">Weekly loss rate</div><div class="kpi small-kpi">${engine.rate.available ? round(engine.rate.lossPctPerWeek, 2) : '—'}</div><div class="small">% / week</div></div>
      <div><div class="small muted">Estimated expenditure</div><div class="kpi small-kpi">${engine.expenditure.available ? Math.round(engine.expenditure.rounded) : '—'}</div><div class="small">kcal/day</div></div>
      <div><div class="small muted">Goal estimate</div><div class="kpi small-kpi goal-date-kpi">${esc(goalText)}</div><div class="small">${goal.available && !goal.achieved ? `${round(goal.currentLossRate, 2)} kg/week` : ''}</div></div>
    </div>
  </div>`;
}

function renderDietCoachPage() {
  const engine = computeCoachingEngine();
  const review = coachingWeekSummary();
  const narrative = coachingReviewNarrative(review, engine);
  const historical = coachingHistoricalWeeks(8);
  const goal = engine.goal;
  const rec = engine.recommendation;
  const phase = engine.phase;
  const rateClass = engine.rate.lossPctPerWeek >= toNum(state.settings.coachingRateMinPctPerWeek) && engine.rate.lossPctPerWeek <= toNum(state.settings.coachingRateMaxPctPerWeek) ? 'good' : 'warn';
  const savedReview = (state.weeklyReviews || []).find(x => x.weekEnd === review.endDate);
  return `<div class="grid coaching-page">
    ${renderDietSectionNav('coach')}
    <div class="card highlight coaching-hero">
      <div class="row-head">
        <div><div class="eyebrow">Adaptive coaching · ${esc(formatDate(review.startDate))}–${esc(formatDate(review.endDate))}</div><h2>${esc(rec.action)}</h2></div>
        ${coachingConfidencePill(engine.expenditure.confidence || engine.rate.confidence)}
      </div>
      <p class="small muted">${esc(rec.reason)}</p>
      <div class="button-row">
        ${rec.status === 'change' ? `<button onclick="applyCoachingRecommendation()">Apply ${Math.round(rec.proposedTarget)} kcal</button>` : ''}
        <button class="secondary" onclick="saveWeeklyReviewSnapshot()">${savedReview ? 'Update saved review' : 'Save weekly review'}</button>
        <button class="ghost" onclick="openCoachingDataGuide()">Data guide</button>
      </div>
      ${engine.mode === 'RFL / PSMF' ? `<div class="notice warn" style="margin-top:10px">RFL is monitoring-only. Lift & Cut does not auto-adjust the calorie or macro prescription.</div>` : ''}
    </div>

    <div class="cards coaching-kpis">
      <div class="card"><div class="small muted">Trend weight</div><div class="kpi">${engine.rate.currentTrend ? round(engine.rate.currentTrend, 1) : '—'}</div><div class="small">kg · ${engine.rate.confidence.detail || ''}</div></div>
      <div class="card"><div class="small muted">Weekly rate</div><div class="kpi">${engine.rate.available ? round(engine.rate.lossPctPerWeek, 2) : '—'}</div><div class="small">% loss / week <span class="pill ${rateClass}">${engine.rate.available ? `${engine.rate.lossKgPerWeek >= 0 ? '−' : '+'}${round(Math.abs(engine.rate.lossKgPerWeek), 2)} kg` : 'insufficient'}</span></div></div>
      <div class="card"><div class="small muted">Estimated expenditure</div><div class="kpi">${engine.expenditure.available ? Math.round(engine.expenditure.rounded) : '—'}</div><div class="small">kcal/day · ${engine.expenditure.available ? `${engine.expenditure.analysisDays}d analysis` : 'build data'}</div></div>
      <div class="card"><div class="small muted">Goal-date estimate</div><div class="kpi small-kpi goal-date-kpi">${goal.achieved ? 'Reached' : goal.available ? esc(formatDate(goal.date, {day: 'numeric', month: 'short', year: 'numeric'})) : '—'}</div><div class="small">${goal.available && !goal.achieved ? `${esc(formatDate(goal.earliest))}–${esc(formatDate(goal.latest))}` : esc(goal.reason || '')}</div></div>
    </div>

    <div class="card">
      <div class="card-title"><span>Scale and trend weight</span><span class="pill gray">56 days</span></div>
      ${coachingTrendChartSvg(56)}
      <div class="metric-line coaching-rate-band"><span class="small">Planned range</span><strong class="small">${round(state.settings.coachingRateMinPctPerWeek, 2)}–${round(state.settings.coachingRateMaxPctPerWeek, 2)}% loss/week · target ${round(phase?.targetRatePctPerWeek || state.settings.coachingTargetRatePctPerWeek, 2)}%</strong></div>
    </div>

    <div class="dashboard-grid">
      <div class="grid">
        <div class="card">
          <div class="card-title"><span>Weekly coaching review</span><span class="pill gray">Last 7 days</span></div>
          <div class="coach-review-list">${narrative.map((line, index) => `<div class="coach-review-line"><span>${index + 1}</span><p>${esc(line)}</p></div>`).join('')}</div>
          <div class="coach-action ${rec.status}" style="margin-top:10px"><strong>${esc(rec.action)}</strong><span>${esc(rec.reason)}</span></div>
        </div>

        <div class="card">
          <div class="card-title"><span>Adherence and logging quality</span><span class="pill ${review.completenessPct >= 80 ? 'good' : review.completenessPct >= 60 ? 'warn' : 'danger'}">${Math.round(review.completenessPct)}%</span></div>
          <div class="stack">
            ${progressBar('Intake completeness', review.completenessPct, 100, '%')}
            ${progressBar('Reliable diary days', review.reliableDays, 7, '')}
            ${progressBar('Protein target days', review.proteinDays, Math.max(1, review.reliableDays), '')}
            ${progressBar('Calories within ±10%', review.targetDays, Math.max(1, review.reliableDays), '')}
          </div>
          <div class="metric-line coaching-detail-line"><span>Average reliable intake</span><strong>${review.avgKcal ? `${Math.round(review.avgKcal)} kcal` : '—'}</strong></div>
          <div class="metric-line coaching-detail-line"><span>Self-reported adherence</span><strong>${engine.intake7.selfReportedAdherencePct ? `${Math.round(engine.intake7.selfReportedAdherencePct)}%` : 'Not entered'}</strong></div>
          <button class="secondary" style="margin-top:10px" onclick="setDietView('diary')">Review diary days</button>
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title"><span>Confidence</span>${coachingConfidencePill(engine.expenditure.confidence || engine.rate.confidence)}</div>
          ${renderCoachingConfidenceBreakdown(engine)}
        </div>
        <div class="card">
          <div class="card-title"><span>Current diet phase</span>${phase ? `<span class="pill ${phase.status === 'Active' ? 'good' : 'gray'}">${esc(phase.status)}</span>` : '<span class="pill gray">None</span>'}</div>
          ${renderCoachingPhaseSummary(phase, engine)}
        </div>
      </div>
    </div>

    <details class="card" open>
      <summary class="card-title"><span>Eight-week overview</span><span class="pill gray">calendar weeks</span></summary>
      <div class="coaching-week-table">
        <div class="coaching-week-head"><span>Week</span><span>Trend Δ</span><span>Avg kcal</span><span>Complete</span><span>Training</span></div>
        ${historical.map(row => `<div class="coaching-week-row"><span>${esc(formatDate(row.startDate))}</span><strong>${row.trendEndKg ? `${row.changeKg > 0 ? '+' : ''}${round(row.changeKg, 2)} kg` : '—'}</strong><span>${row.avgKcal ? Math.round(row.avgKcal) : '—'}</span><span>${Math.round(row.completenessPct)}%</span><span>${row.workouts}</span></div>`).join('')}
      </div>
    </details>

    <details class="card">
      <summary class="card-title"><span>How this engine works</span><span class="pill gray">transparent</span></summary>
      <div class="stack small muted">
        <p>Trend weight smooths daily scale noise. Estimated expenditure combines reliable logged intake with the change in trend weight over several overlapping 14–28 day windows.</p>
        <p>Calorie recommendations are based on actual intake and trend, not on “good” or “bad” adherence. Changes are gradual and capped by your weekly adjustment setting.</p>
        <p>The stored-energy conversion uses an approximate 7,700 kcal per kg. Long-term body-weight dynamics are more complex, so confidence and goal dates are estimates rather than guarantees.</p>
        <p>Lift & Cut is not affiliated with MacroFactor. RFL remains a manually entered, monitoring-only mode.</p>
      </div>
    </details>
  </div>`;
}

function renderCoachingConfidenceBreakdown(engine) {
  const exp = engine.expenditure;
  const items = [];
  const intake = exp.intake || engine.intake21;
  items.push({label: 'Reliable nutrition days', value: `${intake.reliableDays}/${Math.max(1, daysBetween(intake.startDate, intake.endDate) + 1)}`, good: intake.reliableDays >= 14});
  const weighins = coachingWeightObservations().filter(x => x.date >= coachingAddDays(localDateISO(), -27)).length;
  items.push({label: 'Weigh-ins · 28 days', value: String(weighins), good: weighins >= 12});
  items.push({label: 'Intake completeness', value: `${Math.round(intake.completenessPct)}%`, good: intake.completenessPct >= 80});
  items.push({label: 'Analysis span', value: exp.available ? `${exp.analysisDays} days` : 'Not ready', good: exp.analysisDays >= 21});
  return `<div class="list confidence-list">${items.map(item => `<div class="metric-line"><span class="small">${esc(item.label)}</span><strong class="small ${item.good ? 'good-text' : ''}">${esc(item.value)}</strong></div>`).join('')}</div>${!exp.available && exp.reasons?.length ? `<div class="notice warn" style="margin-top:10px">${exp.reasons.map(esc).join(' ')}</div>` : ''}`;
}

function renderCoachingPhaseSummary(phase, engine) {
  if (!phase) return `<div class="empty">Start a diet phase so targets, rates and reviews stay separated.</div><button class="secondary" style="margin-top:10px" onclick="openPhaseModal()">Start phase</button>`;
  const day = Math.max(1, daysBetween(phase.startDate, localDateISO()) + 1);
  const start = toNum(phase.startWeightKg);
  const current = engine.rate.currentTrend;
  const change = start && current ? current - start : 0;
  const goal = engine.goal;
  return `<div class="stack">
    <div><strong>${esc(phase.name)}</strong><div class="small muted">${esc(phase.mode)} · day ${day}</div></div>
    <div class="metric-line"><span class="small">Trend change</span><strong>${current && start ? `${change > 0 ? '+' : ''}${round(change, 2)} kg` : '—'}</strong></div>
    <div class="metric-line"><span class="small">Planned rate</span><strong>${phase.mode === 'RFL / PSMF' ? 'Manual' : `${round(phase.targetRatePctPerWeek || state.settings.coachingTargetRatePctPerWeek, 2)}% / week`}</strong></div>
    <div class="metric-line"><span class="small">Goal weight</span><strong>${toNum(phase.targetWeightKg) || toNum(state.settings.targetWeightKg) ? `${round(toNum(phase.targetWeightKg) || toNum(state.settings.targetWeightKg), 1)} kg` : '—'}</strong></div>
    <div class="metric-line"><span class="small">Projected date</span><strong>${goal.available && !goal.achieved ? esc(formatDate(goal.date, {day: 'numeric', month: 'short', year: 'numeric'})) : goal.achieved ? 'Reached' : '—'}</strong></div>
    <div class="button-row"><button class="secondary compact" onclick="openPhaseModal('${esc(phase.id)}')">Edit phase</button><button class="ghost compact" onclick="setPage('progress')">Phase history</button></div>
  </div>`;
}

function renderCoachingSettingsCard() {
  return `<div class="card">
    <div class="card-title"><span>Weight-loss coaching</span><span class="pill good">adaptive</span></div>
    <div class="notice">Recommendations use actual reliable intake and trend weight. RFL remains monitoring-only. All values are estimates and must be reviewed before applying.</div>
    <div class="split" style="margin-top:10px">
      <label>Target loss % / week<input type="number" min="0" max="2" step="0.05" value="${esc(state.settings.coachingTargetRatePctPerWeek)}" onchange="updateCoachingSetting('coachingTargetRatePctPerWeek',this.value)"></label>
      <label>Maximum weekly calorie change<input type="number" min="25" max="500" step="25" value="${esc(state.settings.coachingMaxAdjustmentKcal)}" onchange="updateCoachingSetting('coachingMaxAdjustmentKcal',this.value)"></label>
      <label>Acceptable minimum % / week<input type="number" min="0" max="2" step="0.05" value="${esc(state.settings.coachingRateMinPctPerWeek)}" onchange="updateCoachingSetting('coachingRateMinPctPerWeek',this.value)"></label>
      <label>Acceptable maximum % / week<input type="number" min="0" max="2" step="0.05" value="${esc(state.settings.coachingRateMaxPctPerWeek)}" onchange="updateCoachingSetting('coachingRateMaxPctPerWeek',this.value)"></label>
      <label>Optional calorie floor<input type="number" min="0" step="25" value="${esc(state.settings.coachingMinimumCalories)}" placeholder="Blank" onchange="updateCoachingSetting('coachingMinimumCalories',this.value)"></label>
      <label>Weigh-in goal / week<input type="number" min="1" max="7" step="1" value="${esc(state.settings.coachingWeighInGoalPerWeek)}" onchange="updateCoachingSetting('coachingWeighInGoalPerWeek',this.value)"></label>
    </div>
    <div class="button-row" style="margin-top:10px"><button class="secondary" onclick="openCoachPage()">Open coach</button><button class="ghost" onclick="openCoachingDataGuide()">Logging guide</button></div>
  </div>`;
}

function updateCoachingSetting(key, value) {
  ensureCoachingState();
  const numeric = ['coachingTargetRatePctPerWeek', 'coachingRateMinPctPerWeek', 'coachingRateMaxPctPerWeek', 'coachingMaxAdjustmentKcal', 'coachingMinimumCalories', 'coachingWeighInGoalPerWeek', 'coachingCompleteDaysGoalPerWeek'];
  state.settings[key] = numeric.includes(key) ? numOrBlank(value) : value;
  if (key === 'coachingRateMinPctPerWeek' && toNum(state.settings.coachingRateMaxPctPerWeek) < toNum(value)) state.settings.coachingRateMaxPctPerWeek = toNum(value);
  if (key === 'coachingRateMaxPctPerWeek' && toNum(state.settings.coachingRateMinPctPerWeek) > toNum(value)) state.settings.coachingRateMinPctPerWeek = toNum(value);
  saveState();
  render();
}

function applyCoachingRecommendation() {
  const engine = computeCoachingEngine();
  const rec = engine.recommendation;
  if (rec.status !== 'change' || !rec.proposedTarget) return showToast('No calorie change is currently recommended');
  if (!confirm(`Change the daily calorie target from ${Math.round(rec.currentTarget)} to ${Math.round(rec.proposedTarget)} kcal?`)) return;
  const phase = engine.phase;
  const record = {
    id: uid('target-change'),
    date: localDateISO(),
    phaseId: phase?.id || '',
    oldTargetKcal: rec.currentTarget,
    newTargetKcal: rec.proposedTarget,
    changeKcal: rec.proposedTarget - rec.currentTarget,
    reason: rec.reason,
    confidence: engine.expenditure.confidence.label,
    applied: true,
    reviewWeekStart: coachingAddDays(localDateISO(), -6),
    updatedAt: nowISO()
  };
  state.targetAdjustments.push(record);
  state.settings.normalCalorieTarget = rec.proposedTarget;
  saveState();
  render();
  showToast(`Calorie target updated to ${Math.round(rec.proposedTarget)} kcal`);
}

function saveWeeklyReviewSnapshot() {
  ensureCoachingState();
  const review = coachingWeekSummary();
  const engine = computeCoachingEngine();
  const narrative = coachingReviewNarrative(review, engine);
  let row = state.weeklyReviews.find(x => x.weekEnd === review.endDate);
  if (!row) {
    row = {id: uid('review')};
    state.weeklyReviews.push(row);
  }
  Object.assign(row, {
    weekStart: review.startDate,
    weekEnd: review.endDate,
    phaseId: review.phaseId,
    phaseName: review.phaseName,
    mode: review.mode,
    trendStartKg: review.trendStartKg,
    trendEndKg: review.trendEndKg,
    changeKg: review.changeKg,
    lossPct: review.lossPct,
    avgKcal: review.avgKcal,
    completenessPct: review.completenessPct,
    reliableDays: review.reliableDays,
    proteinDays: review.proteinDays,
    targetDays: review.targetDays,
    workouts: review.workouts,
    workSets: review.workSets,
    avgSteps: review.avgSteps,
    avgSleep: review.avgSleep,
    estimatedExpenditure: review.estimatedExpenditure,
    recommendedTarget: review.recommendedTarget,
    recommendation: review.recommendation,
    confidence: review.confidence,
    summary: narrative.join(' '),
    updatedAt: nowISO()
  });
  saveState();
  render();
  showToast('Weekly coaching review saved');
}

function openCoachingDataGuide() {
  showModal(`<div class="card-title"><span>Coaching data guide</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="stack">
      <div class="row soft"><strong>1. Log weight regularly</strong><div class="small muted">Daily is ideal, but several weigh-ins per week are sufficient. Use similar conditions when practical.</div></div>
      <div class="row soft"><strong>2. Log intake honestly</strong><div class="small muted">The algorithm is adherence-neutral: it uses what you ate, not whether it matched the target.</div></div>
      <div class="row soft"><strong>3. Mark each diary day</strong><div class="small muted">Complete, Mostly complete, Partial, or Not logged. Add estimated untracked calories when useful.</div></div>
      <div class="row soft"><strong>4. Keep phases separate</strong><div class="small muted">Start a new phase when changing between a normal cut, maintenance transition, or RFL.</div></div>
      <div class="row soft"><strong>5. Review, then apply</strong><div class="small muted">Recommendations are never applied automatically. Low-confidence data produces no calorie change.</div></div>
      <button onclick="closeModal();setDietView('diary')">Review today’s diary</button>
    </div>`);
}
