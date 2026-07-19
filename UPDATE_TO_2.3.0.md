# Lift & Cut 2.3 Update Guide

## Before updating

1. Open the current phone app.
2. Go to **More → Backup and spreadsheet**.
3. Export a **full JSON backup** and keep it outside the phone.
4. Push the current phone data to Google Sheets once.

The update preserves the existing local storage key, Google Sheets connection, workouts, programs, equipment, recipes, food log and progress records.

## Update GitHub Pages

1. Download and extract `Lift_Cut_GitHub_Recipe_Import_Update_v2.3.0.zip`.
2. Open your `<username>.github.io` repository.
3. Choose **Add file → Upload files**.
4. Select all extracted files and upload them to the repository root.
5. Commit the replacements to `main`.
6. Wait for GitHub Pages to deploy.
7. Open the website once in Chrome, refresh it, then fully close and reopen the installed app.
8. Confirm **v2.3.0** under **More → Appearance and app info**.

The update ZIP contains only root-level files. It does not require uploading the `icons` folder again.

## Update Google Apps Script

Website URL importing and online food-reference search require the v2.3 Apps Script.

1. Open the Lift & Cut Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Replace the entire contents of `Code.gs` with `Lift_Cut_Google_Apps_Script_Code_v2.3.0.txt`.
4. Save.
5. Select `initialiseFitnessDatabase` and press **Run**.
6. Approve access if Google requests it.
7. Choose **Deploy → Manage deployments**.
8. Edit the existing web-app deployment.
9. Select **New version** and deploy.
10. Keep the existing `/exec` URL and private sync key unless Google explicitly generated a different deployment URL.
11. In the phone app, open **More → Google Sheets sync → Test connection**.
12. Use **Pull & merge**, then make one test push.

Running `initialiseFitnessDatabase` updates the structured recipe and ingredient sheets without intentionally changing the private sync key.

## Optional USDA FoodData Central key

Reference searches work with the rate-limited `DEMO_KEY`. A personal USDA key can be stored privately in Apps Script properties:

1. Reload the Google Sheet after updating the script.
2. Open **Lift & Cut → Set USDA FoodData Central API key**.
3. Paste the key and approve.

The key is not written into the public GitHub site or into normal spreadsheet cells.

## First tests

### Pasted recipe

1. Open **Diet → Import**.
2. Choose **Paste recipe text**.
3. Paste a title, serving line, ingredient list and instructions.
4. Confirm detected ingredients and calculated nutrition.

### Website recipe

1. Open **Diet → Import → Recipe website**.
2. Paste a public recipe-page URL.
3. Review serving size, ingredient matches and source nutrition.

Some sites may block automated retrieval or may not publish structured recipe data. Use pasted text for those sites.

### EPUB cookbook

1. Open **Diet → Import → EPUB cookbook**.
2. Choose a DRM-free `.epub` file.
3. Select the detected recipes to import.
4. Review any items marked **Needs review**.

The EPUB is read locally by the phone app. It is not placed in the GitHub repository or Google Sheet.

## Important review rules

- Verify branded products against the current package label.
- Keep raw and cooked ingredient records separate.
- Confirm whether household measures such as cups, tablespoons and cans have the correct gram conversion.
- Use finished cooked weight when you want nutrition per 100 g or want to log a weighed portion.
- Treat **Likely**, **Unmatched** and **Needs unit conversion** as review warnings.
- Imported website nutrition is retained for comparison; ingredient-derived nutrition is the main logging value when ingredient calculation is enabled.
