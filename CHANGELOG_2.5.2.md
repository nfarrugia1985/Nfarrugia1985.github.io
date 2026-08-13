# Lift & Cut 2.5.2 changelog

## Sync migration hotfix

- Fixes Pull & merge failing with errors such as `nutritionDays is not an array` when the cloud copy predates newer schema collections.
- Verifies the untouched cloud payload checksum first, then migrates the cloud state to schema 6, then validates the migrated state.
- Keeps rollback snapshots, conflict detection, deletion tombstones, sync-base protection and the existing Apps Script connection unchanged.
- No Google Sheets or Apps Script update is required.
