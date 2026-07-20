# Lift & Cut 2.3.2 — Recipe reliability update

## What this fixes

- Existing phones now receive the expanded starter ingredient library. Earlier releases preserved the old cache and therefore could not find foods added in v2.3.
- Ingredient aliases now recognise examples such as Persian cucumber, low-sodium soy sauce and kosher salt.
- Fractions and household measures now parse correctly, including `1/4 cup`, `2 tbsp`, `1 tsp`, `4 cucumbers`, `Juice of 1/2 a lime`, `2 x 400 g`, and `1 (400 g) can`.
- Cups, tablespoons and teaspoons use ingredient-specific gram weights or liquid density.
- Unit quantities such as cucumbers, onions, eggs and limes use saved per-item weights.
- A matched food with no stated quantity is shown as **Matched · amount needed**, rather than incorrectly appearing unmatched.
- EPUB detection now supports ordinary text cookbooks without Schema.org data, including class-based sections, paragraph headings, unlabelled ingredient/instruction lists and one-recipe-per-chapter layouts.
- EPUB errors now report how many chapters were scanned and how many contained readable text.
- Online food search tries simplified query variants, such as `Persian cucumbers → cucumber raw`.

## Website update

1. In Lift & Cut, use **More → Backup and spreadsheet → Export full JSON**.
2. Extract `Lift_Cut_GitHub_Recipe_Reliability_Update_v2.3.2.zip`.
3. Upload all extracted files to the root of `Nfarrugia1985.github.io`.
4. Commit the replacements to `main`.
5. Wait for GitHub Pages to deploy.
6. Refresh the website, then fully close and reopen the installed app.
7. Confirm **v2.3.2** under **More → Appearance and app info**.

When v2.3.2 opens, it automatically merges the new starter foods into the phone database without deleting or overwriting user-confirmed foods.

## Apps Script update

1. Open the Lift & Cut Google Sheet.
2. Choose **Extensions → Apps Script**.
3. Replace `Code.gs` with `Lift_Cut_Google_Apps_Script_Code_v2.3.2.txt`.
4. Save.
5. Choose **Deploy → Manage deployments → Edit**.
6. Select **New version** and deploy.

The `/exec` URL and private sync key remain unchanged. No spreadsheet reinitialisation or schema change is required.

## First test

Import the Sivan's Kitchen cucumber salad again. The expected matches are:

- `4 Persian cucumbers` → Cucumber, raw; estimated 100 g each until replaced by an actual weight.
- `Kosher salt` → Salt; marked **amount needed** because the ingredient list gives no quantity.
- `1/4 cup low-sodium soy sauce` → Soy sauce; converted to approximately 60 ml/g using the saved liquid measure.
- `1/4 cup seasoned rice vinegar` → Rice vinegar, seasoned.
- `2 tbsp sesame oil` → Sesame oil.
- `1 tbsp chilli paste` → Chilli paste.
- `1 tbsp brown sugar` → Brown sugar.
- `Juice of 1/2 a lime` → Lime juice; estimated from half a lime.
- Optional sesame seeds → matched, but excluded from totals until an amount is entered.

Starter weights and generic nutrition are explicitly marked for verification. Package labels and weighed ingredients should replace estimates where precision matters.
