# Lift & Cut v2.3.7 changelog

## Household-unit conversion

- Automatically resolves common measures including each, small, medium, large, clove, bunch, handful, sprig, stalk, slice, fillet, breast, thigh, can, cup, tablespoon and teaspoon.
- Reuses household measures from a closely related food already in the local ingredient cache.
- Falls back to food-specific standard estimates when an online result only supplies nutrition per 100 g.
- Marks fallback conversions as **Estimated unit** and shows the grams-per-unit assumption.
- Recalculates existing linked recipe ingredients and recipe totals on first launch.
- Adds **Resolve household units** to the bulk ingredient review.

## Parsing and starter foods

- Understands package formats such as `1 packet (500 g) pasta` and `2 cans 400 g tomatoes`.
- Expands unit vocabulary for jars, bottles, packets, packs, bulbs, fillets, breasts, thighs and cubes.
- Adds starter records and measures for bell peppers, cherry tomatoes, raw potatoes, celery, parsley, basil, mint, cauliflower, lettuce, cabbage, jalapeño, orange, wraps, breadcrumbs, semolina, stock cubes, chicken thighs and shrimp.
- Adds more aliases and measures to existing foods such as onion, garlic, yoghurt, chicken breast, salmon and courgette.

## Confidence

- Estimated conversions count toward recipe totals but prevent a recipe from being labelled High confidence until the measures are confirmed or weighed.
