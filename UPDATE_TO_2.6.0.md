# Updating Lift & Cut to 2.6.0

## Before updating

1. In Lift & Cut, open **More → Data safety and backup**.
2. Export a verified JSON backup and keep it outside the app.
3. Push the current phone copy to Google Sheets once.
4. Do not clear browser storage or uninstall the existing home-screen app.

## Update GitHub Pages

1. Extract the v2.6.0 GitHub update ZIP.
2. Upload every extracted file to the root of the GitHub Pages repository.
3. Commit the replacements to `main`.
4. Wait for deployment.
5. Open the normal website in Chrome and refresh it once.
6. Fully close and reopen the installed app.
7. Confirm **v2.6.0 · schema 7** under **More → Appearance and app info**.

## Update Google Apps Script

1. Open the existing Lift & Cut Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Replace the contents of `Code.gs` with `Lift_Cut_Google_Apps_Script_Code_v2.6.0.txt`.
4. Save and run `initialiseFitnessDatabase`.
5. Choose **Deploy → Manage deployments**.
6. Edit the existing deployment, choose **New version**, and deploy with the existing access settings.
7. Keep the existing `/exec` URL and private key.

## Validate

1. In the app, open **More → Google Sheets sync**.
2. Press **Test**.
3. Press **Pull & merge**.
4. Add a harmless food entry or saved food.
5. Press **Push phone → Sheets**.
6. Confirm the status becomes **Synced**.
7. Confirm the `Saved_Foods`, `Meal_Templates` and expanded `Food_Log` worksheets exist.

## Recommended first test

1. Open **Diet → Add food**.
2. Search for a food you have already used; it should appear immediately from local data.
3. Save a package-label food.
4. Log it twice using **Add last portion**.
5. Save the meal as a template and log the template again.
6. Search USDA/Open Food Facts only for a food not already stored locally.
