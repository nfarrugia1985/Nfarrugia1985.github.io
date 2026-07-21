# Lift & Cut 2.4.0

Lift & Cut is a mobile-first, local-first progressive web app for home-gym training, nutrition, recipes, body measurements and adaptive weight-loss coaching. Optional Google Sheets sync provides a private cloud backup and structured analysis database.

## Version 2.4.0 — Adaptive Weight-Loss Coach

This release adds:

- Smoothed trend weight and weekly rate of change.
- Nutrition-day completeness scoring, including untracked-calorie estimates and deliberate exclusions.
- Estimated daily energy expenditure from reliable intake and trend-weight change.
- Confidence-labelled calorie-target recommendations with user confirmation, a per-review cap and a seven-day adjustment cooldown.
- Adherence analysis that separates target adherence from data completeness.
- Goal-date estimates with an uncertainty range.
- Expanded diet-phase tracking for normal cuts, maintenance transitions and RFL blocks.
- Saved weekly coaching reviews and an eight-week history.
- A new Coaching_Dashboard and normalized coaching tables in the spreadsheet database.

RFL / PSMF is monitoring-only: Lift & Cut does not automatically recalculate or alter an RFL prescription.

Lift & Cut is independently implemented and is not affiliated with MacroFactor. “MacroFactor-style” describes the product direction only; this app does not reproduce MacroFactor's proprietary algorithm.

## Files

- `index.html`, `app.js`, `coaching-engine-v240.js`, `styles.css` — mobile app.
- `recipe-import-v238.js` — recipe and EPUB import foundation retained from v2.3.8.
- `sw.js`, `manifest.webmanifest`, `icons/` — installable PWA files.
- `seed_database.json` — clean starter state.
- `Fitness_Database_Template.xlsx` — v2.4 spreadsheet template.
- `UPDATE_TO_2.4.0.md` — upgrade instructions.
- `CHANGELOG_2.4.0.md` — detailed changes.
- `Lift_Cut_2.4.0_TEST_REPORT.txt` — validation summary.

## Important storage note

The phone remains the immediate local copy. Use full JSON export regularly, sync to Google Sheets, and export before updating the site or Apps Script. Do not clear browser site data during an upgrade.
