# Lift & Cut 2.6.4 — USDA relevance and live-lookup hotfix

- Reworked local USDA search into progressive relevance stages.
- Multi-word matches must contain every token of the active phrase.
- Suffix/head-food phrases are tried before adjective-only phrases.
- `dry white wine` now resolves to white wine rather than dry white cheese or white sorghum.
- Descriptor cases such as `small shrimp` still fall back to `shrimp`.
- Keyword fallback only returns foods that actually contain the fallback word.
- Broadened matches display the term used.
- Apps Script health timeout increased from 6.5 to 15 seconds to reduce false unreachable warnings during cold starts/mobile data.
- Live-search errors now clearly state that the bundled USDA library remains available offline.
- Live USDA button labelled optional.
- No schema, Sheet, or Apps Script code change is required.
