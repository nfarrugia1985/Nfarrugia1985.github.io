# Lift & Cut 2.5.0

Lift & Cut is a mobile-first, local-first progressive web app for home-gym training, nutrition, recipes, body measurements, adaptive weight-loss coaching and optional Google Sheets backup.

## Version 2.5.0 - Guided RFL mode and program management

This major release adds a dedicated Rapid Fat Loss (RFL / PSMF) workspace based on the category, protein, training-volume and break framework in the user-supplied first edition of *The Rapid Fat Loss Handbook* (2005). It is a planning and monitoring tool; it does not decide whether an extreme diet is suitable for a user.

### RFL workspace

- Guided setup using sex, body-fat estimate or directly entered lean body mass.
- Category 1, 2 or 3 classification with manual override and a recorded calculation basis.
- Activity-specific protein-factor range and a user-confirmed protein target.
- Category-specific block-duration checks, planned free meals, refeeds and transition events.
- Optional automatic switch to the built-in two-day RFL full-body program.
- Daily protein, vegetable, water, nutrition-completeness and recovery checklist.
- User-controlled checkboxes for their own essential-fat and clinician/book supplement plan.
- Symptom logging with prominent escalation for concerning symptoms.
- Weight-trend context, strength-retention review, RFL-friendly recipes and recent-day history.
- Explicit end-of-block workflow that creates a transition or maintenance phase and can restore the prior training program.

The app deliberately omits medication, stimulant, electrolyte and supplement dosing. Users should apply instructions from their own clinician and legally obtained source material rather than treating Lift & Cut as medical advice.

### Custom-program deletion

- User-created, cloned and equipment-matched programs can be deleted.
- Built-in programs are protected.
- Deleting a program does not delete completed workout history.
- If the deleted program is active, Lift & Cut safely switches to the RFL program during an active RFL phase or to the normal upper/lower program otherwise.
- Any unfinished draft tied to the deleted program is removed after confirmation.

### Google Sheets schema 6

The optional spreadsheet backend adds:

- `RFL_Profiles`
- `RFL_Daily_Log`
- `RFL_Events`
- `RFL_Dashboard`

The `Programs` table now records whether a program is built in and how it was created. `Diet_Phases` now records planned duration and RFL category.

## Files

- `index.html`, `app.js`, `rfl-mode-v250.js`, `coaching-engine-v240.js`, `styles.css` - mobile app.
- `recipe-import-v238.js` and `jszip.min.js` - website and EPUB recipe importing.
- `sw.js`, `manifest.webmanifest`, `icons/` - installable PWA files.
- `seed_database.json` - clean schema-6 starter state.
- `Fitness_Database_Template.xlsx` - blank v2.5 spreadsheet template.
- `UPDATE_TO_2.5.0.md` - upgrade instructions.
- `CHANGELOG_2.5.0.md` - detailed release notes.
- `Lift_Cut_2.5.0_TEST_REPORT.txt` - validation summary.

## Storage and backups

The phone remains the immediate working copy. Use full JSON export regularly and sync to Google Sheets. Export a backup before updating the website or Apps Script. Do not clear browser site data during an upgrade.

## Safety boundary

RFL / PSMF is an extreme, short-term diet phase. Current NICE guidance states that very-low-energy diets under 800 kcal/day should be used only within a specialist service, be nutritionally complete, last no more than 12 weeks, include clinical support and include plans for food reintroduction. See:

https://www.nice.org.uk/guidance/ng246/chapter/Recommendations#low-energy-and-very-low-energy-diets
