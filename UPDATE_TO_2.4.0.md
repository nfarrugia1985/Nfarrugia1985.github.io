# Updating Lift & Cut to 2.4.0

Version 2.4.0 changes both the website and Google Sheets schema. Update the website first, then the Apps Script deployment.

## 1. Back up before changing anything

In the current phone app:

1. Open **More → Backup and spreadsheet**.
2. Export a full JSON backup.
3. Push the current phone copy to Google Sheets once.
4. Keep the JSON file outside the app, for example in Google Drive.

Do not clear Chrome site data and do not uninstall the current home-screen app.

## 2. Update GitHub Pages

1. Extract the v2.4.0 GitHub update ZIP.
2. Open the `Nfarrugia1985.github.io` repository.
3. Select **Add file → Upload files**.
4. Upload every extracted file to the repository root.
5. Commit the replacements to `main`.
6. Wait for GitHub Pages to deploy.
7. Open the site in Chrome and refresh once.
8. Fully close and reopen the installed app.
9. Confirm **v2.4.0** under **More → Appearance and app info**.

The update preserves the existing `liftCut.state.v2` phone database.

## 3. Update Google Apps Script

1. Open the existing Lift & Cut Google Sheet.
2. Select **Extensions → Apps Script**.
3. Replace the complete contents of `Code.gs` with the supplied v2.4.0 code.
4. Save.
5. Run `initialiseFitnessDatabase`.
6. Authorize the script if Google asks again.
7. Select **Deploy → Manage deployments**.
8. Edit the current web-app deployment.
9. Under Version, select **New version**.
10. Deploy using the existing settings.

Running `initialiseFitnessDatabase` creates or repairs the new coaching tabs while retaining the existing private sync key. The existing `/exec` URL remains the same when the current deployment is edited rather than replaced.

## 4. Reconnect and validate

In the phone app:

1. Open **More → Google Sheets sync**.
2. Select **Test connection**.
3. Select **Pull & merge**.
4. Check that your existing workouts, recipes and measurements are present.
5. Add or review one nutrition-day status, save one weekly coaching review and push once.
6. Confirm that `Nutrition_Days` and `Coaching_Reviews` receive the records.

## 5. Start using the coach

1. Log scale weight regularly.
2. Log food honestly.
3. Mark each diary day **Complete**, **Mostly complete**, **Partial**, or **Not logged**.
4. Start or edit a diet phase with a goal, target weight and planned weekly rate.
5. Open **Diet → Weight-loss coach**.
6. Review confidence before accepting any target change.
7. Save the weekly coaching review.

The engine needs roughly two weeks of useful weight and intake data before expenditure-based changes become available; three to four weeks normally produces a stronger confidence signal.

## RFL

RFL remains manually prescribed and monitoring-only. The app can track trend, intake completeness, recovery and training during the block, but it will not auto-adjust RFL calories or macros.
