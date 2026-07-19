# Lift & Cut 2.3.0 — Recipe Import Foundation

## Recipe importing

- Public recipe-page import through the user's private Apps Script.
- Android/PWA share-target support for recipe links.
- Local DRM-free EPUB cookbook import with selectable batch review.
- Pasted-text fallback for blocked pages, messages and copied cookbook text.
- Duplicate hints during EPUB review.
- Source URL, author, book, import date, times, yield, tags and source nutrition retained.

## Nutrition calculation

- Ingredient-derived calories, protein, carbohydrate, fat, fibre and sodium.
- Grams, kilograms, milligrams, millilitres, litres, ounces and pounds.
- Saved household measures such as tablespoon, teaspoon, cup, slice, scoop and can.
- Finished cooked weight and calories per 100 g.
- Serving-based logging retained.
- Nutrition confidence: High, Medium, Low or Manual.

## Ingredient reference cache

- Expanded from 10 to 50 starter ingredients.
- Brand, raw/cooked state, serving basis, density, aliases and common measures.
- Confirmed versus verify status.
- Reference source, source ID and source URL.
- USDA FoodData Central and Open Food Facts search through Apps Script.
- User-created package-label records take priority through manual confirmation.

## Review and safety

- Confirmed, Likely, Unmatched and Needs unit conversion statuses.
- Bell-pepper and shellfish warnings retained for imported recipes.
- Imported website nutrition kept separately for comparison.
- Imported recipes with insufficient matches are marked Needs review.

## Data and compatibility

- App version 2.3.0.
- Schema version 4.
- Existing local storage, workouts, recipes, programs, equipment and Google Sheets settings migrate forward.
- Expanded `Ingredient_Cache`, `Recipes` and `Recipe_Ingredients` spreadsheet schemas.
- Updated Apps Script deployment required for website import and reference-food search.
- JSZip is included locally for EPUB processing.
