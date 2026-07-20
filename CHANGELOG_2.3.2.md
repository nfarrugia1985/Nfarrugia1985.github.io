# Lift & Cut 2.3.2 changelog

## Ingredient matching

- Fixed migration so new starter foods are added to existing installations.
- Expanded the starter cache from 50 to 63 foods.
- Added cucumber, salt, seasoned rice vinegar, sesame oil, chilli paste, brown sugar, lime juice, sesame seeds, black pepper, water, ginger, spring onion and coriander.
- Added aliases for Persian cucumber, low-sodium soy sauce, kosher salt, tamari and common ingredient variants.
- Added a looser secondary name-matching pass while retaining the original ingredient wording.
- Added **Find unmatched online** for batch-assisted reference lookup.
- Improved USDA/Open Food Facts queries with simplified search variants.

## Quantities and measures

- Fixed fraction parsing so `1/4` is not misread as `1`.
- Added word numbers, unit/each quantities, cups, tablespoons, teaspoons, fluid ounces, cans, pieces, bunches, handfuls, pinches, sprigs, heads and stalks.
- Added inverted quantities such as `Juice of 1/2 a lime`.
- Added package forms such as `2 x 400 g` and `1 (400 g) can`.
- Added standard liquid-volume conversion and ingredient-specific household measures.
- Added a separate **Matched · amount needed** state for ingredients such as salt to taste or optional garnish.

## EPUB importing

- Removed the requirement for structured recipe metadata.
- Added semantic class/id parsing for ingredient, direction, instruction and method sections.
- Added paragraph/heading parsing where “Ingredients” and “Method” are not heading tags.
- Added unlabelled list detection for one-recipe-per-chapter cookbooks.
- Added consecutive ingredient-line and action-paragraph fallbacks.
- Added URL decoding and fragment handling for EPUB spine paths.
- Increased the scan limit to 1,000 text chapters and 500 recipes.
- Added diagnostic counts to EPUB failure messages.

## Compatibility

- Storage key remains `liftCut.state.v2`.
- Spreadsheet schema remains version 4.
- Existing workouts, recipes, foods, equipment, settings and sync credentials are preserved.
