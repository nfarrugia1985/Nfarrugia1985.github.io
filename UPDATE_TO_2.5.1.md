# Updating Lift & Cut to 2.5.1

Version 2.5.1 updates both the website and the optional Google Sheets backend.

## Before updating

1. Open the current phone app.
2. Go to **More → Backup and spreadsheet**.
3. Export a full JSON backup and keep it outside the app, preferably in Google Drive.
4. Push the current phone copy to Google Sheets once.
5. Do not clear browser site data and do not uninstall the home-screen app.

## Update GitHub Pages

1. Extract the v2.5.1 GitHub update ZIP.
2. Open the `Nfarrugia1985.github.io` repository.
3. Select **Add file → Upload files**.
4. Upload every extracted file to the repository root.
5. Commit the replacements to `main`.
6. Wait for GitHub Pages to deploy.
7. Open the normal website in Chrome and refresh it.
8. Fully close and reopen the installed app.
9. Confirm **v2.5.1** under **More → Appearance and app info**.

## Update Google Apps Script

1. Open the existing Lift & Cut Google Sheet.
2. Select **Extensions → Apps Script**.
3. Replace all existing `Code.gs` content with the supplied v2.5.1 code.
4. Save.
5. Run `initialiseFitnessDatabase`.
6. Approve access if Google asks.
7. Select **Deploy → Manage deployments**.
8. Edit the existing deployment.
9. Select **New version** and deploy with the same access settings.

Editing the existing deployment preserves the current `/exec` URL. Initialisation preserves the private sync key.

## Post-upgrade checks

1. Open **More → Google Sheets sync**.
2. Press **Test connection**.
3. Press **Pull & merge**.
4. Confirm that existing workouts, recipes, body metrics, phases and RFL records remain present.
5. Create one test body-weight or nutrition entry.
6. Push to Sheets.
7. Confirm that the cloud status becomes **Synced**.
8. Open the spreadsheet and confirm the new sheets exist:
   - `App_State_Backup`
   - `Deleted_Records`
   - `Sync_Audit`
9. From the spreadsheet menu, run **Lift & Cut → Verify cloud-state integrity**.

## Recovery controls

Phone: **More → Data safety → Safety centre**

Spreadsheet menu:

- **Verify cloud-state integrity**
- **Restore previous cloud snapshot**
- **Show recent sync audit**

Do not use “Replace cloud copy” or “Replace phone copy” unless you deliberately intend to overwrite the other copy. Both actions require typed confirmation and create or retain a rollback copy.
