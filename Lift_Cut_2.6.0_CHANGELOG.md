# Lift & Cut 2.6.0 — complete changelog

## Objective

Reduce nutrition-logging friction while retaining the quality of USDA and Open Food Facts as optional reference sources.

## Local-first food library

- Unified search over recent diary entries, favourites, saved foods, recipes, meal templates and the private ingredient cache.
- Results prioritised by recency, use count and favourite status.
- Works without a network connection.
- Online sources appear as a separate deliberate action.

## Diary workflow

- Meal-grouped food diary.
- Edit, duplicate and delete in place.
- One-tap repeat of the last portion.
- Copy a meal from the preceding day.
- Portion preview before saving.
- Fibre and sodium included where available.
- Intake-completeness status retained for coaching calculations.

## Saved foods

- Reusable private package-label foods.
- Brand, serving description, base amount/unit, grams per serving, barcode, aliases and common measures.
- Calories, protein, carbohydrate, fat, fibre and sodium.
- Reference source and verification notes.

## Meal templates

- Save a logged meal as a reusable template.
- Log an entire template in one action.
- Favourite, edit and delete templates.
- Store the constituent food records and portions rather than only a combined calorie total.

## Recipe logging

- Log by servings.
- Log by grams consumed when finished weight is known.
- Log by percentage of the whole recipe.
- Favourite and recent recipe shortcuts.

## Quick macros

- Quick calorie-only or calorie-plus-macro entry.
- Optional conversion into a saved food.
- Designed for restaurant estimates or occasions where exact ingredients are unavailable.

## Reference databases

- USDA FoodData Central search retained.
- Open Food Facts branded-food search retained.
- Direct Open Food Facts barcode lookup added.
- 30-day phone cache, 6-hour backend search cache and 24-hour barcode cache.
- Parallel backend fetching when both sources are selected.
- Community-contributed branded data remains visibly unconfirmed until reviewed.

## User interface

- Full-height phone food logger.
- Tabs for Recent, Favourites, Saved, Recipes, Templates, Library and Barcode.
- Sticky primary actions and mobile-friendly portion controls.
- Seven-day nutrition summary.

## Data model

- App schema 7.
- New `savedFoods` collection.
- New `mealTemplates` collection.
- Expanded food-log records with amount, unit, grams, source, template, fibre and sodium.
- Expanded ingredient records with favourite/use history.
- Google Sheets schemas updated accordingly.

## Preservation

- Existing programs, including Modified MLM 6-Day Programme.
- Workout history and drafts.
- Recipes and recipe-import features.
- Body metrics and photos.
- Coaching and RFL records.
- Verified backup, migration, conflict and cloud-integrity protections.
