# Lift & Cut 2.6.5 — Ingredient Matching Workflow Fix

## Fixed

- Recipe ingredient names are now cleaned automatically before matching.
- Leading connector words left by preparation text are removed. Examples:
  - `peeled and grated fresh ginger` → `ginger`
  - `and fresh ginger` → `ginger`
  - `wheat-free tamari` → `tamari`
  - `medium-sized shrimp, peeled and deveined` → `shrimp`
- Attached vulgar fractions are parsed correctly. `1½ teaspoons` is now read as `1.5 tsp`, rather than treating `teaspoons` as part of the food name.
- Editing the food-search box in **Match ingredient** now refreshes both saved-food and bundled-USDA results immediately.
- Added an explicit **Search local library** action. Pressing Enter in the search box performs the same local refresh.
- **Auto-match all** now:
  1. cleans all eligible ingredient names;
  2. checks trusted saved foods;
  3. checks the bundled 13,578-food USDA library;
  4. displays progress and a result summary.
- **Live lookup remaining** now runs local matching first and contacts Apps Script only for unresolved foods.
- When live lookup is unavailable, the app reports this clearly instead of appearing to do nothing.
- Exact percentage/state matches are ranked ahead of generic variants. For example, `95% lean ground beef` resolves to the USDA 95/5 entry before broader ground-beef records.
- Added local aliases for tamari, red/chilli pepper flakes and fresh ginger.
- Ingredient matching returns to the recipe or bulk-review workflow after a selection, preserving the existing navigation behaviour.

## Data compatibility

- App version: 2.6.5
- Schema: 7, unchanged
- No Google Sheets or Apps Script update is required.
- Existing recipes, foods, workouts, diet records and sync settings are retained.
