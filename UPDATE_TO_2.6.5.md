# Update Lift & Cut to 2.6.5

1. In Lift & Cut, open **More → Data safety and backup → Export verified backup**.
2. Extract `Lift_Cut_GitHub_Ingredient_Matching_Fix_v2.6.5.zip`.
3. In the root of the `Nfarrugia1985.github.io` repository, choose **Add file → Upload files**.
4. Upload every extracted file and commit the replacements to `main`.
5. Wait for GitHub Pages to finish deploying.
6. Open the website in Chrome and refresh once.
7. Fully close the installed Lift & Cut app, then reopen it.
8. Confirm **v2.6.5 / Schema 7** under **More → Appearance and app info**.

No Google Sheets or Apps Script update is needed.

## Quick verification

Import or edit a recipe containing:

- `2 teaspoons peeled and grated fresh ginger`
- `1½ teaspoons wheat-free tamari`
- `1 teaspoon red pepper flakes`

Press **Auto-match all**. The expected matches are ginger root, tamari soy sauce and red/cayenne pepper. Open **Match ingredient**, change the search text, and confirm that the local results change without a live lookup.
