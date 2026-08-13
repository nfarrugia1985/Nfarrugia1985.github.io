# Updating Lift & Cut to 2.5.2

1. Export a verified JSON backup from the current app.
2. Upload the extracted website hotfix files to the root of the GitHub Pages repository and commit to `main`.
3. Wait for GitHub Pages deployment.
4. Refresh the site in Chrome, fully close the installed app, then reopen it.
5. Confirm v2.5.2 under More → Appearance and app info.
6. Open Cloud sync and tap Test, then Pull & merge.
7. After the merge, tap Push phone → Sheets once.

Do not use Replace cloud copy for this migration issue. No Apps Script redeployment is required.
