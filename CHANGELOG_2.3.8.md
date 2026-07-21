# Lift & Cut v2.3.8 changelog

## Independently validated recipe parsing

- Tested ingredient formats from five Pinch of Yum recipes covering cakes, cookies, salads, shrimp dishes, sauces and alternative ingredients.
- Handles mixed numbers, Unicode fractions, quantity ranges, mixed-unit ranges, package weights, item fractions, qualitative measures and parenthetical equivalents.
- Splits compound lines such as shared spice quantities, juice plus zest, water mixed with salt, and salt plus pepper.
- Keeps genuinely ambiguous ingredients such as generic oil or “sour cream or Greek yoghurt” unresolved until the user chooses.
- Prevents cooking-method paragraphs containing incidental measurements from being mistaken for ingredients.
- Removes malformed brackets, preparation descriptions and cutting dimensions from food searches without deleting the original source wording.

## EPUB cookbook import

- Uses EPUB 3 navigation, EPUB 2 NCX navigation, cookbook indexes, anchors, headings and recipe-title classes.
- Supports multiple recipes in one chapter and one-recipe-per-chapter layouts.
- Extracts recipe names rather than assigning the cookbook title to every recipe.
- Filters front matter, principles, indexes and other non-recipe pages more conservatively.
- Labels candidates **Ready**, **Review** or **Method only** before import.
- Keeps recipe names editable and adds search plus Select ready / Select all / Clear controls.
- Detects likely sub-recipes without inventing generic nutrition values.
- Deduplicates repeated index/navigation references to the same recipe.

## Ingredient cache and nutrition matching

- Expands the generic starter ingredient cache to 224 foods.
- Adds European/Australian terminology and aliases such as yoghurt, gelatine, coriander, chilli, halloumi, beetroot, swede and rice malt syrup.
- Adds broader measures for oils, spices, cheeses, fruit, vegetables, meats, fish, nuts, seeds, stocks and packaged foods.
- Adds dedicated records for commonly encountered foods such as burrata, Castelvetrano olives, graham crackers, cornstarch, coconut products, tahini, miso, whole spices, dried herbs, kombucha, rice paper and nori.
- Preserves user-confirmed package-label records and custom foods during migration.

## Spreadsheet template

- Updates the downloadable Excel template to v2.3.8.
- Expands `Ingredient_Cache` to the same 224 generic starter foods used by the phone app.
- Keeps the existing database schema and Google Apps Script compatibility.
