# Lift & Cut 2.5.1

A mobile-first, local-first training, nutrition, recipe, adaptive weight-loss and guided RFL application.

## What 2.5.1 changes

Version 2.5.1 is a maintenance and data-protection release. It adds:

- explicit migration reporting for schemas 2 through 6;
- a redundant IndexedDB mirror of the phone database;
- local rollback snapshots before destructive or replacement operations;
- integrity-scanned backup review before merge or replacement;
- verified full JSON backups containing drafts, cooking progress and progress-photo files;
- record-level three-way cloud merging and deletion tombstones;
- separate “last cloud revision merged” and “latest revision observed” values;
- safer force-push and cloud-replacement confirmations;
- SHA-256 cloud-state verification;
- atomic Apps Script writes with one previous verified cloud snapshot;
- structured `Deleted_Records` and `Sync_Audit` worksheets;
- data-safety diagnostics that exclude private keys and record contents.

## Public website files

The GitHub Pages website remains safe to publish. It does not contain a populated personal profile, Apps Script deployment URL, private sync key, workout history, food diary, measurements or photos.

## Upgrade

Read `UPDATE_TO_2.5.1.md`. Back up the phone app before uploading replacements or changing Apps Script.

## Storage model

1. The phone/browser database is the working copy.
2. A second local IndexedDB record mirrors successful saves.
3. Google Sheets is an optional cloud backup and analysis layer.
4. Full JSON export is the portable disaster-recovery backup.
5. Progress-photo files remain local and in full backups; only metadata syncs to Sheets.

## Important privacy rule

Never publish a populated Google Sheet, backup, diagnostics export, Apps Script URL or private sync key in the GitHub repository.
