# Lift & Cut 2.6.0 — Google Sheets and Apps Script update

The backend update is required because v2.6.0 introduces schema 7 and two new synchronized collections.

## Update the existing Apps Script

1. Open the existing Lift & Cut Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Replace all existing `Code.gs` content with `Lift_Cut_Google_Apps_Script_Code_v2.6.0.txt`.
4. Save.
5. Select and run `initialiseFitnessDatabase`.
6. Approve access if Google requests it.
7. Open **Deploy → Manage deployments**.
8. Edit the current web-app deployment.
9. Select **New version** and deploy with the existing settings.

Editing the existing deployment preserves the `/exec` URL. Initialisation preserves the private sync key and existing populated data.

## New and expanded worksheets

### New

- `Saved_Foods`
- `Meal_Templates`

### Expanded

- `Ingredient_Cache`: favourite, use count and last-used timestamp.
- `Food_Log`: source, amount, unit, grams, template, fibre and sodium fields.
- `Settings`: nutrition-logger preferences and fibre targets.
- `Sync_Config`: app version 2.6.0 and schema 7.

## Search-performance changes

- Apps Script `CacheService` stores food-search results for 6 hours.
- Barcode lookups are cached for 24 hours.
- **Search both** sends USDA and Open Food Facts requests with `UrlFetchApp.fetchAll()` so they run in one batch rather than serially.
- A simplified query is attempted only when the first search produces too few results.

## Post-update validation

1. In Lift & Cut, press **Test** under Cloud sync.
2. Press **Pull & merge**.
3. Save a new package-label food.
4. Push to Sheets.
5. Verify the item appears in `Saved_Foods`.
6. Save a meal as a template, push again and verify it appears in `Meal_Templates`.
7. Check **Lift & Cut → Verify cloud-state integrity**.
8. Review **Lift & Cut → Show recent sync audit**.

## Blank workbook

`Lift_Cut_Fitness_Database_Template_v2.6.0.xlsx` is for new users. Do not replace a populated existing workbook with the blank template.
