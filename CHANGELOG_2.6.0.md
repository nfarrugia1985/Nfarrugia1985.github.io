# Lift & Cut 2.6.0 changelog

## Fast local nutrition logging

- Replaced the previous food-entry flow with a full-height mobile logger.
- Searches recent diary entries, saved foods, recipes, meal templates and the private ingredient cache before offering online search.
- Added favourites and usage-based ordering.
- Added one-tap **Add last portion**.
- Added meal-grouped diary cards with edit, duplicate and delete actions.
- Added copy-previous-day meal actions.

## Saved foods and package labels

- Added a private Saved Foods library.
- Foods can be entered from a package label or saved from a reference result.
- Saved records support serving description, grams per serving, barcode, aliases, common measures, fibre and sodium.
- Confirmed foods can be reused without another network request.

## Meal templates

- Any logged meal can be saved as a template.
- Templates retain their individual items and quantities.
- Templates can be favourited, edited, logged again or deleted.

## Recipes

- Recipes can be logged by serving count, grams consumed or percentage of the whole recipe.
- Favourite and recent recipes are shown locally.
- Recipe portions include fibre and sodium where available.

## Quick macros

- Added a fast calories/macros entry for situations where a complete food record is unnecessary.
- Quick entries can optionally be saved as reusable foods.

## Faster reference-food lookup

- Added a 30-day phone cache for reference results.
- Added a 6-hour Apps Script cache for food searches.
- Added a 24-hour Apps Script cache for barcode lookups.
- USDA and Open Food Facts are requested in parallel when **Search both** is selected.
- A simplified second search is used only when the first query returns too few results.
- Online search is always optional and never blocks local logging.

## Barcode lookup

- Added direct Open Food Facts barcode lookup.
- Added camera scanning where `BarcodeDetector` is supported by the installed browser.
- Manual barcode entry remains available on all devices.

## Daily and weekly nutrition review

- Added calories and macros remaining.
- Added fibre and sodium where known.
- Added meal totals and a seven-day nutrition summary.
- Retained intake-completeness scoring for the weight-loss coach.

## Data and sync

- Schema updated from 6 to 7.
- Added synchronized `savedFoods` and `mealTemplates` collections.
- Expanded Food Log and Ingredient Cache schemas.
- Added `Saved_Foods` and `Meal_Templates` worksheets.
- Retained verified backups, conflict-safe merging, deletion tombstones, prior cloud snapshot and sync audit.

## Compatibility

- Existing workouts, programs, recipes, body metrics, coaching records, RFL records and sync credentials are preserved through migration.
- The Modified MLM 6-Day Programme from v2.5.3 remains included.
- The Google Apps Script backend must be updated for schema 7.
