# Lift & Cut 2.1.0

## What changed

### Active workout
- New mobile-first workout command screen with elapsed time, completed-set progress and live volume.
- Every field and set state saves immediately to the existing phone draft.
- Repetitions and RIR now start blank in a fresh workout, while the previous performance is shown separately. This avoids accidentally saving the previous workout as today’s workout.
- One-tap set completion validates repetitions, starts the rest timer and can move to the next incomplete set.
- Drafts recover after closing or refreshing the app.

### Progression guidance
- Double-progression recommendations use the programmed rep range, target RIR and up to three recent exposures.
- Normal training can recommend increasing, holding or resetting load.
- RFL mode prioritises preserving load and clean repetitions; it does not encourage aggressive progression.
- Standard and small load increments are configurable.

### Exercise substitutions
- Temporary workout-only swaps.
- Optional permanent replacement of the program slot.
- Search and equipment-compatible alternatives.
- A substitution reason is retained in workout notes.
- Extra exercises can be added to one workout without changing the program.

### History and timer
- Searchable workout history with 30-day totals.
- More detailed workout view, session editing, repeat and delete actions.
- Finish-workout review and saved-session summary.
- Deadline-based rest timer that remains accurate when the app is briefly backgrounded, with ±30-second controls, vibration and optional sound.

## Compatibility
- Existing local storage keys remain unchanged.
- Existing workout, recipe, measurement and sync data are migrated in place.
- The existing Google Apps Script and Google Sheet remain compatible; no backend redeployment is required.
