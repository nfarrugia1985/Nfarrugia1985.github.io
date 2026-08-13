# Lift & Cut 2.6.3 — update guide

Version 2.6.3 is a consolidated update for users still on 2.6.0. You do **not** need to install 2.6.1 or 2.6.2 first.

## What is included

- v2.6.1 nutrition reliability fixes.
- v2.6.2 bundled local USDA FoodData Central library (13,578 foods).
- v2.6.3 progressive descriptive-word and keyword fallback matching.

## Install

1. In Lift & Cut, export a **verified backup**.
2. Push the current phone copy to Google Sheets once.
3. Extract `Lift_Cut_GitHub_Local_USDA_Descriptor_Matching_Update_v2.6.3.zip`.
4. Upload every extracted file to the root of `Nfarrugia1985.github.io` and commit to `main`.
5. Wait for GitHub Pages deployment.
6. Refresh the normal website once in Chrome.
7. Fully close and reopen the installed Lift & Cut app.
8. Confirm **v2.6.3 / Schema 7** under More → Appearance and app info.

No Google Sheets or Apps Script update is required if your v2.6.0 backend is already installed.

## Suggested checks

Search for:

- `small shrimp`
- `1 pound medium-sized shrimp, peeled and deveined`
- `jumbo raw shrimp peeled`
- `cooked shrimp`
- `large Persian cucumber`
- `organic low sodium soy sauce`
- `fresh flat leaf parsley finely chopped`
- `freshly cracked black pepper`
- `low fat cottage cheese`
- `small red bell pepper`

The app should retain the specific food state when useful (for example raw/cooked or low-fat) and fall back to the core ingredient when descriptive wording would otherwise prevent a match.
