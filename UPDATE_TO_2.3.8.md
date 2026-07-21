# Updating Lift & Cut to v2.3.8

1. In Lift & Cut, use **More → Backup and spreadsheet → Export full JSON**.
2. Push the current phone copy to Google Sheets once.
3. Extract the v2.3.8 GitHub update ZIP.
4. Upload all extracted files to the root of the `Nfarrugia1985.github.io` repository.
5. Commit the replacements to `main` and wait for GitHub Pages to deploy.
6. Open the website in Chrome and refresh it.
7. Fully close and reopen the installed home-screen app.
8. Confirm `v2.3.8` under **More → Appearance and app info**.

Do not clear Chrome site data or uninstall the current app during the update, because that can remove the local phone copy.

## Google Sheets

No Apps Script deployment or spreadsheet-schema change is required. The updated downloadable Excel template contains the expanded generic ingredient cache, but existing Google Sheets installations receive the cache through normal app migration and sync.

## Existing imported EPUB recipes

The importer improvements apply when a cookbook is imported again. Previously saved recipes are not silently renamed or replaced. To benefit from corrected titles and stricter extraction, delete only the affected old imports and re-import the EPUB after making a backup.

## Nutrition review

Starter food values remain generic reference estimates. Confirm package labels, raw/cooked state and measured amounts for foods you use regularly. Ambiguous alternatives and quantity-free ingredients remain deliberately flagged for review.
