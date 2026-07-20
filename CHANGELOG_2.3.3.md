# Lift & Cut 2.3.3 changelog

## EPUB recipe names

- Reads EPUB 3 navigation labels and EPUB 2 NCX table-of-contents labels.
- Prioritises recipe-title classes and nearby chapter headings over the cookbook title.
- Uses short title-like text immediately before an Ingredients section when no formal heading exists.
- Shows repeated-title warnings during EPUB review.
- Allows every detected recipe name to be corrected before import.

## Recipe reader and cooking mode

- Adds an **Open** action that displays a recipe without entering edit mode.
- Presents ingredients as a preparation checklist.
- Splits instructions into clear numbered cooking steps.
- Makes each step independently checkable.
- Saves checklist progress locally so an interrupted cooking session can be resumed.
- Adds a reset-checklist action.
- Detects hours, minutes, seconds and time ranges in cooking instructions.
- Adds optional timer buttons to timed steps and the recipe cook-time summary.
- Uses the existing persistent floating timer, including sound/vibration where enabled.

## Data compatibility

- Existing recipes, nutrition records, programs and Google Sheets sync settings are preserved.
- No Google Sheets or Apps Script schema change is required.
- Cooking checklist state is intentionally device-local and is not written to Google Sheets.
