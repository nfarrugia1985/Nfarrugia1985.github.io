# Lift & Cut 2.5.0 changelog

Release date: 22 July 2026

## Guided RFL mode

- Added a third Diet view dedicated to RFL / PSMF planning and monitoring.
- Added a guided setup wizard with:
  - sex-specific body-fat category bands;
  - body-fat-based or direct lean-body-mass calculation;
  - activity-specific protein-factor ranges;
  - a user-confirmed daily protein target;
  - category-specific duration validation;
  - free-meal and structured-refeed planning;
  - prior-program selection and optional switch to the RFL program;
  - professional-support status and explicit acknowledgements.
- Added automatic planning events for:
  - Category 1 end-of-block refeed / transition;
  - Category 2 weekly free meal and approximately five-hour structured refeed;
  - Category 3 twice-weekly free meals;
  - end-of-block maintenance or diet-break transition.
- Added a daily RFL dashboard with:
  - protein progress;
  - intake-completeness status;
  - non-starchy vegetable servings;
  - water intake;
  - essential-fat-plan check;
  - book/clinician supplement-plan check;
  - training or recovery status;
  - symptom logging;
  - planned event completion;
  - weight trend and strength-retention summaries;
  - RFL-friendly recipe shortcuts;
  - seven-day log history.
- Added serious-symptom escalation messaging for fainting, chest pain, palpitations, severe weakness and persistent vomiting.
- Added an End / transition workflow that closes the RFL phase, creates a maintenance/transition phase and optionally restores the previous training program.
- Added an RFL shortcut to the PWA manifest and a dashboard status card.
- Added RFL quick-check-in access under Quick Add.

## Training during RFL

- Marked `UL4`, `RFL2` and `GVS_EXTRA` as protected built-in programs.
- Retained the two-day full-body RFL program with two work sets on compounds, one accessory set where appropriate and 2-3 RIR targets.
- Increased default rest for RFL compound slots to 150 seconds while retaining 90-second accessory rests.
- Preserved equipment-aware substitutions and workout-history features.

## Custom-program deletion

- Added Delete program to custom, cloned and equipment-matched programs.
- Added a confirmation summary showing the sessions affected and the number of historical workouts retained.
- Built-in programs cannot be deleted.
- Completed workout records remain available after program deletion.
- The active-program fallback is `RFL2` during an active RFL phase and `UL4` otherwise.
- An unfinished workout draft tied to the deleted program is discarded after confirmation.
- RFL previous-program references are repaired when their target program is deleted.

## Data model

- Increased local schema version from 5 to 6.
- Added `rflProfiles`, `rflDailyLogs` and `rflEvents` collections.
- Added RFL settings for vegetable goal, automatic program switch, previous-program restoration, professional-support status, last RFL view and safety acknowledgement.
- Added `builtIn` and `sourceType` metadata to programs.
- Added `plannedDays` and `rflCategory` to diet phases.
- Included RFL tables in JSON backup, CSV export and Google Sheets round-trip sync.

## Google Sheets and Apps Script

- Added `RFL_Profiles`, `RFL_Daily_Log`, `RFL_Events` and `RFL_Dashboard`.
- Expanded `Programs` and `Diet_Phases` schemas.
- Added RFL dashboard formulas, event status, source notes and safety boundaries.
- Preserved existing sync keys and deployment URLs when updating the current Apps Script deployment.

## Safety and scope

- The app uses the category, protein, training-volume and break framework from the supplied first edition of *The Rapid Fat Loss Handbook*.
- It does not reproduce the book, decide whether RFL is appropriate, or provide medication, stimulant, electrolyte or supplement dosing.
- RFL remains monitoring-only in the adaptive calorie engine; automatic calorie-target changes remain disabled for RFL phases.
