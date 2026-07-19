# Update your GitHub Pages app to Lift & Cut 2.1

1. Open your existing `<username>.github.io` repository.
2. Upload the root files from the **update package**. Confirm replacement of files with the same names and commit the changes.
3. The icon folder and spreadsheet template are unchanged, so they do not need to be uploaded again.
4. Open your GitHub Pages address in Chrome and refresh once. If the installed home-screen app still shows the old screen, fully close it and reopen it. A second refresh may be needed while the new service worker takes control.
5. Check **More → Appearance and app info**. It should show version `2.1.0`.

Your existing phone data and Google Sheets connection remain in place because version 2.1 deliberately retains the v2 storage keys and sync schema. Export a full JSON backup before any website update as a precaution.
