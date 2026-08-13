# Lift & Cut 2.5.1 changelog

## Phone data protection

- Added a redundant local mirror in IndexedDB.
- Added automatic rollback snapshots before cloud replacement, backup replacement, seed restoration, integrity repair and factory reset.
- Added a Data Safety centre showing primary-save health, mirror availability, structural-integrity score, persistent-storage status and rollback snapshots.
- Added snapshot review, merge, replacement, export and deletion.
- Added a diagnostic export containing app/schema/storage/sync status without private keys or user records.
- Added verified full JSON backups with a checksum and restore preview.
- Full backups include the workout draft, cooking progress and progress-photo files.
- Exported backups and snapshots omit the Apps Script URL, private key and client ID.

## Migration

- Added explicit migration reporting for schemas 2→3, 3→4, 4→5 and 5→6.
- Added a pre-migration snapshot before older data is transformed.
- Added validation for collection types, duplicate IDs, active-program references, workout parent records and RFL parent phases.
- Preserved custom programs, recipes, measurements, workout history and user-confirmed foods through migration.

## Sync safety

- Split the last cloud revision actually merged from the latest cloud revision merely observed.
- A status check can no longer authorise overwriting a newer cloud copy.
- Added `Synced`, `Waiting to sync`, `Syncing`, `Cloud newer`, `Conflict`, `Verify first`, `Sync error` and `Phone only` states.
- Added three-way record-level merging using a verified sync shadow.
- Added record tombstones so older copies do not resurrect deleted records.
- Added typed confirmations for force-pushing and phone/cloud replacement.
- Added payload and cloud-state checksum verification.
- Added explicit conflict reporting before any protected push.

## Apps Script and Google Sheets

- Added SHA-256 and character-count verification for `App_State`.
- App-state writes are verified before success is returned.
- The previous verified cloud state is retained in the hidden `App_State_Backup` worksheet.
- Added `Deleted_Records` for deletion tombstones.
- Added `Sync_Audit` for the latest 500 pull, push, conflict, error and restore events.
- Added menu actions to verify integrity, restore the previous cloud snapshot and view recent sync activity.
- Structured-sheet refresh errors are now non-fatal warnings after the cloud app state is stored safely.
- Added cloud hash, state size, warning and integrity metadata to status responses.

## Destructive actions

- Custom-program deletion retains completed workout history and records a tombstone.
- Related RFL events are tombstoned before a schedule is regenerated.
- Deleted recipes, workout sessions, workout sets, food entries, measurements, diet phases, RFL records, progress-photo metadata and custom exercises now produce deletion records.
- Factory reset and seed-library restoration retain a local rollback snapshot of app records.

## Compatibility

- Schema remains version 6.
- Existing Google Sheets URLs and private keys remain valid after the existing deployment is updated to a new version.
- The built-in normal, RFL and optional arms/delts programs remain protected.
- No recipe, coaching or RFL feature has been removed.
