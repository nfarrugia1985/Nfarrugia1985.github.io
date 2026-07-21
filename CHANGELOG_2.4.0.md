# Lift & Cut 2.4.0 changelog

## Adaptive coaching engine

- Added robust smoothed trend weight using recent scale observations.
- Added weekly kilograms and percentage body-weight change.
- Added confidence descriptions based on weigh-in coverage and recency.
- Added nutrition-day completeness states and an optional untracked-calorie estimate.
- Excluded partial, unlogged or user-excluded days from expenditure estimates.
- Added overlapping 14-, 21- and 28-day energy-expenditure estimates.
- Added expenditure confidence based on analysis span, reliable nutrition coverage and weigh-in frequency.
- Added calorie-target recommendations from estimated expenditure and the selected diet-phase rate.
- Added 25 kcal rounding, a configurable maximum adjustment, a lower-confidence cap and an optional user-defined calorie floor.
- Added a seven-day cooldown after an applied target change so the weekly cap cannot be bypassed by repeatedly pressing Apply.
- Added manual confirmation before every target change.
- Added a monitoring-only guard for RFL / PSMF.

## Adherence and data quality

- Added complete, mostly complete, partial and not-logged diary states.
- Added completeness percentage, reliable-day count and excluded-day handling.
- Added protein-target days and calories-within-target days.
- Kept dietary adherence neutral: actual reliable intake drives the estimate; target adherence is displayed separately.

## Goals and phases

- Added goal type, target weight, target rate, starting calorie target and starting protein target to diet phases.
- Added goal-date estimate, earliest/latest range and planned-rate comparison.
- Added clear separation between normal cuts, maintenance transitions and RFL blocks.

## Weekly review and interface

- Added a dedicated **Diet → Weight-loss coach** screen.
- Added trend, rate, expenditure and goal-date KPI cards.
- Added a 56-day scale-and-trend graph.
- Added a weekly coaching narrative covering trend, logging, intake, protein, workouts, steps and sleep.
- Added confidence breakdown and data guide.
- Added eight-week coaching history.
- Added saved weekly coaching-review snapshots.
- Added dashboard and progress-page coaching summaries.
- Added coaching settings in More.

## Database and sync

- Increased schema version from 4 to 5.
- Added `Nutrition_Days`.
- Added `Target_Adjustments`.
- Added `Coaching_Reviews`.
- Expanded `Diet_Phases` to 18 fields.
- Added coaching settings to `Settings`.
- Added a formatted `Coaching_Dashboard` worksheet.
- Updated Apps Script read/write, initialization and state-rebuild logic.
- Updated the clean spreadsheet template and embedded starter state.

## Compatibility

- Existing local phone data migrates in place.
- Existing programs, workouts, recipes, foods, measurements, equipment, sync URL and private key are preserved.
- Recipe and EPUB import features from v2.3.8 remain available.
