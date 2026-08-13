# Lift & Cut 2.6.0 — website update guide

## Purpose

Version 2.6.0 makes food logging fast enough for consistent daily use. The phone searches its own recent foods, saved products, recipes, meal templates and ingredient cache first. USDA and Open Food Facts remain available when a new food is absent locally.

## Safety preparation

1. Export a verified full JSON backup.
2. Push the current phone copy to Google Sheets.
3. Keep the backup in Google Drive or another location outside Lift & Cut.
4. Do not clear Chrome site data and do not uninstall the current PWA.

## GitHub Pages update

1. Extract `Lift_Cut_GitHub_Fast_Nutrition_Update_v2.6.0.zip`.
2. Open the GitHub Pages repository.
3. Select **Add file → Upload files**.
4. Upload the extracted files to the repository root; do not upload the ZIP itself.
5. Commit to `main`.
6. Wait for Pages deployment.
7. Refresh the website in Chrome, close the installed app completely and reopen it.
8. Confirm `v2.6.0` and `schema 7` under app information.

## What changes on first open

- The schema migrates from 6 to 7.
- Existing diary entries are retained and normalised into the expanded food-log format.
- `savedFoods` and `mealTemplates` collections are added.
- Existing ingredient-cache records receive favourite and use-history fields.
- Existing sync credentials remain on the phone.

## Fast daily workflow

1. Open **Diet**.
2. Choose a meal and tap **Add food**.
3. Select from Recent, Favourites, Saved foods, Recipes or Templates.
4. Use online search only when local results are insufficient.
5. Confirm and save a useful online result so future logs are instant.
6. Mark the diary complete when the day is fully logged.

## Reference-search behaviour

- Local results are immediate and work offline.
- Phone reference results are cached for 30 days by default.
- Server search results are cached for 6 hours.
- Barcode responses are cached for 24 hours.
- USDA and Open Food Facts requests run in parallel when both are selected.
- The app does not silently replace a confirmed package-label record with a generic result.

## Rollback

If the update does not open correctly:

1. Do not clear site storage.
2. Open **More → Data safety → Safety centre**.
3. Review the automatic pre-migration snapshot.
4. Restore or merge only after reviewing the comparison.
5. Keep the exported pre-update backup until normal logging and syncing have been verified.
