# Update to Lift & Cut 2.2.0

1. Export a full JSON backup in the app.
2. Upload the extracted GitHub update files to the repository root and commit replacements.
3. Reopen the installed app and confirm v2.2.0 under More.
4. Open More → Home-gym equipment → Manage equipment and select your actual equipment.
5. Open Program. Any unavailable exercise is flagged; use Adapt copy to create a matched program without changing the original.

For the structured Google Sheets Equipment_Catalog and exercise requirement columns, paste the supplied v2.2 Apps Script over the existing Code.gs, save, run initialiseFitnessDatabase, and open Deploy → Manage deployments, edit the existing web app, select New version, and deploy with the same access settings. Keep the same private key.
