# Lift & Cut 2.6.3 — Local USDA matching refinement

## Added

- Progressive local USDA matching using the full phrase, a descriptor-cleaned phrase, meaningful sub-phrases, then individual meaningful words.
- Transparent labels when a result was obtained by ignoring descriptive wording.
- Query normalisation for common recipe wording including flat-leaf parsley, wild-caught/farm-raised wording, low-fat/nonfat, low-sodium, smoked paprika and extra-virgin olive oil.
- Ranking protection so prepared dishes do not normally outrank the underlying generic ingredient.

## Examples

- `small shrimp` → shrimp
- `medium-sized shrimp, peeled and deveined` → shrimp
- `jumbo raw shrimp peeled` → raw shrimp
- `cooked shrimp` → cooked shrimp
- `large Persian cucumber` → cucumber
- `fresh flat leaf parsley finely chopped` → fresh parsley
- `freshly cracked black pepper` → black pepper
- `low fat cottage cheese` → low-fat cottage cheese

## Included previous fixes

Version 2.6.3 also includes everything from 2.6.1 and 2.6.2, so a user on 2.6.0 can update directly.
