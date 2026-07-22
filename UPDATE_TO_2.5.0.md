# Updating Lift & Cut to 2.5.0

Version 2.5.0 changes both the website and the optional Google Sheets schema. Update the website first, then update Apps Script.

## 1. Back up before changing anything

In the current phone app:

1. Open **More -> Backup and spreadsheet**.
2. Export a full JSON backup.
3. Push the current phone copy to Google Sheets once.
4. Save the JSON file outside the app, for example in Google Drive.

Do not clear Chrome site data and do not uninstall the current home-screen app.

## 2. Update GitHub Pages

1. Extract the v2.5.0 GitHub update ZIP.
2. Open your GitHub Pages repository.
3. Select **Add file -> Upload files**.
4. Upload every extracted file to the repository root.
5. Commit the replacements to `main`.
6. Wait for GitHub Pages to deploy.
7. Open the site in Chrome and refresh once.
8. Fully close and reopen the installed app.
9. Confirm **v2.5.0** under **More -> Appearance and app info**.

The update preserves the existing `liftCut.state.v2` local phone database and migrates it to schema 6.

## 3. Update Google Apps Script

1. Open the existing Lift & Cut Google Sheet.
2. Select **Extensions -> Apps Script**.
3. Replace all content in `Code.gs` with the supplied v2.5.0 code.
4. Save.
5. Select and run `initialiseFitnessDatabase`.
6. Authorize the script if Google asks again.
7. Select **Deploy -> Manage deployments**.
8. Edit the current web-app deployment.
9. Under Version, select **New version**.
10. Deploy using the existing settings.

Running `initialiseFitnessDatabase` creates or repairs the RFL tabs, expands the existing tables and retains the current private sync key. Editing the existing deployment preserves the `/exec` URL.

Do not replace your populated Google Sheet with the blank workbook template.

## 4. Reconnect and validate

In the phone app:

1. Open **More -> Google Sheets sync**.
2. Select **Test connection**.
3. Select **Pull & merge**.
4. Confirm that workouts, recipes, measurements and coaching data remain present.
5. Open **Diet -> RFL mode** and verify the setup page opens.
6. Save a temporary RFL daily check-in or planned event, push once, and confirm that it reaches the new RFL worksheet.

## 5. Set up an RFL phase

1. Open **Diet -> RFL mode**.
2. Select **Set up RFL phase**.
3. Enter the body-composition basis, category inputs and activity type.
4. Review the calculated protein range and confirm the target you intend to follow.
5. Review the proposed duration and category-specific break schedule.
6. Record the professional-support status and acknowledge the safety boundaries.
7. Save the phase.

The app can switch automatically to the built-in two-day RFL program. It does not decide whether RFL is appropriate and does not provide stimulant, medication, electrolyte or supplement dosing.

## 6. End the block deliberately

Use **End / transition** from the RFL dashboard. The workflow:

- closes the current RFL phase;
- records the actual end date and weight;
- creates a maintenance/transition phase;
- optionally restores the program used before RFL.

## 7. Delete a custom program

Open **Program**, select a user-created, cloned or equipment-matched program and choose **Delete program**.

- Built-in programs cannot be deleted.
- Completed workout history is retained.
- If the program was active, the app selects `RFL2` during RFL or `UL4` otherwise.
- An unfinished draft associated with that program is removed only after confirmation.

## Troubleshooting an old cached version

If the app still reports an older version after GitHub has deployed:

1. Open the normal website in Chrome.
2. Refresh it once.
3. Fully close the installed app from Android recent apps.
4. Reopen it.

Do not clear site data unless a current JSON backup has been tested, because clearing site data removes the local phone copy.
