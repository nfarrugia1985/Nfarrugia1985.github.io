
'use strict';

const APP_VERSION = '2.3.0';
const STORAGE_KEY = 'liftCut.state.v2';
const PAGE_KEY = 'liftCut.page.v2';
const DRAFT_KEY = 'liftCut.workoutDraft.v2';
const PHOTO_DB = 'liftCut.photos.v1';
const PHOTO_STORE = 'photos';
const DEFAULT_STATE = {"version":2,"schemaVersion":4,"createdFor":"","meta":{"appVersion":"2.3.0","revision":0,"lastModifiedAt":"2026-07-19T20:55:00.000Z","lastCloudSyncAt":"","lastCloudRevision":0,"clientId":""},"settings":{"profileName":"","age":"","heightCm":"","targetWeightKg":"","activeProgram":"UL4","dietMode":"Normal / moderate deficit","normalCalorieTarget":2200,"normalProteinTarget":170,"normalCarbTarget":180,"normalFatTarget":70,"rflCalorieTarget":"","rflProteinTarget":"","rflCarbTarget":"","rflFatTarget":"","stepsTarget":8000,"sleepTargetHrs":7.5,"waterTargetMl":2500,"noBellPeppers":false,"noShellfish":false,"lastSession":"UL4|lower-a","weekStartsMonday":true,"theme":"system","autoSync":false,"syncUrl":"","syncKey":"","availableEquipment":["Bodyweight / floor space","Power rack / squat stands","Barbell + plates","Adjustable bench","Adjustable dumbbells","Cable station / functional trainer","Pull-up bar","Gymnastic rings / suspension trainer","Calf raise platform / machine","Ankle strap","Rope cable attachment","Ab wheel"],"restTimerDefaultSec":120,"autoRestTimer":true,"restTimerSound":true,"autoAdvanceSets":true,"weightIncrementKg":2.5,"smallWeightIncrementKg":1,"trainView":"workout","dumbbellWeightIncrementKg":2,"customEquipment":[],"equipmentProfileName":"Custom home gym","recipeImportAutoMatch":true,"recipeImportPreferMetric":true,"foodReferenceSource":"USDA + Open Food Facts"},"programs":[{"id":"UL4","name":"Normal 4-day Upper/Lower","mode":"Normal / moderate deficit","sessions":[{"id":"lower-a","name":"Lower A","day":"Monday","exercises":[{"id":"ul4-lower-a-1","name":"High-bar back squat","sets":3,"reps":"6-8","rir":"1-2","notes":"Use controlled depth; substitute if back/knees complain.","order":1,"exerciseId":"EX001","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-a-2","name":"Romanian deadlift","sets":3,"reps":"6-8","rir":"1-2","notes":"Replace with hip thrust or cable pull-through if lower back is limiting.","order":2,"exerciseId":"EX008","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-a-3","name":"Bulgarian split squat","sets":2,"reps":"8-12 each leg","rir":"1-2","notes":"","order":3,"exerciseId":"EX006","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-a-4","name":"Cable leg curl","sets":2,"reps":"10-15","rir":"1-2","notes":"","order":4,"exerciseId":"EX012","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-a-5","name":"Standing calf raise","sets":3,"reps":"8-15","rir":"1-2","notes":"","order":5,"exerciseId":"EX013","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-a-6","name":"Dead bug or Pallof press","sets":2,"reps":"10-15","rir":"2","notes":"","order":6,"exerciseId":"EX124","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"}],"order":1,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""},{"id":"upper-a","name":"Upper A","day":"Tuesday","exercises":[{"id":"ul4-upper-a-1","name":"Barbell bench press","sets":3,"reps":"6-8","rir":"1-2","notes":"","order":1,"exerciseId":"EX014","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-a-2","name":"Chest-supported dumbbell row","sets":3,"reps":"6-10","rir":"1-2","notes":"Back-friendly row option.","order":2,"exerciseId":"EX023","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-a-3","name":"Incline dumbbell press","sets":2,"reps":"8-12","rir":"1-2","notes":"","order":3,"exerciseId":"EX016","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-a-4","name":"Cable lat pulldown or ring chin-up","sets":2,"reps":"8-12","rir":"1-2","notes":"","order":4,"exerciseId":"EX125","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ul4-upper-a-5","name":"Cable lateral raise","sets":3,"reps":"12-20","rir":"1","notes":"GVS-style controlled delt work.","order":5,"exerciseId":"EX033","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-a-6","name":"Cable triceps pushdown","sets":2,"reps":"10-15","rir":"1","notes":"","order":6,"exerciseId":"EX038","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-a-7","name":"Incline dumbbell or cable curl","sets":2,"reps":"10-15","rir":"1","notes":"","order":7,"exerciseId":"EX126","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"}],"order":2,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""},{"id":"lower-b","name":"Lower B","day":"Thursday","exercises":[{"id":"ul4-lower-b-1","name":"Front squat or heels-elevated squat","sets":3,"reps":"6-10","rir":"1-2","notes":"Choose the squat pattern that feels best.","order":1,"exerciseId":"EX127","restSec":150,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ul4-lower-b-2","name":"Barbell hip thrust","sets":3,"reps":"8-12","rir":"1-2","notes":"","order":2,"exerciseId":"EX010","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-b-3","name":"Reverse lunge","sets":2,"reps":"8-12 each leg","rir":"1-2","notes":"","order":3,"exerciseId":"EX007","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-b-4","name":"Cable leg curl","sets":2,"reps":"12-20","rir":"1-2","notes":"","order":4,"exerciseId":"EX012","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-b-5","name":"Standing calf raise","sets":3,"reps":"12-20","rir":"1-2","notes":"","order":5,"exerciseId":"EX013","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-lower-b-6","name":"Ab wheel or cable crunch","sets":2,"reps":"8-15","rir":"1-2","notes":"","order":6,"exerciseId":"EX128","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"}],"order":3,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""},{"id":"upper-b","name":"Upper B","day":"Friday","exercises":[{"id":"ul4-upper-b-1","name":"Weighted chin-up or heavy pulldown","sets":3,"reps":"6-8","rir":"1-2","notes":"","order":1,"exerciseId":"EX129","restSec":150,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ul4-upper-b-2","name":"Seated dumbbell overhead press","sets":3,"reps":"6-10","rir":"1-2","notes":"","order":2,"exerciseId":"EX020","restSec":150,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-b-3","name":"One-arm cable row","sets":2,"reps":"8-12","rir":"1-2","notes":"","order":3,"exerciseId":"EX024","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-b-4","name":"Close-grip bench press or weighted ring push-up","sets":2,"reps":"8-12","rir":"1-2","notes":"","order":4,"exerciseId":"EX130","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ul4-upper-b-5","name":"Cable rear-delt fly or face pull","sets":3,"reps":"12-20","rir":"1","notes":"","order":5,"exerciseId":"EX131","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ul4-upper-b-6","name":"Cable lateral raise","sets":2,"reps":"12-20","rir":"1","notes":"","order":6,"exerciseId":"EX033","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-b-7","name":"Overhead cable triceps extension","sets":2,"reps":"10-15","rir":"1","notes":"","order":7,"exerciseId":"EX039","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ul4-upper-b-8","name":"Dumbbell hammer curl","sets":2,"reps":"10-15","rir":"1","notes":"","order":8,"exerciseId":"EX043","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"}],"order":4,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""}],"description":"Four-day upper/lower plan for normal dieting, maintenance, or slow fat loss.","active":true,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"RFL2","name":"RFL 2-day Full Body","mode":"RFL / PSMF","sessions":[{"id":"rfl-full-body-a","name":"RFL Full Body A","day":"Monday","exercises":[{"id":"rfl2-rfl-full-body-a-1","name":"High-bar back squat","sets":2,"reps":"5-8","rir":"2-3","notes":"Preserve strength; no grinders.","order":1,"exerciseId":"EX001","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-a-2","name":"Barbell bench press","sets":2,"reps":"5-8","rir":"2-3","notes":"","order":2,"exerciseId":"EX014","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-a-3","name":"Chest-supported dumbbell row","sets":2,"reps":"6-10","rir":"2-3","notes":"","order":3,"exerciseId":"EX023","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-a-4","name":"Romanian deadlift or hip thrust","sets":2,"reps":"6-10","rir":"2-3","notes":"","order":4,"exerciseId":"EX132","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"rfl2-rfl-full-body-a-5","name":"Cable lateral raise","sets":1,"reps":"12-20","rir":"2-3","notes":"","order":5,"exerciseId":"EX033","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-a-6","name":"Cable curl","sets":1,"reps":"10-15","rir":"2-3","notes":"","order":6,"exerciseId":"EX041","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-a-7","name":"Cable triceps pushdown","sets":1,"reps":"10-15","rir":"2-3","notes":"","order":7,"exerciseId":"EX038","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"}],"order":1,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""},{"id":"rfl-full-body-b","name":"RFL Full Body B","day":"Thursday","exercises":[{"id":"rfl2-rfl-full-body-b-1","name":"Front squat or Bulgarian split squat","sets":2,"reps":"6-10","rir":"2-3","notes":"","order":1,"exerciseId":"EX133","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"rfl2-rfl-full-body-b-2","name":"Incline dumbbell or seated dumbbell press","sets":2,"reps":"6-10","rir":"2-3","notes":"","order":2,"exerciseId":"EX022","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-b-3","name":"Pulldown or chin-up","sets":2,"reps":"6-10","rir":"2-3","notes":"","order":3,"exerciseId":"EX134","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"rfl2-rfl-full-body-b-4","name":"Hip thrust or cable leg curl","sets":2,"reps":"8-12","rir":"2-3","notes":"","order":4,"exerciseId":"EX135","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"rfl2-rfl-full-body-b-5","name":"Rear-delt cable fly","sets":1,"reps":"12-20","rir":"2-3","notes":"","order":5,"exerciseId":"EX037","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"rfl2-rfl-full-body-b-6","name":"Hammer curl","sets":1,"reps":"10-15","rir":"2-3","notes":"","order":6,"exerciseId":"EX136","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"rfl2-rfl-full-body-b-7","name":"Overhead triceps extension","sets":1,"reps":"10-15","rir":"2-3","notes":"","order":7,"exerciseId":"EX137","restSec":90,"updatedAt":"2026-07-19T15:45:00.000Z"}],"order":2,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""}],"description":"Two-day low-volume full-body plan for RFL blocks; preserve strength rather than chase fatigue.","active":true,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"GVS_EXTRA","name":"Optional GVS-style Delts/Arms","mode":"Optional only outside RFL","sessions":[{"id":"delts-arms","name":"Delts/Arms","day":"Saturday","exercises":[{"id":"gvs_extra-delts-arms-1","name":"Cable lateral raise","sets":3,"reps":"15-25","rir":"0-1 on final safe set","notes":"Only if recovered; skip during RFL.","order":1,"exerciseId":"EX033","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"gvs_extra-delts-arms-2","name":"Cable rear-delt fly","sets":3,"reps":"15-25","rir":"0-1 on final safe set","notes":"","order":2,"exerciseId":"EX035","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"gvs_extra-delts-arms-3","name":"Cable or ring curl","sets":2,"reps":"10-15","rir":"1","notes":"","order":3,"exerciseId":"EX045","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"gvs_extra-delts-arms-4","name":"Overhead cable triceps extension","sets":2,"reps":"10-15","rir":"1","notes":"","order":4,"exerciseId":"EX039","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"gvs_extra-delts-arms-5","name":"Standing calf raise","sets":3,"reps":"12-20","rir":"1","notes":"","order":5,"exerciseId":"EX013","restSec":90,"updatedAt":"2026-07-19T10:00:00.000Z"}],"order":1,"updatedAt":"2026-07-19T10:00:00.000Z","notes":""}],"description":"Optional short delt/arm/calves session only when recovered and outside RFL.","active":true,"updatedAt":"2026-07-19T10:00:00.000Z"}],"exercises":[{"id":"EX001","name":"High-bar back squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates","primaryFor":"Squat","difficulty":"Main lift","notes":"Use if bracing and depth remain controlled.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":[]},{"id":"EX002","name":"Front squat","muscle":"Quads / Core","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates","primaryFor":"Squat","difficulty":"Main lift","notes":"Useful if it is more back-friendly than back squat.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":[]},{"id":"EX003","name":"Heels-elevated squat","muscle":"Quads","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates OR Dumbbells","primaryFor":"Squat","difficulty":"Main lift","notes":"More quad bias; use a small wedge or plates under heels.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates"],["Dumbbells"]],"optionalEquipment":["Slant board / heel wedge"]},{"id":"EX004","name":"Box squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates + Bench or box","primaryFor":"Squat","difficulty":"Substitution","notes":"Useful for controlled depth.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates","Bench or box"]],"optionalEquipment":[]},{"id":"EX005","name":"Goblet squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Dumbbells OR Kettlebells","primaryFor":"Squat","difficulty":"Substitution","notes":"Good warm-up or deload option.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells"],["Kettlebells"]],"optionalEquipment":["Slant board / heel wedge"]},{"id":"EX006","name":"Bulgarian split squat","muscle":"Quads / Glutes","pattern":"Single-leg","equipment":"Bench or box","primaryFor":"Squat","difficulty":"Accessory","notes":"High stimulus with lower spinal loading.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bench or box"]],"optionalEquipment":["Dumbbells"]},{"id":"EX007","name":"Reverse lunge","muscle":"Quads / Glutes","pattern":"Single-leg","equipment":"Bodyweight / floor space","primaryFor":"Squat","difficulty":"Accessory","notes":"Usually knee-friendly if stride is controlled.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells"]},{"id":"EX008","name":"Romanian deadlift","muscle":"Hamstrings / Glutes","pattern":"Hip hinge","equipment":"Barbell + plates OR Dumbbells OR Kettlebells","primaryFor":"Hinge","difficulty":"Main lift","notes":"Only use if lower back is not the limiter.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Barbell + plates"],["Dumbbells"],["Kettlebells"]],"optionalEquipment":[]},{"id":"EX009","name":"Dumbbell Romanian deadlift","muscle":"Hamstrings / Glutes","pattern":"Hip hinge","equipment":"Dumbbells","primaryFor":"Hinge","difficulty":"Substitution","notes":"Easier to control than barbell for some lifters.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells"]],"optionalEquipment":[]},{"id":"EX010","name":"Barbell hip thrust","muscle":"Glutes / Hamstrings","pattern":"Hip extension","equipment":"Barbell + plates + Bench","primaryFor":"Hinge","difficulty":"Main lift","notes":"Back-friendly hinge replacement.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Barbell + plates","Bench"]],"optionalEquipment":[]},{"id":"EX011","name":"Cable pull-through","muscle":"Glutes / Hamstrings","pattern":"Hip hinge","equipment":"Cable station","primaryFor":"Hinge","difficulty":"Substitution","notes":"Good replacement for RDL if back feels taxed.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX012","name":"Cable leg curl","muscle":"Hamstrings","pattern":"Knee flexion","equipment":"Cable station + Ankle strap","primaryFor":"Hamstrings","difficulty":"Accessory","notes":"Can use bench/prone setup with ankle strap.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station","Ankle strap"]],"optionalEquipment":[]},{"id":"EX013","name":"Standing calf raise","muscle":"Calves","pattern":"Calf raise","equipment":"Bodyweight / floor space","primaryFor":"Calves","difficulty":"Accessory","notes":"Pause in stretched and contracted positions.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells","Barbell + plates","Calf raise platform / machine"]},{"id":"EX014","name":"Barbell bench press","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Power rack / squat stands + Barbell + plates + Bench","primaryFor":"Press","difficulty":"Main lift","notes":"Use safeties in rack.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates","Bench"]],"optionalEquipment":[]},{"id":"EX015","name":"Dumbbell bench press","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Dumbbells + Bench","primaryFor":"Press","difficulty":"Substitution","notes":"Good shoulder-friendly press variation.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[]},{"id":"EX016","name":"Incline dumbbell press","muscle":"Upper chest","pattern":"Incline press","equipment":"Dumbbells + Adjustable bench","primaryFor":"Press","difficulty":"Accessory","notes":"Use controlled eccentric.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Adjustable bench"]],"optionalEquipment":[]},{"id":"EX017","name":"Floor press","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Barbell + plates OR Dumbbells","primaryFor":"Press","difficulty":"Substitution","notes":"Good if shoulder range is sensitive.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Barbell + plates"],["Dumbbells"]],"optionalEquipment":["Power rack / squat stands"]},{"id":"EX018","name":"Close-grip bench press","muscle":"Triceps / Chest","pattern":"Horizontal press","equipment":"Power rack / squat stands + Barbell + plates + Bench","primaryFor":"Triceps","difficulty":"Accessory","notes":"Avoid painful wrist/elbow angles.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Power rack / squat stands","Barbell + plates","Bench"]],"optionalEquipment":[]},{"id":"EX019","name":"Weighted ring push-up","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Gymnastic rings / suspension trainer","primaryFor":"Press","difficulty":"Substitution","notes":"Progress by adding load or elevating feet.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Gymnastic rings / suspension trainer"]],"optionalEquipment":["Weighted vest"]},{"id":"EX020","name":"Seated dumbbell overhead press","muscle":"Delts / Triceps","pattern":"Vertical press","equipment":"Dumbbells + Bench","primaryFor":"Press","difficulty":"Main lift","notes":"More back-friendly than standing press.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[]},{"id":"EX021","name":"Standing overhead press","muscle":"Delts / Triceps","pattern":"Vertical press","equipment":"Barbell + plates","primaryFor":"Press","difficulty":"Substitution","notes":"Use only if bracing is solid.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Barbell + plates"]],"optionalEquipment":[]},{"id":"EX022","name":"Incline dumbbell or seated dumbbell press","muscle":"Chest / Delts","pattern":"Incline or vertical press","equipment":"Dumbbells + Adjustable bench","primaryFor":"Press","difficulty":"RFL combined slot","notes":"Choose the one that feels strongest that day.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Adjustable bench"]],"optionalEquipment":[]},{"id":"EX023","name":"Chest-supported dumbbell row","muscle":"Upper back / Lats","pattern":"Horizontal pull","equipment":"Dumbbells + Adjustable bench","primaryFor":"Row","difficulty":"Main lift","notes":"Preferred back-friendly row.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Adjustable bench"]],"optionalEquipment":[]},{"id":"EX024","name":"One-arm cable row","muscle":"Upper back / Lats","pattern":"Horizontal pull","equipment":"Cable station","primaryFor":"Row","difficulty":"Accessory","notes":"Keep torso stable.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX025","name":"Seated cable row","muscle":"Upper back / Lats","pattern":"Horizontal pull","equipment":"Cable station OR Lat pulldown / low row machine","primaryFor":"Row","difficulty":"Substitution","notes":"Good controlled row option.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"],["Lat pulldown / low row machine"]],"optionalEquipment":[]},{"id":"EX026","name":"One-arm dumbbell row","muscle":"Lats / Upper back","pattern":"Horizontal pull","equipment":"Dumbbells + Bench","primaryFor":"Row","difficulty":"Substitution","notes":"Support torso on bench.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[]},{"id":"EX027","name":"Inverted row","muscle":"Upper back","pattern":"Horizontal pull","equipment":"Gymnastic rings / suspension trainer OR Power rack / squat stands + Barbell + plates","primaryFor":"Row","difficulty":"Substitution","notes":"Adjust body angle for difficulty.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Gymnastic rings / suspension trainer"],["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":["Weighted vest"]},{"id":"EX028","name":"Barbell row","muscle":"Upper back","pattern":"Horizontal pull","equipment":"Barbell + plates","primaryFor":"Row","difficulty":"Caution","notes":"Use only if lower back is not limiting.","rflOk":"No during RFL if fatigued","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Barbell + plates"]],"optionalEquipment":[]},{"id":"EX029","name":"Cable lat pulldown","muscle":"Lats","pattern":"Vertical pull","equipment":"Cable station OR Lat pulldown / low row machine","primaryFor":"Vertical pull","difficulty":"Main lift","notes":"Use controlled stretch.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"],["Lat pulldown / low row machine"]],"optionalEquipment":[]},{"id":"EX030","name":"Ring chin-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Gymnastic rings / suspension trainer","primaryFor":"Vertical pull","difficulty":"Substitution","notes":"Use assistance if needed.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Gymnastic rings / suspension trainer"]],"optionalEquipment":["Resistance bands / tubes","Dip belt / loading belt"]},{"id":"EX031","name":"Weighted chin-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Pull-up bar + Dip belt / loading belt","primaryFor":"Vertical pull","difficulty":"Main lift","notes":"Only load when reps are clean.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Pull-up bar","Dip belt / loading belt"]],"optionalEquipment":[]},{"id":"EX032","name":"Straight-arm cable pulldown","muscle":"Lats","pattern":"Pullover","equipment":"Cable station","primaryFor":"Vertical pull","difficulty":"Accessory","notes":"Good lat isolation add-on.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX033","name":"Cable lateral raise","muscle":"Side delts","pattern":"Lateral raise","equipment":"Cable station","primaryFor":"Delts","difficulty":"GVS-style accessory","notes":"High-control delt work.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX034","name":"Dumbbell lateral raise","muscle":"Side delts","pattern":"Lateral raise","equipment":"Dumbbells","primaryFor":"Delts","difficulty":"Substitution","notes":"Use strict reps; avoid swinging.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells"]],"optionalEquipment":[]},{"id":"EX035","name":"Cable rear-delt fly","muscle":"Rear delts","pattern":"Rear delt","equipment":"Cable station","primaryFor":"Rear delts","difficulty":"Accessory","notes":"Lead with elbows, not hands.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX036","name":"Face pull","muscle":"Rear delts / Upper back","pattern":"Rear delt / external rotation","equipment":"Cable station + Rope cable attachment","primaryFor":"Rear delts","difficulty":"Substitution","notes":"Good shoulder-health option.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station","Rope cable attachment"]],"optionalEquipment":[]},{"id":"EX037","name":"Rear-delt cable fly","muscle":"Rear delts","pattern":"Rear delt","equipment":"Cable station","primaryFor":"Rear delts","difficulty":"Accessory","notes":"Same as cable rear-delt fly.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX038","name":"Cable triceps pushdown","muscle":"Triceps","pattern":"Elbow extension","equipment":"Cable station","primaryFor":"Triceps","difficulty":"Accessory","notes":"Keep upper arm fixed.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX039","name":"Overhead cable triceps extension","muscle":"Triceps long head","pattern":"Elbow extension","equipment":"Cable station + Rope cable attachment","primaryFor":"Triceps","difficulty":"Accessory","notes":"Use pain-free elbow path.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station","Rope cable attachment"]],"optionalEquipment":[]},{"id":"EX040","name":"Dumbbell skull crusher","muscle":"Triceps","pattern":"Elbow extension","equipment":"Dumbbells","primaryFor":"Triceps","difficulty":"Substitution","notes":"Use light and controlled.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells"]],"optionalEquipment":[]},{"id":"EX041","name":"Cable curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Cable station","primaryFor":"Biceps","difficulty":"Accessory","notes":"Constant tension curl.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX042","name":"Incline dumbbell curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Dumbbells + Adjustable bench","primaryFor":"Biceps","difficulty":"Accessory","notes":"Great long-head stretch; do not overextend shoulder.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells","Adjustable bench"]],"optionalEquipment":[]},{"id":"EX043","name":"Dumbbell hammer curl","muscle":"Biceps / Brachialis","pattern":"Elbow flexion","equipment":"Dumbbells","primaryFor":"Biceps","difficulty":"Accessory","notes":"Neutral-grip elbow-friendly curl.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Dumbbells"]],"optionalEquipment":[]},{"id":"EX044","name":"Ring curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Gymnastic rings / suspension trainer","primaryFor":"Biceps","difficulty":"Substitution","notes":"Adjust angle for difficulty.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Gymnastic rings / suspension trainer"]],"optionalEquipment":[]},{"id":"EX045","name":"Cable or ring curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Cable station OR Gymnastic rings / suspension trainer","primaryFor":"Biceps","difficulty":"Optional slot","notes":"Choose cable if elbows feel sensitive.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"],["Gymnastic rings / suspension trainer"]],"optionalEquipment":[]},{"id":"EX046","name":"Dead bug","muscle":"Core","pattern":"Anti-extension","equipment":"Bodyweight / floor space","primaryFor":"Core","difficulty":"Accessory","notes":"Control lower back position.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":[]},{"id":"EX047","name":"Pallof press","muscle":"Core","pattern":"Anti-rotation","equipment":"Cable station OR Resistance bands / tubes","primaryFor":"Core","difficulty":"Accessory","notes":"Pause each rep.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"],["Resistance bands / tubes"]],"optionalEquipment":[]},{"id":"EX048","name":"Ab wheel","muscle":"Core","pattern":"Anti-extension","equipment":"Ab wheel","primaryFor":"Core","difficulty":"Accessory","notes":"Use only if lower back stays neutral.","rflOk":"No if fatigued","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Ab wheel"]],"optionalEquipment":[]},{"id":"EX049","name":"Cable crunch","muscle":"Abs","pattern":"Spinal flexion","equipment":"Cable station","primaryFor":"Core","difficulty":"Substitution","notes":"Controlled range; avoid yanking.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Cable station"]],"optionalEquipment":[]},{"id":"EX050","name":"Brisk walking","muscle":"Cardio / Recovery","pattern":"Aerobic","equipment":"Bodyweight / floor space OR Treadmill","primaryFor":"Cardio","difficulty":"Recovery","notes":"Easy pace where you can speak in sentences.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bodyweight / floor space"],["Treadmill"]],"optionalEquipment":["Weighted vest"]},{"id":"EX051","name":"Easy bike","muscle":"Cardio / Recovery","pattern":"Aerobic","equipment":"Exercise bike","primaryFor":"Cardio","difficulty":"Recovery","notes":"Low impact option if available.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Exercise bike"]],"optionalEquipment":[]},{"id":"EX052","name":"Mobility flow","muscle":"Recovery","pattern":"Mobility","equipment":"Bodyweight / floor space","primaryFor":"Recovery","difficulty":"Recovery","notes":"5-10 minutes hips, t-spine, ankles.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T10:00:00.000Z","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":[]},{"id":"EX053","name":"Push-up","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Weighted vest","Resistance bands / tubes"],"primaryFor":"Horizontal press","difficulty":"Substitution","notes":"Use handles or dumbbells as grips if wrists prefer neutral.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX054","name":"Feet-elevated push-up","muscle":"Upper chest / Triceps","pattern":"Incline press","equipment":"Bodyweight / floor space + Bench or box","equipmentOptions":[["Bodyweight / floor space","Bench or box"]],"optionalEquipment":["Weighted vest"],"primaryFor":"Incline press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX055","name":"Pike push-up","muscle":"Delts / Triceps","pattern":"Vertical press","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Bench or box"],"primaryFor":"Vertical press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX056","name":"Parallel-bar dip","muscle":"Chest / Triceps","pattern":"Vertical dip","equipment":"Dip station / parallel bars","equipmentOptions":[["Dip station / parallel bars"]],"optionalEquipment":["Dip belt / loading belt","Resistance bands / tubes"],"primaryFor":"Horizontal press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX057","name":"Band-assisted dip","muscle":"Chest / Triceps","pattern":"Vertical dip","equipment":"Dip station / parallel bars + Resistance bands / tubes","equipmentOptions":[["Dip station / parallel bars","Resistance bands / tubes"]],"optionalEquipment":[],"primaryFor":"Horizontal press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX058","name":"Low-bar back squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates","equipmentOptions":[["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Main lift","notes":"Use only if shoulder position and technique are comfortable.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX059","name":"Safety-bar squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Power rack / squat stands + Safety squat bar","equipmentOptions":[["Power rack / squat stands","Safety squat bar"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Main lift","notes":"Often easier on shoulders and upper back.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX060","name":"Smith-machine squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Smith machine","equipmentOptions":[["Smith machine"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Main lift","notes":"Choose a foot position that keeps the movement comfortable.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX061","name":"Landmine squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Barbell + plates + Landmine attachment","equipmentOptions":[["Barbell + plates","Landmine attachment"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Substitution","notes":"Stable front-loaded squat option.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX062","name":"Leg press","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Leg press / hack squat","equipmentOptions":[["Leg press / hack squat"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Main lift","notes":"Use controlled depth and avoid pelvis rolling.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX063","name":"Hack squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Leg press / hack squat","equipmentOptions":[["Leg press / hack squat"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Main lift","notes":"Quad-biased machine squat.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX064","name":"Leg extension","muscle":"Quads","pattern":"Knee extension","equipment":"Leg extension machine","equipmentOptions":[["Leg extension machine"]],"optionalEquipment":[],"primaryFor":"Quads","difficulty":"Isolation","notes":"Control the top and lower without bouncing.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX065","name":"Step-up","muscle":"Quads / Glutes","pattern":"Single-leg","equipment":"Bench or box","equipmentOptions":[["Bench or box"]],"optionalEquipment":["Dumbbells","Kettlebells"],"primaryFor":"Single-leg","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX066","name":"Walking lunge","muscle":"Quads / Glutes","pattern":"Single-leg","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells","Kettlebells","Weighted vest"],"primaryFor":"Single-leg","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX067","name":"Bodyweight split squat","muscle":"Quads / Glutes","pattern":"Single-leg","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells","Weighted vest"],"primaryFor":"Single-leg","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX068","name":"Conventional deadlift","muscle":"Hamstrings / Glutes / Back","pattern":"Hip hinge","equipment":"Barbell + plates","equipmentOptions":[["Barbell + plates"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Main lift","notes":"Use only when technique and recovery support it.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX069","name":"Sumo deadlift","muscle":"Glutes / Hamstrings / Adductors","pattern":"Hip hinge","equipment":"Barbell + plates","equipmentOptions":[["Barbell + plates"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Main lift","notes":"Choose stance based on comfort and proportions.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX070","name":"Trap-bar deadlift","muscle":"Quads / Glutes / Hamstrings","pattern":"Hip hinge","equipment":"Trap / hex bar + Barbell plates","equipmentOptions":[["Trap / hex bar","Barbell plates"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Main lift","notes":"Often easier to keep the load close to the body.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX071","name":"Rack pull","muscle":"Glutes / Back","pattern":"Hip hinge","equipment":"Power rack / squat stands + Barbell + plates","equipmentOptions":[["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Main lift","notes":"Use sparingly; high loading can be fatiguing.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX072","name":"Good morning","muscle":"Hamstrings / Glutes","pattern":"Hip hinge","equipment":"Power rack / squat stands + Barbell + plates","equipmentOptions":[["Power rack / squat stands","Barbell + plates"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Substitution","notes":"Light, controlled hinge; not a max-load movement.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX073","name":"Kettlebell Romanian deadlift","muscle":"Hamstrings / Glutes","pattern":"Hip hinge","equipment":"Kettlebells","equipmentOptions":[["Kettlebells"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX074","name":"Kettlebell swing","muscle":"Glutes / Conditioning","pattern":"Ballistic hinge","equipment":"Kettlebells","equipmentOptions":[["Kettlebells"]],"optionalEquipment":[],"primaryFor":"Conditioning","difficulty":"Conditioning","notes":"Use only with established hinge technique.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX075","name":"Dumbbell hip thrust","muscle":"Glutes / Hamstrings","pattern":"Hip extension","equipment":"Dumbbells + Bench","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[],"primaryFor":"Hip extension","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX076","name":"Glute bridge","muscle":"Glutes / Hamstrings","pattern":"Hip extension","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells","Barbell + plates","Resistance bands / tubes"],"primaryFor":"Hip extension","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX077","name":"Seated leg curl","muscle":"Hamstrings","pattern":"Knee flexion","equipment":"Leg curl machine","equipmentOptions":[["Leg curl machine"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX078","name":"Lying leg curl","muscle":"Hamstrings","pattern":"Knee flexion","equipment":"Leg curl machine","equipmentOptions":[["Leg curl machine"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX079","name":"Banded leg curl","muscle":"Hamstrings","pattern":"Knee flexion","equipment":"Resistance bands / tubes + Secure band anchor","equipmentOptions":[["Resistance bands / tubes","Secure band anchor"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX080","name":"Stability-ball leg curl","muscle":"Hamstrings / Glutes","pattern":"Knee flexion","equipment":"Stability ball","equipmentOptions":[["Stability ball"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX081","name":"Nordic hamstring curl","muscle":"Hamstrings","pattern":"Knee flexion","equipment":"Glute-ham developer / Nordic bench","equipmentOptions":[["Glute-ham developer / Nordic bench"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Advanced","notes":"Use assistance and a controlled eccentric.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX082","name":"Glute-ham raise","muscle":"Hamstrings / Glutes","pattern":"Knee flexion","equipment":"Glute-ham developer / Nordic bench","equipmentOptions":[["Glute-ham developer / Nordic bench"]],"optionalEquipment":[],"primaryFor":"Knee flexion","difficulty":"Advanced","notes":"Scale range of motion as needed.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX083","name":"Seated calf raise","muscle":"Soleus / Calves","pattern":"Calf raise","equipment":"Calf raise platform / machine OR Bench + Dumbbells","equipmentOptions":[["Calf raise platform / machine"],["Bench","Dumbbells"]],"optionalEquipment":[],"primaryFor":"Calf raise","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX084","name":"Single-leg calf raise","muscle":"Calves","pattern":"Calf raise","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Dumbbells","Calf raise platform / machine"],"primaryFor":"Calf raise","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX085","name":"Smith-machine bench press","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Smith machine + Bench","equipmentOptions":[["Smith machine","Bench"]],"optionalEquipment":[],"primaryFor":"Horizontal press","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX086","name":"Chest press machine","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Chest press / pec deck machine","equipmentOptions":[["Chest press / pec deck machine"]],"optionalEquipment":[],"primaryFor":"Horizontal press","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX087","name":"Dumbbell fly","muscle":"Chest","pattern":"Chest isolation","equipment":"Dumbbells + Bench","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[],"primaryFor":"Chest","difficulty":"Isolation","notes":"Use a comfortable range; avoid excessive stretch.","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX088","name":"Pec deck fly","muscle":"Chest","pattern":"Chest isolation","equipment":"Chest press / pec deck machine","equipmentOptions":[["Chest press / pec deck machine"]],"optionalEquipment":[],"primaryFor":"Chest","difficulty":"Isolation","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX089","name":"Landmine press","muscle":"Delts / Upper chest / Triceps","pattern":"Vertical press","equipment":"Barbell + plates + Landmine attachment","equipmentOptions":[["Barbell + plates","Landmine attachment"]],"optionalEquipment":[],"primaryFor":"Vertical press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX090","name":"Arnold press","muscle":"Delts / Triceps","pattern":"Vertical press","equipment":"Dumbbells + Bench","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[],"primaryFor":"Vertical press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX091","name":"Dumbbell pullover","muscle":"Lats / Chest","pattern":"Pullover","equipment":"Dumbbells + Bench","equipmentOptions":[["Dumbbells","Bench"]],"optionalEquipment":[],"primaryFor":"Pullover","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX092","name":"Landmine T-bar row","muscle":"Upper back / Lats","pattern":"Horizontal pull","equipment":"Barbell + plates + Landmine attachment","equipmentOptions":[["Barbell + plates","Landmine attachment"]],"optionalEquipment":[],"primaryFor":"Horizontal pull","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX093","name":"Band row","muscle":"Upper back / Lats","pattern":"Horizontal pull","equipment":"Resistance bands / tubes + Secure band anchor","equipmentOptions":[["Resistance bands / tubes","Secure band anchor"]],"optionalEquipment":[],"primaryFor":"Horizontal pull","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX094","name":"Band lat pulldown","muscle":"Lats","pattern":"Vertical pull","equipment":"Resistance bands / tubes + High band anchor","equipmentOptions":[["Resistance bands / tubes","High band anchor"]],"optionalEquipment":[],"primaryFor":"Vertical pull","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX095","name":"Pull-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Pull-up bar","equipmentOptions":[["Pull-up bar"]],"optionalEquipment":["Resistance bands / tubes","Dip belt / loading belt"],"primaryFor":"Vertical pull","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX096","name":"Band-assisted pull-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Pull-up bar + Resistance bands / tubes","equipmentOptions":[["Pull-up bar","Resistance bands / tubes"]],"optionalEquipment":[],"primaryFor":"Vertical pull","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX097","name":"Dumbbell rear-delt fly","muscle":"Rear delts / Upper back","pattern":"Rear delt","equipment":"Dumbbells","equipmentOptions":[["Dumbbells"]],"optionalEquipment":[],"primaryFor":"Rear delt","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX098","name":"Reverse pec deck","muscle":"Rear delts / Upper back","pattern":"Rear delt","equipment":"Chest press / pec deck machine","equipmentOptions":[["Chest press / pec deck machine"]],"optionalEquipment":[],"primaryFor":"Rear delt","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX099","name":"Band face pull","muscle":"Rear delts / Upper back","pattern":"Rear delt / external rotation","equipment":"Resistance bands / tubes + High band anchor","equipmentOptions":[["Resistance bands / tubes","High band anchor"]],"optionalEquipment":[],"primaryFor":"Rear delt","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX100","name":"Band lateral raise","muscle":"Side delts","pattern":"Lateral raise","equipment":"Resistance bands / tubes","equipmentOptions":[["Resistance bands / tubes"]],"optionalEquipment":[],"primaryFor":"Lateral raise","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX101","name":"EZ-bar curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"EZ curl bar + Barbell plates","equipmentOptions":[["EZ curl bar","Barbell plates"]],"optionalEquipment":[],"primaryFor":"Elbow flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX102","name":"Preacher curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Preacher curl bench + EZ curl bar + Barbell plates OR Preacher curl bench + Dumbbells","equipmentOptions":[["Preacher curl bench","EZ curl bar","Barbell plates"],["Preacher curl bench","Dumbbells"]],"optionalEquipment":[],"primaryFor":"Elbow flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX103","name":"Band curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Resistance bands / tubes","equipmentOptions":[["Resistance bands / tubes"]],"optionalEquipment":[],"primaryFor":"Elbow flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX104","name":"EZ-bar skull crusher","muscle":"Triceps","pattern":"Elbow extension","equipment":"EZ curl bar + Barbell plates + Bench","equipmentOptions":[["EZ curl bar","Barbell plates","Bench"]],"optionalEquipment":[],"primaryFor":"Elbow extension","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX105","name":"Band triceps pushdown","muscle":"Triceps","pattern":"Elbow extension","equipment":"Resistance bands / tubes + High band anchor","equipmentOptions":[["Resistance bands / tubes","High band anchor"]],"optionalEquipment":[],"primaryFor":"Elbow extension","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX106","name":"Close-grip push-up","muscle":"Triceps / Chest","pattern":"Horizontal press","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":["Resistance bands / tubes","Weighted vest"],"primaryFor":"Horizontal press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX107","name":"Stability-ball crunch","muscle":"Abs","pattern":"Spinal flexion","equipment":"Stability ball","equipmentOptions":[["Stability ball"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX108","name":"Reverse crunch","muscle":"Abs","pattern":"Spinal flexion","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX109","name":"Side plank","muscle":"Obliques / Core","pattern":"Anti-lateral flexion","equipment":"Bodyweight / floor space","equipmentOptions":[["Bodyweight / floor space"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX110","name":"Farmer carry","muscle":"Grip / Traps / Core","pattern":"Loaded carry","equipment":"Dumbbells OR Kettlebells","equipmentOptions":[["Dumbbells"],["Kettlebells"]],"optionalEquipment":[],"primaryFor":"Loaded carry","difficulty":"Substitution","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX111","name":"Suitcase carry","muscle":"Core / Grip","pattern":"Loaded carry","equipment":"Dumbbells OR Kettlebells","equipmentOptions":[["Dumbbells"],["Kettlebells"]],"optionalEquipment":[],"primaryFor":"Loaded carry","difficulty":"Substitution","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX112","name":"Trap-bar carry","muscle":"Grip / Traps / Core","pattern":"Loaded carry","equipment":"Trap / hex bar + Barbell plates","equipmentOptions":[["Trap / hex bar","Barbell plates"]],"optionalEquipment":[],"primaryFor":"Loaded carry","difficulty":"Substitution","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX113","name":"Rowing machine","muscle":"Cardio / Recovery","pattern":"Aerobic","equipment":"Rowing machine","equipmentOptions":[["Rowing machine"]],"optionalEquipment":[],"primaryFor":"Cardio","difficulty":"Conditioning","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX114","name":"Elliptical","muscle":"Cardio / Recovery","pattern":"Aerobic","equipment":"Elliptical / cross trainer","equipmentOptions":[["Elliptical / cross trainer"]],"optionalEquipment":[],"primaryFor":"Cardio","difficulty":"Conditioning","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX115","name":"Jump rope","muscle":"Cardio / Calves","pattern":"Conditioning","equipment":"Jump rope","equipmentOptions":[["Jump rope"]],"optionalEquipment":[],"primaryFor":"Conditioning","difficulty":"Conditioning","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX116","name":"Sled push","muscle":"Quads / Conditioning","pattern":"Conditioning","equipment":"Weight sled / prowler","equipmentOptions":[["Weight sled / prowler"]],"optionalEquipment":[],"primaryFor":"Conditioning","difficulty":"Conditioning","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX117","name":"Medicine-ball slam","muscle":"Full body / Conditioning","pattern":"Conditioning","equipment":"Medicine ball","equipmentOptions":[["Medicine ball"]],"optionalEquipment":[],"primaryFor":"Conditioning","difficulty":"Conditioning","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX118","name":"Sandbag carry","muscle":"Full body / Grip","pattern":"Loaded carry","equipment":"Sandbag","equipmentOptions":[["Sandbag"]],"optionalEquipment":[],"primaryFor":"Loaded carry","difficulty":"Conditioning","notes":"","rflOk":"Maybe","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX119","name":"Kettlebell goblet squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Kettlebells","equipmentOptions":[["Kettlebells"]],"optionalEquipment":[],"primaryFor":"Squat","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX120","name":"Slant-board squat","muscle":"Quads","pattern":"Squat","equipment":"Slant board / heel wedge","equipmentOptions":[["Slant board / heel wedge"]],"optionalEquipment":["Dumbbells","Kettlebells","Weighted vest"],"primaryFor":"Squat","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX121","name":"Smith-machine hip thrust","muscle":"Glutes / Hamstrings","pattern":"Hip extension","equipment":"Smith machine + Bench","equipmentOptions":[["Smith machine","Bench"]],"optionalEquipment":[],"primaryFor":"Hip extension","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX122","name":"Swiss-bar bench press","muscle":"Chest / Triceps","pattern":"Horizontal press","equipment":"Power rack / squat stands + Swiss / football bar + Barbell plates + Bench","equipmentOptions":[["Power rack / squat stands","Swiss / football bar","Barbell plates","Bench"]],"optionalEquipment":[],"primaryFor":"Horizontal press","difficulty":"Main lift","notes":"Neutral grips may be shoulder friendly.","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX123","name":"Band Pallof press","muscle":"Core","pattern":"Anti-rotation","equipment":"Resistance bands / tubes + Secure band anchor","equipmentOptions":[["Resistance bands / tubes","Secure band anchor"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX124","name":"Dead bug or Pallof press","muscle":"Core","pattern":"Anti-extension / anti-rotation","equipment":"Bodyweight / floor space OR Cable station OR Resistance bands / tubes + Secure band anchor","equipmentOptions":[["Bodyweight / floor space"],["Cable station"],["Resistance bands / tubes","Secure band anchor"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX125","name":"Cable lat pulldown or ring chin-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Cable station OR Lat pulldown / low row machine OR Gymnastic rings / suspension trainer","equipmentOptions":[["Cable station"],["Lat pulldown / low row machine"],["Gymnastic rings / suspension trainer"]],"optionalEquipment":[],"primaryFor":"Vertical pull","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX126","name":"Incline dumbbell or cable curl","muscle":"Biceps","pattern":"Elbow flexion","equipment":"Dumbbells + Adjustable bench OR Cable station","equipmentOptions":[["Dumbbells","Adjustable bench"],["Cable station"]],"optionalEquipment":[],"primaryFor":"Elbow flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX127","name":"Front squat or heels-elevated squat","muscle":"Quads / Glutes","pattern":"Squat","equipment":"Power rack / squat stands + Barbell + plates OR Dumbbells","equipmentOptions":[["Power rack / squat stands","Barbell + plates"],["Dumbbells"]],"optionalEquipment":["Slant board / heel wedge"],"primaryFor":"Squat","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX128","name":"Ab wheel or cable crunch","muscle":"Abs / Core","pattern":"Core","equipment":"Ab wheel OR Cable station","equipmentOptions":[["Ab wheel"],["Cable station"]],"optionalEquipment":[],"primaryFor":"Core","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX129","name":"Weighted chin-up or heavy pulldown","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Pull-up bar + Dip belt / loading belt OR Cable station OR Lat pulldown / low row machine","equipmentOptions":[["Pull-up bar","Dip belt / loading belt"],["Cable station"],["Lat pulldown / low row machine"]],"optionalEquipment":[],"primaryFor":"Vertical pull","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX130","name":"Close-grip bench press or weighted ring push-up","muscle":"Triceps / Chest","pattern":"Horizontal press","equipment":"Power rack / squat stands + Barbell + plates + Bench OR Gymnastic rings / suspension trainer","equipmentOptions":[["Power rack / squat stands","Barbell + plates","Bench"],["Gymnastic rings / suspension trainer"]],"optionalEquipment":[],"primaryFor":"Horizontal press","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX131","name":"Cable rear-delt fly or face pull","muscle":"Rear delts / Upper back","pattern":"Rear delt","equipment":"Cable station OR Cable station + Rope cable attachment","equipmentOptions":[["Cable station"],["Cable station","Rope cable attachment"]],"optionalEquipment":[],"primaryFor":"Rear delt","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX132","name":"Romanian deadlift or hip thrust","muscle":"Hamstrings / Glutes","pattern":"Hip hinge / extension","equipment":"Barbell + plates OR Dumbbells OR Kettlebells OR Barbell + plates + Bench OR Smith machine + Bench","equipmentOptions":[["Barbell + plates"],["Dumbbells"],["Kettlebells"],["Barbell + plates","Bench"],["Smith machine","Bench"]],"optionalEquipment":[],"primaryFor":"Hip hinge","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX133","name":"Front squat or Bulgarian split squat","muscle":"Quads / Glutes","pattern":"Squat / single-leg","equipment":"Power rack / squat stands + Barbell + plates OR Bench or box","equipmentOptions":[["Power rack / squat stands","Barbell + plates"],["Bench or box"]],"optionalEquipment":["Dumbbells"],"primaryFor":"Squat","difficulty":"Main lift","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX134","name":"Pulldown or chin-up","muscle":"Lats / Biceps","pattern":"Vertical pull","equipment":"Cable station OR Lat pulldown / low row machine OR Pull-up bar OR Gymnastic rings / suspension trainer","equipmentOptions":[["Cable station"],["Lat pulldown / low row machine"],["Pull-up bar"],["Gymnastic rings / suspension trainer"]],"optionalEquipment":[],"primaryFor":"Vertical pull","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX135","name":"Hip thrust or cable leg curl","muscle":"Glutes / Hamstrings","pattern":"Hip extension / knee flexion","equipment":"Barbell + plates + Bench OR Smith machine + Bench OR Cable station + Ankle strap OR Leg curl machine","equipmentOptions":[["Barbell + plates","Bench"],["Smith machine","Bench"],["Cable station","Ankle strap"],["Leg curl machine"]],"optionalEquipment":[],"primaryFor":"Hip extension","difficulty":"Substitution","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX136","name":"Hammer curl","muscle":"Biceps / Brachialis","pattern":"Elbow flexion","equipment":"Dumbbells OR Cable station OR Resistance bands / tubes","equipmentOptions":[["Dumbbells"],["Cable station"],["Resistance bands / tubes"]],"optionalEquipment":[],"primaryFor":"Elbow flexion","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"EX137","name":"Overhead triceps extension","muscle":"Triceps long head","pattern":"Elbow extension","equipment":"Cable station + Rope cable attachment OR Dumbbells OR EZ curl bar + Barbell plates + Bench OR Resistance bands / tubes + High band anchor","equipmentOptions":[["Cable station","Rope cable attachment"],["Dumbbells"],["EZ curl bar","Barbell plates","Bench"],["Resistance bands / tubes","High band anchor"]],"optionalEquipment":[],"primaryFor":"Elbow extension","difficulty":"Isolation","notes":"","rflOk":"Yes","favourite":false,"updatedAt":"2026-07-19T15:45:00.000Z"}],"alternatives":[{"defaultExercise":"High-bar back squat","alternative":"Front squat","reason":"Back feels taxed","notes":"More upright torso.","id":"ALT001","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"High-bar back squat","alternative":"Heels-elevated squat","reason":"Need more quad bias","notes":"Can use dumbbells or barbell.","id":"ALT002","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"High-bar back squat","alternative":"Box squat","reason":"Need controlled depth","notes":"Use safety pins and a stable box.","id":"ALT003","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"High-bar back squat","alternative":"Goblet squat","reason":"Deload or warm-up","notes":"Lower loading.","id":"ALT004","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Front squat or heels-elevated squat","alternative":"High-bar back squat","reason":"Front rack uncomfortable","notes":"Return to standard squat if back tolerates it.","id":"ALT005","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Front squat or heels-elevated squat","alternative":"Bulgarian split squat","reason":"Back-sensitive day","notes":"Hard leg stimulus with less spinal loading.","id":"ALT006","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Romanian deadlift","alternative":"Barbell hip thrust","reason":"Lower back discomfort","notes":"Default replacement.","id":"ALT007","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Romanian deadlift","alternative":"Cable pull-through","reason":"Lower back discomfort","notes":"Cable hinge pattern.","id":"ALT008","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Romanian deadlift","alternative":"Dumbbell Romanian deadlift","reason":"Technique practice","notes":"Smaller load increments.","id":"ALT009","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Romanian deadlift or hip thrust","alternative":"Barbell hip thrust","reason":"RFL fatigue","notes":"Back-friendly option.","id":"ALT010","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Romanian deadlift or hip thrust","alternative":"Cable pull-through","reason":"Back-sensitive day","notes":"Keep RIR 2-3.","id":"ALT011","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Barbell hip thrust","alternative":"Cable pull-through","reason":"Bench setup unavailable","notes":"Good cable substitute.","id":"ALT012","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Barbell bench press","alternative":"Dumbbell bench press","reason":"Shoulder comfort","notes":"Greater freedom of movement.","id":"ALT013","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Barbell bench press","alternative":"Floor press","reason":"Shoulder range limitation","notes":"Reduced bottom range.","id":"ALT014","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Barbell bench press","alternative":"Weighted ring push-up","reason":"Want shoulder-friendly press","notes":"Progress with load/body angle.","id":"ALT015","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Incline dumbbell press","alternative":"Dumbbell bench press","reason":"Incline setup unavailable","notes":"Flat press substitute.","id":"ALT016","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Incline dumbbell or seated dumbbell press","alternative":"Seated dumbbell overhead press","reason":"Prefer vertical press","notes":"RFL press slot.","id":"ALT017","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Incline dumbbell or seated dumbbell press","alternative":"Incline dumbbell press","reason":"Prefer chest emphasis","notes":"RFL press slot.","id":"ALT018","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Chest-supported dumbbell row","alternative":"Seated cable row","reason":"Bench unavailable","notes":"Stable cable row.","id":"ALT019","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Chest-supported dumbbell row","alternative":"One-arm cable row","reason":"Need unilateral work","notes":"Control torso.","id":"ALT020","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Chest-supported dumbbell row","alternative":"Inverted row","reason":"No dumbbell setup","notes":"Bodyweight row.","id":"ALT021","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"One-arm cable row","alternative":"Seated cable row","reason":"Want bilateral row","notes":"Use cable station.","id":"ALT022","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Weighted chin-up or heavy pulldown","alternative":"Cable lat pulldown","reason":"Chin-ups not ready","notes":"Progress load on cable.","id":"ALT023","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Weighted chin-up or heavy pulldown","alternative":"Weighted chin-up","reason":"Strong chin-ups","notes":"Use clean reps only.","id":"ALT024","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable lat pulldown or ring chin-up","alternative":"Cable lat pulldown","reason":"Need stable load","notes":"Good progression.","id":"ALT025","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable lat pulldown or ring chin-up","alternative":"Ring chin-up","reason":"Want bodyweight progression","notes":"Use assistance as required.","id":"ALT026","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Pulldown or chin-up","alternative":"Cable lat pulldown","reason":"RFL fatigue","notes":"Easy load control.","id":"ALT027","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Pulldown or chin-up","alternative":"Ring chin-up","reason":"Bodyweight option","notes":"Keep 2-3 RIR in RFL.","id":"ALT028","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Seated dumbbell overhead press","alternative":"Incline dumbbell press","reason":"Shoulder irritation","notes":"Use pain-free angle.","id":"ALT029","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Seated dumbbell overhead press","alternative":"Standing overhead press","reason":"Want barbell progression","notes":"Only if lower back feels stable.","id":"ALT030","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable lateral raise","alternative":"Dumbbell lateral raise","reason":"Cable unavailable","notes":"Keep strict and controlled.","id":"ALT031","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable lateral raise","alternative":"Lean-away cable lateral raise","reason":"Need different line of pull","notes":"Stay light.","id":"ALT032","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable rear-delt fly or face pull","alternative":"Cable rear-delt fly","reason":"Rear delt emphasis","notes":"Strict reps.","id":"ALT033","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable rear-delt fly or face pull","alternative":"Face pull","reason":"Shoulder-health emphasis","notes":"Use rope attachment.","id":"ALT034","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Rear-delt cable fly","alternative":"Face pull","reason":"Shoulder-friendly substitute","notes":"Keep elbows high.","id":"ALT035","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Cable triceps pushdown","alternative":"Overhead cable triceps extension","reason":"Need long-head work","notes":"Use pain-free elbow path.","id":"ALT036","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Overhead cable triceps extension","alternative":"Cable triceps pushdown","reason":"Elbow discomfort","notes":"Often more comfortable.","id":"ALT037","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Incline dumbbell or cable curl","alternative":"Cable curl","reason":"Elbow-friendly tension","notes":"Good default.","id":"ALT038","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Incline dumbbell or cable curl","alternative":"Incline dumbbell curl","reason":"Stretch emphasis","notes":"Use controlled range.","id":"ALT039","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Dumbbell hammer curl","alternative":"Cable curl","reason":"Elbow discomfort","notes":"Cable may feel smoother.","id":"ALT040","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Dead bug or Pallof press","alternative":"Dead bug","reason":"No cable needed","notes":"Low fatigue core.","id":"ALT041","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Dead bug or Pallof press","alternative":"Pallof press","reason":"Anti-rotation focus","notes":"Cable setup.","id":"ALT042","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Ab wheel or cable crunch","alternative":"Cable crunch","reason":"Lower back sensitivity","notes":"Easier to control.","id":"ALT043","updatedAt":"2026-07-19T10:00:00.000Z"},{"defaultExercise":"Ab wheel or cable crunch","alternative":"Dead bug","reason":"Fatigued RFL day","notes":"Lowest-risk option.","id":"ALT044","updatedAt":"2026-07-19T10:00:00.000Z"},{"id":"ALT045","defaultExercise":"High-bar back squat","alternative":"Safety-bar squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT046","defaultExercise":"High-bar back squat","alternative":"Smith-machine squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT047","defaultExercise":"High-bar back squat","alternative":"Landmine squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT048","defaultExercise":"High-bar back squat","alternative":"Leg press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT049","defaultExercise":"High-bar back squat","alternative":"Hack squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT050","defaultExercise":"High-bar back squat","alternative":"Kettlebell goblet squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT051","defaultExercise":"High-bar back squat","alternative":"Bodyweight split squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT052","defaultExercise":"Front squat or heels-elevated squat","alternative":"Front squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT053","defaultExercise":"Front squat or heels-elevated squat","alternative":"Goblet squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT054","defaultExercise":"Front squat or heels-elevated squat","alternative":"Landmine squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT055","defaultExercise":"Front squat or heels-elevated squat","alternative":"Leg press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT056","defaultExercise":"Front squat or heels-elevated squat","alternative":"Hack squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT057","defaultExercise":"Front squat or heels-elevated squat","alternative":"Smith-machine squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT058","defaultExercise":"Front squat or heels-elevated squat","alternative":"Slant-board squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT059","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Front squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT060","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Bulgarian split squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT061","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Goblet squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT062","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Leg press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT063","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Hack squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT064","defaultExercise":"Front squat or Bulgarian split squat","alternative":"Bodyweight split squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT065","defaultExercise":"Romanian deadlift","alternative":"Kettlebell Romanian deadlift","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT066","defaultExercise":"Romanian deadlift","alternative":"Trap-bar deadlift","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT067","defaultExercise":"Romanian deadlift","alternative":"Stability-ball leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT068","defaultExercise":"Romanian deadlift or hip thrust","alternative":"Romanian deadlift","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT069","defaultExercise":"Romanian deadlift or hip thrust","alternative":"Dumbbell Romanian deadlift","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT070","defaultExercise":"Romanian deadlift or hip thrust","alternative":"Dumbbell hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT071","defaultExercise":"Romanian deadlift or hip thrust","alternative":"Smith-machine hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT072","defaultExercise":"Romanian deadlift or hip thrust","alternative":"Glute bridge","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT073","defaultExercise":"Barbell hip thrust","alternative":"Dumbbell hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT074","defaultExercise":"Barbell hip thrust","alternative":"Smith-machine hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT075","defaultExercise":"Barbell hip thrust","alternative":"Glute bridge","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT076","defaultExercise":"Hip thrust or cable leg curl","alternative":"Barbell hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT077","defaultExercise":"Hip thrust or cable leg curl","alternative":"Dumbbell hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT078","defaultExercise":"Hip thrust or cable leg curl","alternative":"Smith-machine hip thrust","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT079","defaultExercise":"Hip thrust or cable leg curl","alternative":"Cable leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT080","defaultExercise":"Hip thrust or cable leg curl","alternative":"Seated leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT081","defaultExercise":"Hip thrust or cable leg curl","alternative":"Lying leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT082","defaultExercise":"Hip thrust or cable leg curl","alternative":"Banded leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT083","defaultExercise":"Hip thrust or cable leg curl","alternative":"Stability-ball leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT084","defaultExercise":"Bulgarian split squat","alternative":"Reverse lunge","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT085","defaultExercise":"Bulgarian split squat","alternative":"Step-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT086","defaultExercise":"Bulgarian split squat","alternative":"Walking lunge","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT087","defaultExercise":"Bulgarian split squat","alternative":"Bodyweight split squat","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT088","defaultExercise":"Bulgarian split squat","alternative":"Leg press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT089","defaultExercise":"Cable leg curl","alternative":"Seated leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT090","defaultExercise":"Cable leg curl","alternative":"Lying leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT091","defaultExercise":"Cable leg curl","alternative":"Banded leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT092","defaultExercise":"Cable leg curl","alternative":"Stability-ball leg curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT093","defaultExercise":"Cable leg curl","alternative":"Nordic hamstring curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT094","defaultExercise":"Standing calf raise","alternative":"Single-leg calf raise","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT095","defaultExercise":"Standing calf raise","alternative":"Seated calf raise","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT096","defaultExercise":"Barbell bench press","alternative":"Push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT097","defaultExercise":"Barbell bench press","alternative":"Smith-machine bench press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT098","defaultExercise":"Barbell bench press","alternative":"Chest press machine","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT099","defaultExercise":"Barbell bench press","alternative":"Swiss-bar bench press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT100","defaultExercise":"Incline dumbbell press","alternative":"Feet-elevated push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT101","defaultExercise":"Incline dumbbell press","alternative":"Landmine press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT102","defaultExercise":"Incline dumbbell press","alternative":"Chest press machine","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT103","defaultExercise":"Cable lat pulldown or ring chin-up","alternative":"Pull-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT104","defaultExercise":"Cable lat pulldown or ring chin-up","alternative":"Band-assisted pull-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT105","defaultExercise":"Cable lat pulldown or ring chin-up","alternative":"Band lat pulldown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT106","defaultExercise":"Pulldown or chin-up","alternative":"Pull-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT107","defaultExercise":"Pulldown or chin-up","alternative":"Band-assisted pull-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT108","defaultExercise":"Pulldown or chin-up","alternative":"Band lat pulldown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT109","defaultExercise":"Weighted chin-up or heavy pulldown","alternative":"Pull-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT110","defaultExercise":"Weighted chin-up or heavy pulldown","alternative":"Ring chin-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT111","defaultExercise":"Weighted chin-up or heavy pulldown","alternative":"Band lat pulldown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT112","defaultExercise":"Chest-supported dumbbell row","alternative":"One-arm dumbbell row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT113","defaultExercise":"Chest-supported dumbbell row","alternative":"Band row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT114","defaultExercise":"Chest-supported dumbbell row","alternative":"Landmine T-bar row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT115","defaultExercise":"One-arm cable row","alternative":"One-arm dumbbell row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT116","defaultExercise":"One-arm cable row","alternative":"Band row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT117","defaultExercise":"One-arm cable row","alternative":"Landmine T-bar row","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT118","defaultExercise":"Seated dumbbell overhead press","alternative":"Arnold press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT119","defaultExercise":"Seated dumbbell overhead press","alternative":"Landmine press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT120","defaultExercise":"Seated dumbbell overhead press","alternative":"Pike push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT121","defaultExercise":"Close-grip bench press or weighted ring push-up","alternative":"Close-grip bench press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT122","defaultExercise":"Close-grip bench press or weighted ring push-up","alternative":"Weighted ring push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT123","defaultExercise":"Close-grip bench press or weighted ring push-up","alternative":"Parallel-bar dip","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT124","defaultExercise":"Close-grip bench press or weighted ring push-up","alternative":"Close-grip push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT125","defaultExercise":"Close-grip bench press or weighted ring push-up","alternative":"Band-assisted dip","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT126","defaultExercise":"Cable lateral raise","alternative":"Band lateral raise","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT127","defaultExercise":"Cable rear-delt fly or face pull","alternative":"Dumbbell rear-delt fly","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT128","defaultExercise":"Cable rear-delt fly or face pull","alternative":"Reverse pec deck","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT129","defaultExercise":"Cable rear-delt fly or face pull","alternative":"Band face pull","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT130","defaultExercise":"Rear-delt cable fly","alternative":"Dumbbell rear-delt fly","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT131","defaultExercise":"Rear-delt cable fly","alternative":"Reverse pec deck","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT132","defaultExercise":"Rear-delt cable fly","alternative":"Band face pull","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT133","defaultExercise":"Cable triceps pushdown","alternative":"Band triceps pushdown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT134","defaultExercise":"Cable triceps pushdown","alternative":"Dumbbell skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT135","defaultExercise":"Cable triceps pushdown","alternative":"EZ-bar skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT136","defaultExercise":"Cable triceps pushdown","alternative":"Close-grip push-up","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT137","defaultExercise":"Overhead cable triceps extension","alternative":"Dumbbell skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT138","defaultExercise":"Overhead cable triceps extension","alternative":"EZ-bar skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT139","defaultExercise":"Overhead cable triceps extension","alternative":"Band triceps pushdown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT140","defaultExercise":"Overhead triceps extension","alternative":"Overhead cable triceps extension","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT141","defaultExercise":"Overhead triceps extension","alternative":"Dumbbell skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT142","defaultExercise":"Overhead triceps extension","alternative":"EZ-bar skull crusher","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT143","defaultExercise":"Overhead triceps extension","alternative":"Band triceps pushdown","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT144","defaultExercise":"Incline dumbbell or cable curl","alternative":"EZ-bar curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT145","defaultExercise":"Incline dumbbell or cable curl","alternative":"Band curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT146","defaultExercise":"Incline dumbbell or cable curl","alternative":"Preacher curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT147","defaultExercise":"Cable curl","alternative":"Incline dumbbell curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT148","defaultExercise":"Cable curl","alternative":"Dumbbell hammer curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT149","defaultExercise":"Cable curl","alternative":"EZ-bar curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT150","defaultExercise":"Cable curl","alternative":"Band curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT151","defaultExercise":"Cable curl","alternative":"Preacher curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT152","defaultExercise":"Dumbbell hammer curl","alternative":"EZ-bar curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT153","defaultExercise":"Dumbbell hammer curl","alternative":"Band curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT154","defaultExercise":"Hammer curl","alternative":"Dumbbell hammer curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT155","defaultExercise":"Hammer curl","alternative":"Cable curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT156","defaultExercise":"Hammer curl","alternative":"Band curl","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT157","defaultExercise":"Dead bug or Pallof press","alternative":"Band Pallof press","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT158","defaultExercise":"Dead bug or Pallof press","alternative":"Side plank","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT159","defaultExercise":"Ab wheel or cable crunch","alternative":"Ab wheel","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT160","defaultExercise":"Ab wheel or cable crunch","alternative":"Reverse crunch","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"},{"id":"ALT161","defaultExercise":"Ab wheel or cable crunch","alternative":"Stability-ball crunch","reason":"Equipment match","notes":"Equipment-compatible option.","updatedAt":"2026-07-19T15:45:00.000Z"}],"ingredientCache":[{"id":"ING001","name":"Chicken breast","servingDescription":"100 g cooked","kcal":165,"protein":31,"carbs":0,"fat":3.6,"notes":"Example only; replace with your package/cooked-weight values.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"cooked","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING002","name":"0% Greek yoghurt","servingDescription":"100 g","kcal":59,"protein":10.3,"carbs":3.6,"fat":0.4,"notes":"Example only; brands vary.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING003","name":"Whey protein","servingDescription":"30 g scoop","kcal":120,"protein":24,"carbs":3,"fat":2,"notes":"Use the exact label values.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":30.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{"scoop":30.0},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING004","name":"Egg whites","servingDescription":"100 g","kcal":52,"protein":10.9,"carbs":0.7,"fat":0.2,"notes":"Example only.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING005","name":"Cooked white rice","servingDescription":"100 g","kcal":130,"protein":2.4,"carbs":28.2,"fat":0.3,"notes":"Cooked weight; example only.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING006","name":"Boiled potato","servingDescription":"100 g","kcal":87,"protein":1.9,"carbs":20.1,"fat":0.1,"notes":"Example only.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING007","name":"Tuna in water, drained","servingDescription":"100 g","kcal":116,"protein":25.5,"carbs":0,"fat":0.8,"notes":"Check the can label.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING008","name":"Low-fat cottage cheese","servingDescription":"100 g","kcal":82,"protein":11.1,"carbs":3.4,"fat":2.3,"notes":"Brands vary.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING009","name":"Lean turkey mince","servingDescription":"100 g","kcal":145,"protein":21,"carbs":0,"fat":6,"notes":"Use your package values.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING010","name":"Courgette","servingDescription":"100 g","kcal":17,"protein":1.2,"carbs":3.1,"fat":0.3,"notes":"Example only.","updatedAt":"2026-07-19T10:00:00.000Z","brand":"","foodState":"","baseAmount":100.0,"baseUnit":"g","densityGPerMl":"","fibre":0,"sodiumMg":0,"aliases":[],"commonMeasures":{},"source":"Example cache – verify","sourceId":"","sourceUrl":"","confirmed":false},{"id":"ING011","name":"Chicken breast, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":120,"protein":22.5,"carbs":0,"fat":2.6,"fibre":0,"sodiumMg":45,"aliases":["raw chicken breast","chicken fillet"],"commonMeasures":{},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING012","name":"Olive oil","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":884,"protein":0,"carbs":0,"fat":100,"fibre":0,"sodiumMg":0,"aliases":["extra virgin olive oil","evoo"],"commonMeasures":{"tbsp":13.5,"tsp":4.5},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING013","name":"Onion, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":40,"protein":1.1,"carbs":9.3,"fat":0.1,"fibre":1.7,"sodiumMg":4,"aliases":["onion","yellow onion","white onion","red onion"],"commonMeasures":{"each":150,"medium":150,"small":90,"large":220},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING014","name":"Garlic, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":149,"protein":6.4,"carbs":33.1,"fat":0.5,"fibre":2.1,"sodiumMg":17,"aliases":["garlic","garlic clove"],"commonMeasures":{"clove":3,"tsp":2.8},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING015","name":"Chopped tomatoes, canned","brand":"","foodState":"canned","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":24,"protein":1.2,"carbs":4.0,"fat":0.2,"fibre":1.2,"sodiumMg":120,"aliases":["canned tomatoes","tinned tomatoes","chopped tomato"],"commonMeasures":{"can":400},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING016","name":"Tomato passata","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":29,"protein":1.4,"carbs":4.8,"fat":0.2,"fibre":1.5,"sodiumMg":210,"aliases":["passata","tomato puree sauce"],"commonMeasures":{"cup":245,"tbsp":15},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING017","name":"Spinach, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":23,"protein":2.9,"carbs":3.6,"fat":0.4,"fibre":2.2,"sodiumMg":79,"aliases":["spinach","baby spinach"],"commonMeasures":{"cup":30},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING018","name":"Broccoli, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":34,"protein":2.8,"carbs":6.6,"fat":0.4,"fibre":2.6,"sodiumMg":33,"aliases":["broccoli","broccoli florets"],"commonMeasures":{"cup":91},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING019","name":"Carrot, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":41,"protein":0.9,"carbs":9.6,"fat":0.2,"fibre":2.8,"sodiumMg":69,"aliases":["carrot","carrots"],"commonMeasures":{"each":61,"medium":61,"cup":128},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING020","name":"Mushrooms, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":22,"protein":3.1,"carbs":3.3,"fat":0.3,"fibre":1.0,"sodiumMg":5,"aliases":["mushroom","mushrooms","button mushrooms"],"commonMeasures":{"cup":70},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING021","name":"Rolled oats, dry","brand":"","foodState":"dry","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":379,"protein":13.2,"carbs":67.7,"fat":6.5,"fibre":10.1,"sodiumMg":6,"aliases":["oats","rolled oats","porridge oats"],"commonMeasures":{"cup":80,"tbsp":5},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING022","name":"Basmati rice, dry","brand":"","foodState":"dry","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":356,"protein":8.9,"carbs":78.6,"fat":0.9,"fibre":1.0,"sodiumMg":5,"aliases":["basmati rice","white rice dry","uncooked rice"],"commonMeasures":{"cup":185},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING023","name":"Pasta, dry","brand":"","foodState":"dry","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":371,"protein":13.0,"carbs":74.7,"fat":1.5,"fibre":3.2,"sodiumMg":6,"aliases":["dry pasta","uncooked pasta","spaghetti dry"],"commonMeasures":{"cup":100},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING024","name":"Pasta, cooked","brand":"","foodState":"cooked","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":158,"protein":5.8,"carbs":30.9,"fat":0.9,"fibre":1.8,"sodiumMg":1,"aliases":["cooked pasta","boiled pasta"],"commonMeasures":{"cup":140},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING025","name":"Lean beef mince, 5% fat","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":137,"protein":21.4,"carbs":0,"fat":5.0,"fibre":0,"sodiumMg":66,"aliases":["lean beef mince","ground beef 5%","minced beef"],"commonMeasures":{},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING026","name":"Salmon fillet, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":208,"protein":20.0,"carbs":0,"fat":13.0,"fibre":0,"sodiumMg":59,"aliases":["salmon","salmon fillet"],"commonMeasures":{},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING027","name":"Whole egg, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":143,"protein":12.6,"carbs":0.7,"fat":9.5,"fibre":0,"sodiumMg":142,"aliases":["egg","eggs","whole egg"],"commonMeasures":{"each":50,"large":50,"medium":44},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING028","name":"Skimmed milk","brand":"","foodState":"","servingDescription":"100 ml","baseAmount":100,"baseUnit":"ml","densityGPerMl":1,"kcal":34,"protein":3.4,"carbs":5.0,"fat":0.1,"fibre":0,"sodiumMg":44,"aliases":["skim milk","skimmed milk","fat free milk"],"commonMeasures":{"cup":244,"tbsp":15},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING029","name":"Cheddar cheese","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":403,"protein":25.0,"carbs":1.3,"fat":33.0,"fibre":0,"sodiumMg":621,"aliases":["cheddar","cheese"],"commonMeasures":{"cup":113,"slice":28},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING030","name":"Lentils, cooked","brand":"","foodState":"cooked","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":116,"protein":9.0,"carbs":20.1,"fat":0.4,"fibre":7.9,"sodiumMg":2,"aliases":["lentils","cooked lentils"],"commonMeasures":{"cup":198},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING031","name":"Chickpeas, drained","brand":"","foodState":"drained","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":139,"protein":7.2,"carbs":19.1,"fat":2.9,"fibre":5.1,"sodiumMg":240,"aliases":["chickpeas","garbanzo beans"],"commonMeasures":{"cup":164,"can":240},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING032","name":"Kidney beans, drained","brand":"","foodState":"drained","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":110,"protein":7.7,"carbs":14.5,"fat":0.6,"fibre":6.4,"sodiumMg":240,"aliases":["kidney beans","red kidney beans"],"commonMeasures":{"cup":177,"can":240},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING033","name":"Banana, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":89,"protein":1.1,"carbs":22.8,"fat":0.3,"fibre":2.6,"sodiumMg":1,"aliases":["banana"],"commonMeasures":{"each":118,"medium":118,"small":101,"large":136},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING034","name":"Apple, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":52,"protein":0.3,"carbs":13.8,"fat":0.2,"fibre":2.4,"sodiumMg":1,"aliases":["apple"],"commonMeasures":{"each":182,"medium":182,"small":149,"large":223},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING035","name":"Blueberries, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":57,"protein":0.7,"carbs":14.5,"fat":0.3,"fibre":2.4,"sodiumMg":1,"aliases":["blueberries","blueberry"],"commonMeasures":{"cup":148},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING036","name":"Honey","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":304,"protein":0.3,"carbs":82.4,"fat":0,"fibre":0.2,"sodiumMg":4,"aliases":["honey"],"commonMeasures":{"tbsp":21,"tsp":7},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING037","name":"Plain wheat flour","brand":"","foodState":"dry","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":364,"protein":10.3,"carbs":76.3,"fat":1.0,"fibre":2.7,"sodiumMg":2,"aliases":["flour","plain flour","all purpose flour"],"commonMeasures":{"cup":125,"tbsp":8},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING038","name":"Butter","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":717,"protein":0.9,"carbs":0.1,"fat":81.1,"fibre":0,"sodiumMg":11,"aliases":["butter","unsalted butter","salted butter"],"commonMeasures":{"tbsp":14,"tsp":4.7},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING039","name":"Granulated sugar","brand":"","foodState":"dry","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":387,"protein":0,"carbs":100,"fat":0,"fibre":0,"sodiumMg":1,"aliases":["sugar","white sugar","caster sugar"],"commonMeasures":{"cup":200,"tbsp":12.5,"tsp":4.2},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING040","name":"Soy sauce","brand":"","foodState":"","servingDescription":"100 ml","baseAmount":100,"baseUnit":"ml","densityGPerMl":1,"kcal":53,"protein":8.1,"carbs":4.9,"fat":0.6,"fibre":0.8,"sodiumMg":5493,"aliases":["soy sauce","light soy sauce"],"commonMeasures":{"tbsp":15,"tsp":5},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING041","name":"Lemon juice","brand":"","foodState":"","servingDescription":"100 ml","baseAmount":100,"baseUnit":"ml","densityGPerMl":1,"kcal":22,"protein":0.4,"carbs":6.9,"fat":0.2,"fibre":0.3,"sodiumMg":1,"aliases":["lemon juice","juice of lemon"],"commonMeasures":{"tbsp":15,"tsp":5,"lemon":48},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING042","name":"Coconut milk, canned","brand":"","foodState":"canned","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":197,"protein":2.0,"carbs":2.8,"fat":21.3,"fibre":0,"sodiumMg":15,"aliases":["coconut milk","full fat coconut milk"],"commonMeasures":{"cup":240,"can":400},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING043","name":"White bread","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":250,"protein":9.0,"carbs":49.0,"fat":3.2,"fibre":2.7,"sodiumMg":491,"aliases":["bread","white bread"],"commonMeasures":{"slice":36},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING044","name":"Sweet potato, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":86,"protein":1.6,"carbs":20.1,"fat":0.1,"fibre":3.0,"sodiumMg":55,"aliases":["sweet potato","sweet potatoes"],"commonMeasures":{"each":130,"medium":130},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING045","name":"Avocado, raw","brand":"","foodState":"raw","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":160,"protein":2.0,"carbs":8.5,"fat":14.7,"fibre":6.7,"sodiumMg":7,"aliases":["avocado"],"commonMeasures":{"each":136,"half":68},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING046","name":"Low-fat mayonnaise","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":270,"protein":1.0,"carbs":12.0,"fat":24.0,"fibre":0,"sodiumMg":700,"aliases":["light mayonnaise","low fat mayo","mayonnaise"],"commonMeasures":{"tbsp":15,"tsp":5},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING047","name":"Peanut butter","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":588,"protein":25.0,"carbs":20.0,"fat":50.0,"fibre":6.0,"sodiumMg":426,"aliases":["peanut butter"],"commonMeasures":{"tbsp":16,"tsp":5.3},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING048","name":"Plain low-fat yoghurt","brand":"","foodState":"","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":63,"protein":5.3,"carbs":7.0,"fat":1.6,"fibre":0,"sodiumMg":70,"aliases":["plain yoghurt","low fat yogurt","natural yoghurt"],"commonMeasures":{"cup":245,"tbsp":15},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING049","name":"Quinoa, cooked","brand":"","foodState":"cooked","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":120,"protein":4.4,"carbs":21.3,"fat":1.9,"fibre":2.8,"sodiumMg":7,"aliases":["quinoa","cooked quinoa"],"commonMeasures":{"cup":185},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"},{"id":"ING050","name":"Frozen mixed vegetables","brand":"","foodState":"frozen","servingDescription":"100 g","baseAmount":100,"baseUnit":"g","densityGPerMl":"","kcal":65,"protein":3.0,"carbs":11.0,"fat":0.6,"fibre":4.0,"sodiumMg":60,"aliases":["mixed vegetables","frozen vegetables"],"commonMeasures":{"cup":150},"source":"Generic reference – verify","sourceId":"","sourceUrl":"","confirmed":false,"notes":"Starting reference value. Confirm against a package label or reference record before relying on it.","updatedAt":"2026-07-19T20:55:00.000Z"}],"recipes":[{"id":"RCP001","name":"Chicken courgette rice bowl","category":"Normal cut","servings":2,"totalKcal":780,"protein":92,"carbs":72,"fat":14,"rflFriendly":"No","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Example values only. No bell peppers; adjust to your ingredients.","favourite":false,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"2 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false},{"id":"RCP002","name":"Greek yoghurt whey bowl","category":"High protein","servings":1,"totalKcal":410,"protein":55,"carbs":32,"fat":6,"rflFriendly":"Yes","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Good quick protein option; use exact label values.","favourite":true,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"1 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false},{"id":"RCP003","name":"Egg-white spinach omelette","category":"RFL-friendly","servings":1,"totalKcal":260,"protein":42,"carbs":8,"fat":6,"rflFriendly":"Yes","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Use herbs, spinach, mushrooms; avoid bell peppers.","favourite":true,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"1 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false},{"id":"RCP004","name":"Lean turkey tomato mince","category":"Batch cook","servings":4,"totalKcal":1280,"protein":156,"carbs":64,"fat":36,"rflFriendly":"Maybe","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Serve with rice/potatoes outside RFL or vegetables during RFL.","favourite":false,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"4 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false},{"id":"RCP005","name":"Tuna potato salad","category":"Normal cut","servings":2,"totalKcal":650,"protein":62,"carbs":82,"fat":8,"rflFriendly":"No","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Tuna is not shellfish; avoid mayo-heavy versions.","favourite":false,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"2 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false},{"id":"RCP006","name":"Cottage cheese chicken salad","category":"RFL-friendly","servings":1,"totalKcal":360,"protein":60,"carbs":14,"fat":7,"rflFriendly":"Yes","noBellPeppers":"Yes","noShellfish":"Yes","notes":"Use cucumber, lettuce, tomato; no bell peppers.","favourite":true,"instructions":"","ingredients":[],"updatedAt":"2026-07-19T10:00:00.000Z","sourceType":"Seed","sourceName":"Lift & Cut starter recipe","sourceUrl":"","sourceAuthor":"","sourceBook":"","importedAt":"","prepTime":"","cookTime":"","totalTime":"","yieldText":"1 servings","finishedWeightG":"","fibre":0,"sodiumMg":0,"nutritionConfidence":"Manual","importStatus":"Ready","tags":[],"imageUrl":"","sourceNutrition":{},"calculateFromIngredients":false}],"workoutSessions":[],"workoutLogs":[],"foodLog":[],"bodyMetrics":[],"dailyCheckins":[],"dietPhases":[],"cardioLogs":[],"progressPhotos":[]};


const EQUIPMENT_CATALOG = [{"category":"Essentials","items":[{"name":"Bodyweight / floor space","description":"Floor space for bodyweight exercises and mobility."},{"name":"Power rack / squat stands","description":"Supports barbell squats, bench presses and rack work."},{"name":"Barbell + plates","description":"Standard or Olympic barbell with loadable plates."},{"name":"Flat bench","description":"Fixed flat bench."},{"name":"Adjustable bench","description":"Bench that can be used flat or inclined."},{"name":"Adjustable dumbbells","description":"Load-adjustable dumbbell pair."},{"name":"Fixed dumbbells","description":"Fixed-weight dumbbell set."},{"name":"Kettlebells","description":"One or more kettlebells."},{"name":"Resistance bands / tubes","description":"Loop bands or handled resistance tubes."}]},{"category":"Pulling and cable","items":[{"name":"Cable station / functional trainer","description":"High and/or low adjustable cable pulley."},{"name":"Lat pulldown / low row machine","description":"Dedicated pulldown and seated-row station."},{"name":"Pull-up bar","description":"Doorway, wall or rack-mounted pull-up bar."},{"name":"Gymnastic rings / suspension trainer","description":"Rings or suspension straps with a secure anchor."},{"name":"Dip station / parallel bars","description":"Parallel bars suitable for dips and support holds."},{"name":"Landmine attachment","description":"Pivot attachment for one end of a barbell."},{"name":"Ankle strap","description":"Cable or band ankle cuff."},{"name":"Rope cable attachment","description":"Rope handle for face pulls and arm work."},{"name":"Dip belt / loading belt","description":"Belt for weighted pull-ups and dips."}]},{"category":"Specialty bars and machines","items":[{"name":"Smith machine","description":"Guided barbell machine."},{"name":"Trap / hex bar","description":"Trap or hexagonal deadlift bar."},{"name":"Safety squat bar","description":"Safety squat specialty bar."},{"name":"EZ curl bar","description":"Cambered curl bar with plates."},{"name":"Swiss / football bar","description":"Neutral-grip multi-grip bar."},{"name":"Chest press / pec deck machine","description":"Selectorized chest press, pec deck or reverse pec deck."},{"name":"Leg press / hack squat","description":"Leg press or hack-squat machine."},{"name":"Leg extension machine","description":"Dedicated knee-extension machine."},{"name":"Leg curl machine","description":"Seated or lying knee-flexion machine."},{"name":"Preacher curl bench","description":"Preacher pad or curl bench."}]},{"category":"Lower-body and accessories","items":[{"name":"Calf raise platform / machine","description":"Calf block, step or dedicated calf machine."},{"name":"Glute-ham developer / Nordic bench","description":"GHD or secure Nordic-curl station."},{"name":"Plyo box / aerobic step","description":"Stable box, step or platform."},{"name":"Slant board / heel wedge","description":"Wedge for heel-elevated squats or calf work."},{"name":"Ab wheel","description":"Abdominal rollout wheel."},{"name":"Stability ball","description":"Swiss or stability ball."},{"name":"Weighted vest","description":"Loadable vest."},{"name":"Medicine ball","description":"Medicine or slam ball."},{"name":"Sandbag","description":"Loadable training sandbag."}]},{"category":"Cardio and conditioning","items":[{"name":"Treadmill","description":"Motorized or manual treadmill."},{"name":"Exercise bike","description":"Upright, recumbent or spin bike."},{"name":"Rowing machine","description":"Indoor rowing ergometer."},{"name":"Elliptical / cross trainer","description":"Elliptical trainer."},{"name":"Jump rope","description":"Skipping rope."},{"name":"Weight sled / prowler","description":"Push-pull sled with usable floor space."}]}];
const EQUIPMENT_PRESETS = {"minimal":{"label":"Bodyweight + bands","items":["Bodyweight / floor space","Resistance bands / tubes","Pull-up bar"]},"dumbbells":{"label":"Dumbbells + bench","items":["Bodyweight / floor space","Adjustable dumbbells","Adjustable bench","Resistance bands / tubes"]},"barbell":{"label":"Rack + barbell","items":["Bodyweight / floor space","Power rack / squat stands","Barbell + plates","Adjustable bench","Pull-up bar"]},"cable":{"label":"Cable home gym","items":["Bodyweight / floor space","Cable station / functional trainer","Adjustable bench","Ankle strap","Rope cable attachment","Pull-up bar"]},"full":{"label":"Full home gym","items":["Bodyweight / floor space","Power rack / squat stands","Barbell + plates","Adjustable bench","Adjustable dumbbells","Cable station / functional trainer","Pull-up bar","Gymnastic rings / suspension trainer","Calf raise platform / machine","Ankle strap","Rope cable attachment","Ab wheel","Resistance bands / tubes","Dip station / parallel bars","Landmine attachment","Plyo box / aerobic step","Slant board / heel wedge","Exercise bike"]}};
const EQUIPMENT_ALIASES = {
  'Power rack':['Power rack / squat stands'],
  'Barbell':['Barbell + plates'],
  'Dumbbells':['Adjustable dumbbells'],
  'Cable station':['Cable station / functional trainer','Ankle strap','Rope cable attachment'],
  'Chin-up bar / rings':['Pull-up bar','Gymnastic rings / suspension trainer'],
  'Calf setup':['Calf raise platform / machine'],
  'Ab wheel':['Ab wheel'],
  'Exercise bike':['Exercise bike'],
  'Treadmill':['Treadmill'],
  'Adjustable bench':['Adjustable bench']
};
const VIRTUAL_EQUIPMENT = {
  'Dumbbells':['Adjustable dumbbells','Fixed dumbbells'],
  'Bench':['Adjustable bench','Flat bench'],
  'Bench or box':['Adjustable bench','Flat bench','Plyo box / aerobic step'],
  'Cable station':['Cable station / functional trainer'],
  'Barbell plates':['Barbell + plates'],
  'Secure band anchor':['Power rack / squat stands','Pull-up bar','Cable station / functional trainer'],
  'High band anchor':['Power rack / squat stands','Pull-up bar','Cable station / functional trainer']
};

let state;
let page = 'dashboard';
let workoutDraft = null;
let selectedDietDate = localDateISO();
let installPrompt = null;
let toastTimer = null;
let restTimerInterval = null;
let restTimerSeconds = 0;
let restTimerEndAt = 0;
let restTimerLabel = 'Rest timer';
let timerAudioContext = null;
let workoutClockInterval = null;
let recipeDraft = null;
let epubImportCandidates = [];
let epubImportMeta = null;
let foodSearchResults = [];
let recipeImportBusy = false;
let photoDbPromise = null;
let autoSyncTimer = null;

function deepClone(value) { return JSON.parse(JSON.stringify(value)); }
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[ch]));
}
function toNum(value) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}
function numOrBlank(value) {
  if (value === '' || value === null || value === undefined) return '';
  const n = Number(value);
  return Number.isFinite(n) ? n : '';
}
function round(value, decimals = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return n.toFixed(decimals).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
}
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function localDateISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function localDateTimeISO(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 19);
}
function uid(prefix = 'ID') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function nowISO() { return new Date().toISOString(); }
function parseDate(value) {
  if (!value) return null;
  const d = new Date(`${String(value).slice(0,10)}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}
function daysBetween(a, b) {
  const da = parseDate(a), db = parseDate(b);
  if (!da || !db) return 0;
  return Math.round((db - da) / 86400000);
}
function formatDate(value, options = {day:'numeric', month:'short'}) {
  const d = parseDate(value);
  return d ? new Intl.DateTimeFormat(undefined, options).format(d) : '—';
}
function weekdayName(value = localDateISO()) {
  const d = parseDate(value);
  return d ? new Intl.DateTimeFormat(undefined, {weekday:'long'}).format(d) : '';
}
function csvCell(value) {
  const text = String(value ?? '');
  return /[,"\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
function dataURLToBlob(dataURL) {
  const [meta, data] = String(dataURL).split(',');
  const mime = (meta.match(/data:(.*?);/) || [,'application/octet-stream'])[1];
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i=0;i<bytes.length;i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], {type:mime});
}
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}
function isOnline() { return navigator.onLine !== false; }

function mergeDefaults(base, incoming) {
  if (Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
  if (base && typeof base === 'object') {
    const output = {...base};
    if (incoming && typeof incoming === 'object' && !Array.isArray(incoming)) {
      Object.keys(incoming).forEach(key => {
        output[key] = key in base ? mergeDefaults(base[key], incoming[key]) : incoming[key];
      });
    }
    return output;
  }
  return incoming === undefined ? base : incoming;
}

function migrateState(input) {
  let next = mergeDefaults(deepClone(DEFAULT_STATE), input || {});
  if (!next.settings.profileName && next.createdFor) next.settings.profileName = next.createdFor;
  const arrays = ['programs','exercises','alternatives','ingredientCache','recipes','workoutSessions',
    'workoutLogs','foodLog','bodyMetrics','dailyCheckins','dietPhases','cardioLogs','progressPhotos'];
  arrays.forEach(key => { if (!Array.isArray(next[key])) next[key] = []; });
  if (!next.meta.clientId) next.meta.clientId = uid('client');
  next.version = 2;
  next.schemaVersion = 4;
  next.meta.appVersion = APP_VERSION;
  next.settings.customEquipment = Array.isArray(next.settings.customEquipment) ? next.settings.customEquipment : [];
  next.settings.availableEquipment = normalizeEquipmentSelection(next.settings.availableEquipment || []);
  next.settings.equipmentProfileName ||= 'Custom home gym';
  const timestamp = nowISO();

  const seedExerciseMap = new Map(DEFAULT_STATE.exercises.map(item=>[item.id,item]));
  const existingExerciseMap = new Map(next.exercises.map(item=>[item.id,item]));
  DEFAULT_STATE.exercises.forEach(seed=>{
    const existing=existingExerciseMap.get(seed.id);
    if(!existing){ next.exercises.push(deepClone(seed)); return; }
    if(!Array.isArray(existing.equipmentOptions)||!existing.equipmentOptions.length) existing.equipmentOptions=deepClone(seed.equipmentOptions||[]);
    if(!Array.isArray(existing.optionalEquipment)) existing.optionalEquipment=deepClone(seed.optionalEquipment||[]);
    if(!existing.equipment) existing.equipment=seed.equipment;
  });
  const existingAltIds=new Set(next.alternatives.map(item=>item.id));
  const existingAltPairs=new Set(next.alternatives.map(item=>`${item.defaultExercise}|${item.alternative}`));
  DEFAULT_STATE.alternatives.forEach(seed=>{
    if(!existingAltIds.has(seed.id)&&!existingAltPairs.has(`${seed.defaultExercise}|${seed.alternative}`)) next.alternatives.push(deepClone(seed));
  });

  const compositeIds = {
    'Dead bug or Pallof press':'EX124','Cable lat pulldown or ring chin-up':'EX125','Incline dumbbell or cable curl':'EX126',
    'Front squat or heels-elevated squat':'EX127','Ab wheel or cable crunch':'EX128','Weighted chin-up or heavy pulldown':'EX129',
    'Close-grip bench press or weighted ring push-up':'EX130','Cable rear-delt fly or face pull':'EX131','Romanian deadlift or hip thrust':'EX132',
    'Front squat or Bulgarian split squat':'EX133','Pulldown or chin-up':'EX134','Hip thrust or cable leg curl':'EX135',
    'Hammer curl':'EX136','Overhead triceps extension':'EX137'
  };
  next.programs.forEach((p, pi) => {
    p.id ||= uid('program'); p.updatedAt ||= timestamp; p.sessions ||= [];
    p.sessions.forEach((s, si) => {
      s.id ||= uid('session'); s.order ||= si + 1; s.updatedAt ||= p.updatedAt; s.exercises ||= [];
      s.exercises.forEach((x, xi) => {
        x.id ||= uid('slot'); x.order ||= xi + 1; x.exerciseId ||= compositeIds[x.name] || '';
        x.restSec = toNum(x.restSec) || (toNum(x.sets) >= 3 ? 120 : 90); x.updatedAt ||= s.updatedAt;
      });
    });
  });
  ['exercises','alternatives','ingredientCache','recipes','workoutSessions','workoutLogs',
    'foodLog','bodyMetrics','dailyCheckins','dietPhases','cardioLogs','progressPhotos'].forEach(key => {
      next[key].forEach((row, i) => { row.id ||= uid(key.slice(0,4)); row.updatedAt ||= timestamp; });
  });
  next.exercises.forEach(ex=>{
    if(!Array.isArray(ex.equipmentOptions)||!ex.equipmentOptions.length) ex.equipmentOptions=parseLegacyEquipmentOptions(ex.equipment);
    ex.equipmentOptions=ex.equipmentOptions.map(option=>Array.isArray(option)?option.filter(Boolean):[]).filter(option=>option.length);
    if(!ex.equipmentOptions.length) ex.equipmentOptions=[['Bodyweight / floor space']];
    ex.optionalEquipment=Array.isArray(ex.optionalEquipment)?ex.optionalEquipment:[];
    ex.equipment ||= equipmentOptionsText(ex.equipmentOptions);
  });
  next.recipes.forEach(r => { r.ingredients ||= []; });

  next.settings.recipeImportAutoMatch = next.settings.recipeImportAutoMatch !== false;
  next.settings.recipeImportPreferMetric = next.settings.recipeImportPreferMetric !== false;
  next.settings.foodReferenceSource ||= 'USDA + Open Food Facts';
  next.ingredientCache.forEach(item => normaliseIngredientRecord(item));
  next.recipes.forEach(recipe => normaliseRecipeRecord(recipe));
  return next;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return migrateState(raw ? JSON.parse(raw) : deepClone(DEFAULT_STATE));
  } catch (error) {
    console.error('State load failed', error);
    return migrateState(deepClone(DEFAULT_STATE));
  }
}
function markUpdated(record) {
  if (record && typeof record === 'object') record.updatedAt = nowISO();
}
function saveState({touch = true, autoSync = true} = {}) {
  if (touch) {
    state.meta.lastModifiedAt = nowISO();
    state.meta.revision = toNum(state.meta.revision) + 1;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSyncIndicator();
  if (autoSync && state.settings.autoSync && state.settings.syncUrl && state.settings.syncKey) {
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(() => pushCloud(false, true), 5000);
  }
}
function saveDraft() {
  if (workoutDraft) {
    workoutDraft.lastSavedAt = nowISO();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(workoutDraft));
  } else {
    localStorage.removeItem(DRAFT_KEY);
  }
  updateDraftSaveStatus();
}
function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? migrateWorkoutDraft(JSON.parse(raw)) : null;
  } catch (error) {
    console.warn('Workout draft could not be restored', error);
    return null;
  }
}

function applyTheme() {
  const theme = state?.settings?.theme || 'system';
  if (theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', theme);
}
function setTheme(value) {
  state.settings.theme = value;
  saveState();
  applyTheme();
  render();
}
function showToast(message, duration = 2600) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}
function showModal(html) {
  document.getElementById('modal').innerHTML = html;
  document.getElementById('modalBackdrop').classList.add('show');
}
function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('show');
  document.getElementById('modal').innerHTML = '';
}
function backdropClose(event) {
  if (event.target.id === 'modalBackdrop') closeModal();
}
function setPage(next) {
  page = next;
  localStorage.setItem(PAGE_KEY, page);
  history.replaceState(null, '', `${location.pathname}${location.search ? location.search.replace(/([?&])page=[^&]*/,'').replace(/[?&]$/,'') : ''}${location.search ? '&' : '?'}page=${encodeURIComponent(page)}`);
  render();
  window.scrollTo({top:0, behavior:'smooth'});
}
function updateActiveTab() {
  document.querySelectorAll('.tabbar button').forEach(button => {
    button.classList.toggle('active', button.dataset.page === page);
  });
}
function updateHeader() {
  const p = activeProgram();
  const subtitle = document.getElementById('headerSubtitle');
  if (subtitle) subtitle.textContent = `${p?.name || 'Fitness tracker'} · ${state.settings.dietMode}`;
}
function render() {
  applyTheme();
  updateHeader();
  updateActiveTab();
  const renderers = {
    dashboard: renderDashboard,
    program: renderProgram,
    train: renderTrain,
    diet: renderDiet,
    progress: renderProgress,
    settings: renderSettings
  };
  const app = document.getElementById('app');
  app.innerHTML = (renderers[page] || renderDashboard)();
  const quickAdd = document.getElementById('quickAddButton');
  if (quickAdd) quickAdd.hidden = page === 'train' && (state.settings.trainView || 'workout') === 'workout' && draftIsActive(workoutDraft);
  updateSyncIndicator();
  if (page === 'progress') refreshPhotoGrid();
  if (page === 'train') {
    refreshWorkoutClock();
    updateDraftSaveStatus();
  }
}

function activeProgram() {
  return state.programs.find(p => p.id === state.settings.activeProgram) || state.programs[0];
}
function sessionKey(programId, sessionId) { return `${programId}|${sessionId}`; }
function getSession(programId, sessionId) {
  const program = state.programs.find(p => p.id === programId);
  const session = program?.sessions.find(s => s.id === sessionId);
  return {program, session};
}
function selectedSession() {
  const key = state.settings.lastSession || '';
  const [pid, sid] = key.split('|');
  let {program, session} = getSession(pid, sid);
  if (!program || !session) {
    program = activeProgram();
    session = program?.sessions?.[0];
  }
  return {program, session};
}
function setSelectedSession(value) {
  state.settings.lastSession = value;
  saveState();
  workoutDraft = null;
  saveDraft();
  render();
}
function setActiveProgram(value) {
  const p = state.programs.find(x => x.id === value);
  if (!p) return;
  state.settings.activeProgram = value;
  state.settings.lastSession = sessionKey(value, p.sessions?.[0]?.id || '');
  if (value === 'RFL2') state.settings.dietMode = 'RFL / PSMF';
  if (value !== 'RFL2' && state.settings.dietMode === 'RFL / PSMF') state.settings.dietMode = 'Normal / moderate deficit';
  saveState();
  workoutDraft = null;
  saveDraft();
  render();
}
function setDietMode(value) {
  state.settings.dietMode = value;
  if (value === 'RFL / PSMF' && state.programs.some(p => p.id === 'RFL2')) {
    state.settings.activeProgram = 'RFL2';
    state.settings.lastSession = sessionKey('RFL2', state.programs.find(p => p.id === 'RFL2')?.sessions?.[0]?.id || '');
  }
  if (value === 'Normal / moderate deficit' && state.settings.activeProgram === 'RFL2' && state.programs.some(p => p.id === 'UL4')) {
    state.settings.activeProgram = 'UL4';
    state.settings.lastSession = sessionKey('UL4', state.programs.find(p => p.id === 'UL4')?.sessions?.[0]?.id || '');
  }
  saveState();
  workoutDraft = null;
  saveDraft();
  render();
}
function latestMetric() {
  return [...state.bodyMetrics].filter(x => x.date).sort((a,b) => String(b.date).localeCompare(String(a.date)))[0];
}
function metricOnOrBefore(date) {
  return [...state.bodyMetrics].filter(x => x.date && x.date <= date).sort((a,b) => String(b.date).localeCompare(String(a.date)))[0];
}
function targets() {
  const rfl = state.settings.dietMode === 'RFL / PSMF';
  const prefix = rfl ? 'rfl' : 'normal';
  return {
    kcal: toNum(state.settings[`${prefix}CalorieTarget`]),
    protein: toNum(state.settings[`${prefix}ProteinTarget`]),
    carbs: toNum(state.settings[`${prefix}CarbTarget`]),
    fat: toNum(state.settings[`${prefix}FatTarget`])
  };
}
function foodTotals(date = selectedDietDate) {
  return state.foodLog.filter(x => x.date === date).reduce((a, row) => ({
    kcal: a.kcal + toNum(row.kcal),
    protein: a.protein + toNum(row.protein),
    carbs: a.carbs + toNum(row.carbs),
    fat: a.fat + toNum(row.fat)
  }), {kcal:0, protein:0, carbs:0, fat:0});
}
function workoutsSince(days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const iso = localDateISO(cutoff);
  return state.workoutSessions.filter(x => x.date >= iso && x.completed !== false);
}
function setsSince(days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const iso = localDateISO(cutoff);
  return state.workoutLogs.filter(x => x.date >= iso && !x.warmup);
}
function currentDietPhase() {
  return [...state.dietPhases].filter(x => x.status === 'Active').sort((a,b) => String(b.startDate).localeCompare(String(a.startDate)))[0];
}
function rollingWeightAverage(days = 7, endDate = localDateISO()) {
  const end = parseDate(endDate);
  if (!end) return 0;
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  const startISO = localDateISO(start);
  const rows = state.bodyMetrics.filter(x => x.date >= startISO && x.date <= endDate && toNum(x.weightKg) > 0);
  return rows.length ? rows.reduce((s,x) => s + toNum(x.weightKg), 0) / rows.length : 0;
}
function weightChange(days = 7) {
  const latest = latestMetric();
  if (!latest?.weightKg) return 0;
  const d = parseDate(latest.date);
  d.setDate(d.getDate() - days);
  const prior = metricOnOrBefore(localDateISO(d));
  return prior?.weightKg ? toNum(latest.weightKg) - toNum(prior.weightKg) : 0;
}
function workoutBest(exerciseName) {
  const rows = state.workoutLogs.filter(x => x.exercise === exerciseName && !x.warmup);
  if (!rows.length) return null;
  return rows.reduce((best, row) => toNum(row.estimated1RM) > toNum(best?.estimated1RM) ? row : best, null);
}
function lastExerciseSets(exerciseName) {
  const sessionIds = [...new Set(state.workoutLogs.filter(x => x.exercise === exerciseName).map(x => x.sessionLogId))];
  if (!sessionIds.length) return [];
  const sessions = state.workoutSessions.filter(s => sessionIds.includes(s.id)).sort((a,b) => String(b.date + b.startTime).localeCompare(String(a.date + a.startTime)));
  const lastId = sessions[0]?.id || sessionIds[sessionIds.length - 1];
  return state.workoutLogs.filter(x => x.sessionLogId === lastId && x.exercise === exerciseName).sort((a,b) => toNum(a.setNo) - toNum(b.setNo));
}
function progressBar(label, value, target, unit = '') {
  const pct = target > 0 ? value / target * 100 : 0;
  const over = pct > 105;
  return `<div>
    <div class="metric-line"><span class="small">${esc(label)}</span><strong class="small">${round(value,0)}${unit} ${target ? `/ ${round(target,0)}${unit}` : ''}</strong></div>
    <div class="progress ${over ? 'over' : ''}"><span style="width:${clamp(pct,0,100)}%"></span></div>
  </div>`;
}
function lineChartSvg(rows, valueKey, {width=640, height=220, label=''} = {}) {
  const clean = rows.filter(r => r.date && toNum(r[valueKey]) > 0).sort((a,b) => String(a.date).localeCompare(String(b.date)));
  if (clean.length < 2) return `<div class="empty">Add at least two entries to see the ${esc(label || valueKey)} trend.</div>`;
  const values = clean.map(r => toNum(r[valueKey]));
  let min = Math.min(...values), max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  const padX = 34, padY = 24;
  const x = i => padX + i * ((width - padX*2) / Math.max(1, clean.length - 1));
  const y = v => height - padY - ((v - min) / (max - min)) * (height - padY*2);
  const path = clean.map((r,i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(toNum(r[valueKey])).toFixed(1)}`).join(' ');
  const dots = clean.map((r,i) => `<circle cx="${x(i)}" cy="${y(toNum(r[valueKey]))}" r="3.5" fill="currentColor"><title>${esc(r.date)}: ${round(r[valueKey],1)}</title></circle>`).join('');
  const first = clean[0], last = clean[clean.length-1];
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)} chart">
    <line x1="${padX}" y1="${y(min)}" x2="${width-padX}" y2="${y(min)}" stroke="currentColor" opacity=".15"/>
    <line x1="${padX}" y1="${y(max)}" x2="${width-padX}" y2="${y(max)}" stroke="currentColor" opacity=".15"/>
    <path d="${path}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}
    <text x="4" y="${y(max)+4}" fill="currentColor" opacity=".65" font-size="11">${round(max,1)}</text>
    <text x="4" y="${y(min)+4}" fill="currentColor" opacity=".65" font-size="11">${round(min,1)}</text>
    <text x="${padX}" y="${height-5}" fill="currentColor" opacity=".65" font-size="10">${esc(formatDate(first.date))}</text>
    <text x="${width-padX}" y="${height-5}" text-anchor="end" fill="currentColor" opacity=".65" font-size="10">${esc(formatDate(last.date))}</text>
  </svg></div>`;
}
function todayProgramSession() {
  const p = activeProgram();
  if (!p?.sessions?.length) return null;
  const today = weekdayName();
  return p.sessions.find(s => String(s.day).toLowerCase() === today.toLowerCase()) || null;
}
function nextProgramSession() {
  const p = activeProgram();
  if (!p?.sessions?.length) return null;
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayIdx = new Date().getDay();
  const candidates = p.sessions.map(s => {
    const idx = days.indexOf(s.day);
    const delta = idx < 0 ? 7 : (idx - todayIdx + 7) % 7;
    return {session:s, delta};
  }).sort((a,b) => a.delta - b.delta);
  return candidates[0]?.session || p.sessions[0];
}

function renderInstallBanner() {
  if (isStandalone()) return '';
  if (installPrompt) return `<div class="card soft install-banner">
    <div><strong>Install on this phone</strong><div class="small muted">Open like a normal app and keep it available offline.</div></div>
    <button class="compact" onclick="installApp()">Install</button>
  </div>`;
  if (isIOS()) return `<div class="card soft">
    <strong>Install on iPhone/iPad</strong>
    <div class="small muted">In Safari, tap Share, then “Add to Home Screen”.</div>
  </div>`;
  return '';
}

function renderDashboard() {
  const program = activeProgram();
  const metric = latestMetric();
  const totals = foodTotals(localDateISO());
  const t = targets();
  const todaySession = todayProgramSession();
  const nextSession = todaySession || nextProgramSession();
  const recentSets = setsSince(7);
  const weeklyVolume = recentSets.reduce((s,x) => s + toNum(x.volumeKg), 0);
  const weekSessions = workoutsSince(7).length;
  const avg7 = rollingWeightAverage(7);
  const change7 = weightChange(7);
  const phase = currentDietPhase();
  const profile = state.settings.profileName ? `, ${state.settings.profileName}` : '';
  const recentMetrics = [...state.bodyMetrics].filter(x => x.weightKg).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(-12);
  const recentWorkout = [...state.workoutSessions].sort((a,b)=>String(b.date + (b.startTime||'')).localeCompare(String(a.date + (a.startTime||''))))[0];

  return `<div class="grid">
    ${renderInstallBanner()}
    <div class="card highlight">
      <div class="row-head">
        <div>
          <div class="small muted">Today · ${esc(weekdayName())}</div>
          <h2>Welcome${esc(profile)}</h2>
        </div>
        <span class="pill ${state.settings.dietMode === 'RFL / PSMF' ? 'warn' : ''}">${esc(state.settings.dietMode)}</span>
      </div>
      <div style="margin-top:12px" class="row soft">
        <div class="row-head">
          <div>
            <strong>${todaySession ? 'Scheduled today' : 'Next session'}: ${esc(nextSession?.name || 'No session')}</strong>
            <div class="small muted">${esc(program?.name || '')}${nextSession?.day ? ` · ${esc(nextSession.day)}` : ''}</div>
          </div>
          ${nextSession ? `<button class="compact" onclick="startSession('${esc(program.id)}','${esc(nextSession.id)}')">Start</button>` : ''}
        </div>
      </div>
      <div class="button-row" style="margin-top:10px">
        <button class="secondary" onclick="openAddFood()">Log food</button>
        <button class="secondary" onclick="openMetricModal()">Log weight</button>
        <button class="ghost" onclick="openCheckinModal()">Daily check-in</button>
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <div class="small muted">Latest weight</div>
        <div class="kpi">${metric?.weightKg ? round(metric.weightKg,1) : '—'}</div>
        <div class="small">${metric?.weightKg ? 'kg' : 'No entry'} ${avg7 ? `· 7d avg ${round(avg7,1)}` : ''}</div>
      </div>
      <div class="card">
        <div class="small muted">7-day change</div>
        <div class="kpi">${metric?.weightKg && change7 ? `${change7 > 0 ? '+' : ''}${round(change7,1)}` : '—'}</div>
        <div class="small">kg ${change7 < 0 ? '↓' : change7 > 0 ? '↑' : ''}</div>
      </div>
      <div class="card">
        <div class="small muted">Workouts · 7 days</div>
        <div class="kpi">${weekSessions}</div>
        <div class="small">${recentSets.length} work sets</div>
      </div>
      <div class="card">
        <div class="small muted">Volume · 7 days</div>
        <div class="kpi small-kpi">${weeklyVolume ? round(weeklyVolume/1000,1) : '0'}</div>
        <div class="small">tonnes logged</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="grid">
        <div class="card">
          <div class="card-title"><span>Today’s nutrition</span><span class="pill gray">${esc(localDateISO())}</span></div>
          <div class="stack">
            ${progressBar('Calories', totals.kcal, t.kcal, ' kcal')}
            ${progressBar('Protein', totals.protein, t.protein, ' g')}
            <div class="split">
              ${progressBar('Carbs', totals.carbs, t.carbs, ' g')}
              ${progressBar('Fat', totals.fat, t.fat, ' g')}
            </div>
          </div>
          ${state.settings.dietMode === 'RFL / PSMF' && !t.protein ? `<div class="notice warn" style="margin-top:10px">RFL targets are blank. Enter the exact values calculated from your edition of RFL rather than guessing.</div>` : ''}
        </div>
        <div class="card">
          <div class="card-title"><span>Weight trend</span><button class="ghost compact" onclick="setPage('progress')">Details</button></div>
          ${lineChartSvg(recentMetrics,'weightKg',{label:'Body weight'})}
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title"><span>Current phase</span>${phase ? `<span class="pill">${esc(phase.mode)}</span>` : '<span class="pill gray">None</span>'}</div>
          ${phase ? `<div class="stack">
            <div><strong>${esc(phase.name)}</strong><div class="small muted">${esc(phase.startDate)} → ${esc(phase.plannedEndDate || 'open-ended')}</div></div>
            <div class="metric-line"><span class="small">Day</span><strong>${Math.max(1, daysBetween(phase.startDate, localDateISO()) + 1)}</strong></div>
            <div class="metric-line"><span class="small">Start weight</span><strong>${phase.startWeightKg ? `${round(phase.startWeightKg,1)} kg` : '—'}</strong></div>
            <button class="secondary" onclick="setPage('progress')">Manage phase</button>
          </div>` : `<div class="empty">Start a normal-cut, maintenance, or RFL block to track it here.</div>`}
        </div>
        <div class="card">
          <div class="card-title"><span>Last workout</span></div>
          ${recentWorkout ? `<div class="row">
            <div class="row-head"><strong>${esc(recentWorkout.sessionName)}</strong><span class="pill gray">${esc(formatDate(recentWorkout.date))}</span></div>
            <div class="small muted">${esc(recentWorkout.programName || recentWorkout.programId)} · ${round(recentWorkout.durationMin,0) || '—'} min</div>
            <button class="secondary compact" onclick="repeatWorkout('${esc(recentWorkout.id)}')">Repeat session</button>
          </div>` : `<div class="empty">Your saved workouts will appear here.</div>`}
        </div>
        <div class="card">
          <div class="card-title"><span>Local-first storage</span><span class="pill ${state.settings.syncUrl && state.settings.syncKey ? 'good' : 'gray'}">${state.settings.syncUrl && state.settings.syncKey ? 'Sheets linked' : 'Phone only'}</span></div>
          <div class="small muted">Your records save on this phone first. Google Sheets sync is optional and manual by default.</div>
          <button class="ghost" style="margin-top:10px" onclick="openSyncPanel()">Sync settings</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderProgram() {
  const program = activeProgram();
  const view = state.settings.programView || 'plan';
  const kit=programEquipmentSummary(program);
  return `<div class="grid">
    <div class="card">
      <div class="card-title"><span>Training program</span><span class="pill">${esc(program?.mode || '')}</span></div>
      <label>Active program
        <select onchange="setActiveProgram(this.value)">
          ${state.programs.filter(p => p.active !== false).map(p => `<option value="${esc(p.id)}" ${p.id === program?.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
        </select>
      </label>
      <div class="button-row" style="margin-top:10px">
        <button class="${view === 'plan' ? '' : 'secondary'} compact" onclick="setProgramView('plan')">Plan</button>
        <button class="${view === 'library' ? '' : 'secondary'} compact" onclick="setProgramView('library')">Exercise cache</button>
        <button class="ghost compact" onclick="openProgramBuilder()">New / clone</button>
      </div>
      <p class="small muted">${esc(program?.description || '')}</p>
      <div class="equipment-program-panel ${kit.issues.length?'needs-kit':'ready'}">
        <div><strong>${kit.ready}/${kit.total} exercises match your equipment</strong><div class="tiny muted">${kit.issues.length?`${kit.issues.length} program slots need a substitution.`:`This program is ready for the selected home-gym setup.`}</div></div>
        <div class="button-row"><button class="secondary compact" onclick="openEquipmentManager()">Equipment</button>${kit.issues.length?`<button class="compact" onclick="openEquipmentAdaptation('${esc(program?.id||'')}')">Adapt copy</button>`:''}</div>
      </div>
      ${state.settings.dietMode === 'RFL / PSMF' ? `<div class="notice warn">RFL mode: keep 2–3 repetitions in reserve, avoid failure, and do not add the optional high-volume session.</div>` : ''}
    </div>
    ${view === 'library' ? renderExerciseLibrary() : `
      <div class="grid">
        ${(program?.sessions || []).sort((a,b)=>toNum(a.order)-toNum(b.order)).map(s => renderSessionCard(program, s)).join('')}
        <button class="secondary" onclick="openSessionEditor('${esc(program.id)}')">＋ Add session</button>
      </div>
    `}
  </div>`;
}
function setProgramView(value) {
  state.settings.programView = value;
  saveState();
  render();
}
function renderSessionCard(program, session) {
  const exercises = [...(session.exercises || [])].sort((a,b)=>toNum(a.order)-toNum(b.order));
  const issues=sessionEquipmentIssues(session);
  return `<details class="card session-card" open>
    <summary>
      <div class="row-head">
        <div><h2>${esc(session.name)}</h2><div class="small muted">${esc(session.day || 'Flexible day')} · ${exercises.length} exercises</div></div>
        <span class="pill ${issues.length?'warn':'good'}">${issues.length?`${issues.length} kit issue${issues.length===1?'':'s'}`:'Equipment ready'}</span>
      </div>
    </summary>
    <div class="list">
      ${exercises.map((slot,index) => {
        const lib = state.exercises.find(e => e.id === slot.exerciseId) || state.exercises.find(e => e.name === slot.name);
        const compatible=!lib||exerciseAvailable(lib);
        return `<div class="exercise-row ${compatible?'':'equipment-missing'}">
          <div>
            <strong>${esc(slot.name)}</strong>
            <div class="small muted">${esc(slot.sets)} × ${esc(slot.reps)} · RIR ${esc(slot.rir)} · ${esc(slot.restSec)}s rest</div>
            <div class="tag-list">
              ${lib?.muscle ? `<span class="pill gray">${esc(lib.muscle)}</span>` : ''}
              ${lib?.pattern ? `<span class="pill gray">${esc(lib.pattern)}</span>` : ''}
              ${lib?`<span class="pill ${compatible?'good':'warn'}">${esc(compatible?'Equipment ready':missingEquipmentText(lib))}</span>`:''}
              ${lib?.rflOk ? `<span class="pill ${String(lib.rflOk).startsWith('Yes') ? 'good' : 'warn'}">RFL ${esc(lib.rflOk)}</span>` : ''}
            </div>
            ${slot.notes ? `<div class="tiny muted" style="margin-top:5px">${esc(slot.notes)}</div>` : ''}
          </div>
          <div class="exercise-actions">
            <button class="secondary compact" onclick="openSubstitute('${esc(program.id)}','${esc(session.id)}','${esc(slot.id)}')">Swap</button>
            <button class="ghost compact" onclick="openSlotEditor('${esc(program.id)}','${esc(session.id)}','${esc(slot.id)}')">Edit</button>
            <button class="ghost compact" ${index===0?'disabled':''} onclick="moveSlot('${esc(program.id)}','${esc(session.id)}','${esc(slot.id)}',-1)">↑</button>
            <button class="ghost compact" ${index===exercises.length-1?'disabled':''} onclick="moveSlot('${esc(program.id)}','${esc(session.id)}','${esc(slot.id)}',1)">↓</button>
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="button-row" style="margin-top:10px">
      <button onclick="startSession('${esc(program.id)}','${esc(session.id)}')">Start workout</button>
      <button class="secondary" onclick="openAddExerciseToSession('${esc(program.id)}','${esc(session.id)}')">Add exercise</button>
      <button class="ghost" onclick="openSessionEditor('${esc(program.id)}','${esc(session.id)}')">Edit session</button>
    </div>
  </details>`;
}
function openProgramBuilder() {
  const p = activeProgram();
  showModal(`<div class="card-title"><span>Create program</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveNewProgram(event)">
      <label>Program name<input id="newProgramName" required placeholder="My custom program"></label>
      <label>Training mode<select id="newProgramMode"><option>Normal / moderate deficit</option><option>Maintenance</option><option>RFL / PSMF</option><option>Custom</option></select></label>
      <label>Description<textarea id="newProgramDescription" placeholder="Purpose and rules"></textarea></label>
      <label class="inline-check"><input id="cloneProgram" type="checkbox" checked> Start by cloning “${esc(p?.name || '')}”</label>
      <button type="submit">Create program</button>
    </form>`);
}
function saveNewProgram(event) {
  event.preventDefault();
  const name = document.getElementById('newProgramName').value.trim();
  if (!name) return;
  const clone = document.getElementById('cloneProgram').checked;
  const source = activeProgram();
  const program = {
    id: uid('program'),
    name,
    mode: document.getElementById('newProgramMode').value,
    description: document.getElementById('newProgramDescription').value.trim(),
    active: true,
    updatedAt: nowISO(),
    sessions: []
  };
  if (clone && source) {
    program.sessions = deepClone(source.sessions).map((s, si) => ({
      ...s,
      id: uid('session'),
      order: si + 1,
      updatedAt: nowISO(),
      exercises: (s.exercises || []).map((x, xi) => ({...x, id:uid('slot'), order:xi+1, updatedAt:nowISO()}))
    }));
  }
  state.programs.push(program);
  state.settings.activeProgram = program.id;
  state.settings.lastSession = sessionKey(program.id, program.sessions[0]?.id || '');
  saveState();
  closeModal();
  render();
  showToast('Program created');
}
function openSessionEditor(programId, sessionId = '') {
  const program = state.programs.find(p => p.id === programId);
  const session = program?.sessions.find(s => s.id === sessionId);
  showModal(`<div class="card-title"><span>${session ? 'Edit' : 'Add'} session</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveSession(event,'${esc(programId)}','${esc(sessionId)}')">
      <label>Session name<input id="sessionName" required value="${esc(session?.name || '')}" placeholder="Upper A"></label>
      <label>Scheduled day<select id="sessionDay">
        ${['Flexible','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => `<option ${d === (session?.day || 'Flexible') ? 'selected' : ''}>${d}</option>`).join('')}
      </select></label>
      <label>Notes<textarea id="sessionNotes">${esc(session?.notes || '')}</textarea></label>
      <div class="button-row">
        <button type="submit">Save session</button>
        ${session ? `<button type="button" class="danger" onclick="deleteSession('${esc(programId)}','${esc(sessionId)}')">Delete</button>` : ''}
      </div>
    </form>`);
}
function saveSession(event, programId, sessionId) {
  event.preventDefault();
  const program = state.programs.find(p => p.id === programId);
  if (!program) return;
  let session = program.sessions.find(s => s.id === sessionId);
  if (!session) {
    session = {id:uid('session'), order:program.sessions.length+1, exercises:[], updatedAt:nowISO()};
    program.sessions.push(session);
  }
  session.name = document.getElementById('sessionName').value.trim();
  session.day = document.getElementById('sessionDay').value;
  session.notes = document.getElementById('sessionNotes').value.trim();
  markUpdated(session); markUpdated(program);
  state.settings.lastSession = sessionKey(program.id, session.id);
  saveState();
  closeModal(); render(); showToast('Session saved');
}
function deleteSession(programId, sessionId) {
  const program = state.programs.find(p => p.id === programId);
  if (!program || !confirm('Delete this session from the program? Existing workout history remains.')) return;
  program.sessions = program.sessions.filter(s => s.id !== sessionId);
  program.sessions.forEach((s,i)=>s.order=i+1);
  markUpdated(program);
  state.settings.lastSession = sessionKey(program.id, program.sessions[0]?.id || '');
  saveState();
  closeModal(); render(); showToast('Session deleted');
}
function openSlotEditor(programId, sessionId, slotId) {
  const {program, session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  if (!slot) return;
  showModal(`<div class="card-title"><span>Edit exercise slot</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveSlot(event,'${esc(programId)}','${esc(sessionId)}','${esc(slotId)}')">
      <div class="notice"><strong>${esc(slot.name)}</strong></div>
      <div class="split">
        <label>Work sets<input id="slotSets" type="number" min="1" max="10" value="${esc(slot.sets)}"></label>
        <label>Rep range<input id="slotReps" value="${esc(slot.reps)}" placeholder="6-8"></label>
        <label>RIR<input id="slotRir" value="${esc(slot.rir)}" placeholder="1-2"></label>
        <label>Rest seconds<input id="slotRest" type="number" min="15" step="15" value="${esc(slot.restSec || 90)}"></label>
      </div>
      <label>Notes<textarea id="slotNotes">${esc(slot.notes || '')}</textarea></label>
      <div class="button-row">
        <button type="submit">Save</button>
        <button type="button" class="danger" onclick="removeSlot('${esc(programId)}','${esc(sessionId)}','${esc(slotId)}')">Remove</button>
      </div>
    </form>`);
}
function saveSlot(event, programId, sessionId, slotId) {
  event.preventDefault();
  const {program, session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  if (!slot) return;
  slot.sets = Math.max(1, toNum(document.getElementById('slotSets').value));
  slot.reps = document.getElementById('slotReps').value.trim();
  slot.rir = document.getElementById('slotRir').value.trim();
  slot.restSec = Math.max(15, toNum(document.getElementById('slotRest').value));
  slot.notes = document.getElementById('slotNotes').value.trim();
  markUpdated(slot); markUpdated(session); markUpdated(program);
  saveState(); closeModal(); render(); showToast('Exercise updated');
}
function removeSlot(programId, sessionId, slotId) {
  const {program, session} = getSession(programId, sessionId);
  if (!session || !confirm('Remove this exercise from the program session?')) return;
  session.exercises = session.exercises.filter(x => x.id !== slotId);
  session.exercises.forEach((x,i)=>x.order=i+1);
  markUpdated(session); markUpdated(program);
  saveState(); closeModal(); render(); showToast('Exercise removed');
}
function moveSlot(programId, sessionId, slotId, direction) {
  const {program, session} = getSession(programId, sessionId);
  if (!session) return;
  const list = [...session.exercises].sort((a,b)=>toNum(a.order)-toNum(b.order));
  const index = list.findIndex(x => x.id === slotId);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= list.length) return;
  [list[index], list[target]] = [list[target], list[index]];
  list.forEach((x,i)=>x.order=i+1);
  session.exercises = list;
  markUpdated(session); markUpdated(program);
  saveState(); render();
}
function normalizeEquipmentSelection(items) {
  const output=new Set(['Bodyweight / floor space']);
  (Array.isArray(items)?items:[]).forEach(item=>{
    const name=String(item||'').trim(); if(!name)return;
    const mapped=EQUIPMENT_ALIASES[name];
    (mapped||[name]).forEach(value=>output.add(value));
  });
  return [...output];
}
function allEquipmentItems() {
  const standard=EQUIPMENT_CATALOG.flatMap(group=>group.items.map(item=>item.name));
  return [...new Set([...standard,...(state?.settings?.customEquipment||[])])];
}
function equipmentRequirementSatisfied(requirement, inventorySet) {
  if(!requirement)return true;
  if(requirement==='Bodyweight / floor space')return true;
  if(inventorySet.has(requirement))return true;
  const options=VIRTUAL_EQUIPMENT[requirement]||[];
  return options.some(option=>inventorySet.has(option));
}
function parseLegacyEquipmentOptions(text) {
  const value=String(text||'').toLowerCase();
  if(!value||value.includes('bodyweight')||value.includes('outdoor'))return [['Bodyweight / floor space']];
  const option=[];
  if(value.includes('rack'))option.push('Power rack / squat stands');
  if(value.includes('barbell'))option.push('Barbell + plates');
  if(value.includes('dumbbell'))option.push('Dumbbells');
  if(value.includes('bench'))option.push(value.includes('incline')?'Adjustable bench':'Bench');
  if(value.includes('cable'))option.push('Cable station');
  if(value.includes('ankle'))option.push('Ankle strap');
  if(value.includes('ring')||value.includes('strap'))option.push('Gymnastic rings / suspension trainer');
  if(value.includes('pull-up')||value.includes('chin-up'))option.push('Pull-up bar');
  if(value.includes('ab wheel'))option.push('Ab wheel');
  if(value.includes('bike'))option.push('Exercise bike');
  if(value.includes('treadmill'))option.push('Treadmill');
  return [option.length?[...new Set(option)]:['Bodyweight / floor space']];
}
function equipmentOptionsFor(exercise) {
  const options=exercise?.equipmentOptions;
  return Array.isArray(options)&&options.length?options:parseLegacyEquipmentOptions(exercise?.equipment);
}
function equipmentOptionsText(options) {
  return (options||[]).map(option=>(option||[]).join(' + ')).join(' OR ') || 'Bodyweight / floor space';
}
function exerciseCompatibility(exercise) {
  const inventory=new Set(normalizeEquipmentSelection(state.settings.availableEquipment||[]));
  const options=equipmentOptionsFor(exercise);
  const assessed=options.map(option=>({option,missing:option.filter(req=>!equipmentRequirementSatisfied(req,inventory))}));
  assessed.sort((a,b)=>a.missing.length-b.missing.length||a.option.length-b.option.length);
  const best=assessed[0]||{option:[],missing:[]};
  return {available:best.missing.length===0,matchedOption:best.missing.length===0?best.option:[],bestOption:best.option,missing:best.missing,options};
}
function exerciseAvailable(exercise) { return exerciseCompatibility(exercise).available; }
function missingEquipmentText(exercise) {
  const result=exerciseCompatibility(exercise);
  return result.available?'Equipment ready':`Missing ${result.missing.join(' + ')}`;
}
function availableExerciseCount() { return state.exercises.filter(exerciseAvailable).length; }
function programEquipmentSummary(program) {
  const rows=(program?.sessions||[]).flatMap(session=>(session.exercises||[]).map(slot=>({session,slot,exercise:state.exercises.find(e=>e.id===slot.exerciseId)||state.exercises.find(e=>e.name===slot.name)})));
  const issues=rows.filter(row=>row.exercise&&!exerciseAvailable(row.exercise));
  return {total:rows.length,ready:rows.length-issues.length,issues};
}
function sessionEquipmentIssues(session) {
  return (session?.exercises||[]).map(slot=>({slot,exercise:state.exercises.find(e=>e.id===slot.exerciseId)||state.exercises.find(e=>e.name===slot.name)})).filter(row=>row.exercise&&!exerciseAvailable(row.exercise));
}
function alternativesForSlot(slot) {
  const source = state.exercises.find(e => e.id === slot.exerciseId) || state.exercises.find(e => e.name === slot.name);
  const explicitNames = state.alternatives.filter(a => a.defaultExercise === slot.name || a.defaultExercise === source?.name).map(a => a.alternative);
  const explicit = explicitNames.map(name => state.exercises.find(e => e.name === name)).filter(Boolean);
  const related = source ? state.exercises.filter(e => e.id !== source.id && (
    e.pattern === source.pattern || e.primaryFor === source.primaryFor || e.muscle === source.muscle
  )) : state.exercises;
  const explicitSet=new Set(explicit.map(e=>e.id));
  const map = new Map();
  [...explicit, ...related].forEach(e => { if (e?.name) map.set(e.id||e.name, e); });
  return [...map.values()].sort((a,b) => {
    const avail=Number(exerciseAvailable(b))-Number(exerciseAvailable(a)); if(avail)return avail;
    const explicitScore=Number(explicitSet.has(b.id))-Number(explicitSet.has(a.id)); if(explicitScore)return explicitScore;
    const score=item=>(item.pattern===source?.pattern?5:0)+(item.primaryFor===source?.primaryFor?4:0)+(item.muscle===source?.muscle?3:0)+(item.favourite?1:0);
    return score(b)-score(a)||a.name.localeCompare(b.name);
  });
}
function openSubstitute(programId, sessionId, slotId) {
  const {session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  if (!slot) return;
  const list = alternativesForSlot(slot).filter(exerciseAvailable);
  showModal(`<div class="card-title"><span>Swap ${esc(slot.name)}</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <label>Search exercise cache<input id="swapSearch" type="search" placeholder="Exercise, muscle, pattern, equipment" oninput="renderSwapList('${esc(programId)}','${esc(sessionId)}','${esc(slotId)}')"></label>
    <label class="inline-check" style="margin-top:8px"><input id="swapAvailableOnly" type="checkbox" checked onchange="renderSwapList('${esc(programId)}','${esc(sessionId)}','${esc(slotId)}')"> Compatible equipment only</label>
    <div id="swapList" class="list" style="margin-top:10px">${swapListHtml(programId,sessionId,slotId,list)}</div>
    <hr class="divider">
    <label>Custom exercise name<input id="customSwapName" placeholder="Enter a custom movement"></label>
    <button class="secondary" style="margin-top:8px" onclick="applyCustomSwap('${esc(programId)}','${esc(sessionId)}','${esc(slotId)}')">Use custom exercise</button>`);
}
function swapListHtml(programId, sessionId, slotId, list) {
  if (!list.length) return `<div class="empty">No compatible matches. Change your equipment filter, add custom equipment, or use a custom exercise.</div>`;
  return list.slice(0,80).map(ex => `<div class="row">
    <div class="row-head">
      <div><strong>${esc(ex.name)}</strong><div class="small muted">${esc(ex.muscle || '')} · ${esc(ex.pattern || '')}</div></div>
      <span class="pill ${exerciseAvailable(ex) ? 'good' : 'warn'}">${esc(exerciseAvailable(ex) ? 'Equipment ready' : missingEquipmentText(ex))}</span>
    </div>
    <div class="tiny muted">${esc(ex.equipment || equipmentOptionsText(ex.equipmentOptions))}</div>
    <div class="tiny muted">${esc(ex.notes || '')}</div>
    <button class="secondary compact" onclick="applySwap('${esc(programId)}','${esc(sessionId)}','${esc(slotId)}','${esc(ex.id)}')">Choose</button>
  </div>`).join('');
}
function renderSwapList(programId, sessionId, slotId) {
  const q = (document.getElementById('swapSearch')?.value || '').toLowerCase().trim();
  const availableOnly = document.getElementById('swapAvailableOnly')?.checked;
  const {session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  let list = q
    ? state.exercises.filter(e => `${e.name} ${e.muscle} ${e.pattern} ${e.equipment} ${e.notes}`.toLowerCase().includes(q))
    : alternativesForSlot(slot);
  if (availableOnly) list=list.filter(exerciseAvailable);
  list.sort((a,b)=>Number(exerciseAvailable(b))-Number(exerciseAvailable(a))||a.name.localeCompare(b.name));
  document.getElementById('swapList').innerHTML = swapListHtml(programId,sessionId,slotId,list);
}
function applySwap(programId, sessionId, slotId, exerciseId) {
  const {program, session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  const exercise = state.exercises.find(e => e.id === exerciseId);
  if (!slot || !exercise) return;
  slot.name = exercise.name;
  slot.exerciseId = exercise.id;
  markUpdated(slot); markUpdated(session); markUpdated(program);
  saveState(); closeModal(); render(); showToast('Exercise substituted');
}
function applyCustomSwap(programId, sessionId, slotId) {
  const name = document.getElementById('customSwapName').value.trim();
  if (!name) return showToast('Enter an exercise name');
  const {program, session} = getSession(programId, sessionId);
  const slot = session?.exercises.find(x => x.id === slotId);
  if (!slot) return;
  slot.name = name;
  slot.exerciseId = '';
  markUpdated(slot); markUpdated(session); markUpdated(program);
  saveState(); closeModal(); render(); showToast('Custom exercise used');
}
function openAddExerciseToSession(programId, sessionId) {
  showModal(`<div class="card-title"><span>Add exercise</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <label>Search cache<input id="addExerciseSearch" type="search" placeholder="Exercise, muscle, pattern" oninput="renderAddExerciseList('${esc(programId)}','${esc(sessionId)}')"></label>
    <label class="inline-check"><input id="addExerciseAvailable" type="checkbox" checked onchange="renderAddExerciseList('${esc(programId)}','${esc(sessionId)}')"> Compatible equipment only</label>
    <div id="addExerciseList" class="list" style="margin-top:10px">${addExerciseListHtml(programId,sessionId,state.exercises.filter(exerciseAvailable).slice(0,50))}</div>`);
}
function addExerciseListHtml(programId, sessionId, list) {
  if(!list.length)return `<div class="empty">No exercises match this equipment profile and search.</div>`;
  return list.map(e => `<div class="row">
    <div class="row-head"><div><strong>${esc(e.name)}</strong><div class="small muted">${esc(e.muscle)} · ${esc(e.pattern)}</div></div><span class="pill ${exerciseAvailable(e)?'good':'warn'}">${esc(exerciseAvailable(e)?'Equipment ready':missingEquipmentText(e))}</span></div>
    <div class="tiny muted">${esc(e.equipment||equipmentOptionsText(e.equipmentOptions))}</div>
    <button class="secondary compact" onclick="addLibraryExerciseToSession('${esc(programId)}','${esc(sessionId)}','${esc(e.id)}')">Add</button>
  </div>`).join('');
}
function renderAddExerciseList(programId, sessionId) {
  const q = (document.getElementById('addExerciseSearch')?.value || '').toLowerCase().trim();
  const availableOnly=document.getElementById('addExerciseAvailable')?.checked;
  let list = state.exercises.filter(e => `${e.name} ${e.muscle} ${e.pattern} ${e.equipment}`.toLowerCase().includes(q));
  if(availableOnly)list=list.filter(exerciseAvailable);
  list.sort((a,b)=>Number(exerciseAvailable(b))-Number(exerciseAvailable(a))||a.name.localeCompare(b.name));
  document.getElementById('addExerciseList').innerHTML = addExerciseListHtml(programId,sessionId,list.slice(0,100));
}
function addLibraryExerciseToSession(programId, sessionId, exerciseId) {
  const {program, session} = getSession(programId, sessionId);
  const exercise = state.exercises.find(e => e.id === exerciseId);
  if (!session || !exercise) return;
  session.exercises.push({
    id:uid('slot'), exerciseId:exercise.id, name:exercise.name,
    sets:2, reps:'8-12', rir:state.settings.dietMode === 'RFL / PSMF' ? '2-3' : '1-2',
    restSec:90, notes:'', order:session.exercises.length+1, updatedAt:nowISO()
  });
  markUpdated(session); markUpdated(program);
  saveState(); closeModal(); render(); showToast('Exercise added');
}
function renderExerciseLibrary() {
  const patterns = [...new Set(state.exercises.map(e=>e.pattern).filter(Boolean))].sort();
  return `<div class="card">
    <div class="card-title"><span>Exercise cache</span><span class="pill good">${availableExerciseCount()} of ${state.exercises.length} compatible</span></div>
    <div class="stack">
      <label>Search<input id="exerciseSearch" type="search" placeholder="Exercise, muscle, equipment..." oninput="renderExerciseLibraryList()"></label>
      <div class="split">
        <label>Pattern<select id="exercisePattern" onchange="renderExerciseLibraryList()"><option value="">All patterns</option>${patterns.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>
        <label>Filter<select id="exerciseRfl" onchange="renderExerciseLibraryList()"><option value="available">Compatible equipment</option><option value="">All</option><option value="unavailable">Missing equipment</option><option value="rfl">RFL suitable</option><option value="favourite">Favourites</option></select></label>
      </div>
      <div class="button-row"><button class="secondary" onclick="openExerciseEditor()">＋ Add custom exercise</button><button class="ghost" onclick="openEquipmentManager()">Manage equipment</button></div>
      <div id="exerciseLibraryList" class="list">${exerciseLibraryHtml(state.exercises.filter(exerciseAvailable).slice(0,60))}</div>
    </div>
  </div>`;
}
function exerciseLibraryHtml(list) {
  if (!list.length) return `<div class="empty">No exercises match the filters.</div>`;
  return list.slice(0,120).map(e => `<div class="row">
    <div class="row-head">
      <div><strong>${esc(e.name)}</strong><div class="small muted">${esc(e.muscle)} · ${esc(e.pattern)}</div></div>
      <button class="ghost compact" onclick="toggleExerciseFavourite('${esc(e.id)}')">${e.favourite ? '★' : '☆'}</button>
    </div>
    <div class="tag-list"><span class="pill ${exerciseAvailable(e)?'good':'warn'}">${esc(exerciseAvailable(e)?'Equipment ready':missingEquipmentText(e))}</span><span class="pill ${String(e.rflOk).startsWith('Yes')?'good':'warn'}">RFL ${esc(e.rflOk)}</span></div>
    <div class="tiny muted">${esc(e.equipment||equipmentOptionsText(e.equipmentOptions))}</div>
    <div class="tiny muted">${esc(e.notes || '')}</div>
    <button class="secondary compact" onclick="openExerciseEditor('${esc(e.id)}')">Edit</button>
  </div>`).join('');
}
function renderExerciseLibraryList() {
  const q = (document.getElementById('exerciseSearch')?.value || '').toLowerCase().trim();
  const pattern = document.getElementById('exercisePattern')?.value || '';
  const filter = document.getElementById('exerciseRfl')?.value || 'available';
  let list = state.exercises.filter(e => `${e.name} ${e.muscle} ${e.pattern} ${e.equipment} ${e.notes}`.toLowerCase().includes(q));
  if (pattern) list = list.filter(e => e.pattern === pattern);
  if (filter === 'rfl') list = list.filter(e => String(e.rflOk).startsWith('Yes'));
  if (filter === 'available') list = list.filter(exerciseAvailable);
  if (filter === 'unavailable') list = list.filter(e=>!exerciseAvailable(e));
  if (filter === 'favourite') list = list.filter(e => e.favourite);
  list.sort((a,b)=>Number(exerciseAvailable(b))-Number(exerciseAvailable(a))||a.name.localeCompare(b.name));
  document.getElementById('exerciseLibraryList').innerHTML = exerciseLibraryHtml(list);
}
function toggleExerciseFavourite(id) {
  const e = state.exercises.find(x => x.id === id);
  if (!e) return;
  e.favourite = !e.favourite; markUpdated(e); saveState(); render();
}
function equipmentCheckboxGroups(selected=[]) {
  const set=new Set(selected);
  const custom=state.settings.customEquipment||[];
  const groups=[...EQUIPMENT_CATALOG];
  if(custom.length)groups.push({category:'Custom equipment',items:custom.map(name=>({name,description:'Custom item'}))});
  return groups.map(group=>`<details class="equipment-select-group"><summary>${esc(group.category)}</summary><div class="equipment-check-grid">${group.items.map(item=>`<label class="equipment-choice"><input type="checkbox" name="exEquipmentOption" value="${esc(item.name)}" ${set.has(item.name)?'checked':''}><span><strong>${esc(item.name)}</strong><small>${esc(item.description||'')}</small></span></label>`).join('')}</div></details>`).join('');
}
function openExerciseEditor(id = '') {
  const e = state.exercises.find(x => x.id === id);
  const firstSetup=equipmentOptionsFor(e)[0]||['Bodyweight / floor space'];
  showModal(`<div class="card-title"><span>${e ? 'Edit' : 'Add'} exercise</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveExercise(event,'${esc(id)}')">
      <label>Name<input id="exName" required value="${esc(e?.name || '')}"></label>
      <div class="split">
        <label>Muscle group<input id="exMuscle" value="${esc(e?.muscle || '')}"></label>
        <label>Movement pattern<input id="exPattern" value="${esc(e?.pattern || '')}"></label>
      </div>
      <details class="equipment-editor" open><summary><strong>Required equipment</strong><span class="pill gray">${firstSetup.length} selected</span></summary><div class="small muted">Select everything required for one valid setup. Bodyweight is assumed when nothing else is selected.</div>${equipmentCheckboxGroups(firstSetup)}</details>
      ${equipmentOptionsFor(e).length>1?`<div class="notice">This seeded exercise currently supports ${equipmentOptionsFor(e).length} alternative setups. Saving will replace them with the setup selected above.</div>`:''}
      <div class="split">
        <label>Primary use<input id="exPrimary" value="${esc(e?.primaryFor || '')}"></label>
        <label>RFL suitability<select id="exRfl">${['Yes','Maybe','No'].map(x=>`<option ${x===e?.rflOk?'selected':''}>${x}</option>`).join('')}</select></label>
      </div>
      <label>Notes<textarea id="exNotes">${esc(e?.notes || '')}</textarea></label>
      <div class="button-row"><button type="submit">Save exercise</button>${e && String(e.id).startsWith('EX-') ? `<button type="button" class="danger" onclick="deleteExercise('${esc(e.id)}')">Delete</button>`:''}</div>
    </form>`);
}
function saveExercise(event, id) {
  event.preventDefault();
  let e = state.exercises.find(x => x.id === id);
  if (!e) { e = {id:uid('EX'), favourite:false, difficulty:'Custom', updatedAt:nowISO()}; state.exercises.push(e); }
  e.name = document.getElementById('exName').value.trim();
  e.muscle = document.getElementById('exMuscle').value.trim();
  e.pattern = document.getElementById('exPattern').value.trim();
  const selected=[...document.querySelectorAll('input[name="exEquipmentOption"]:checked')].map(input=>input.value);
  e.equipmentOptions=[selected.length?selected:['Bodyweight / floor space']];
  e.optionalEquipment=[];
  e.equipment=equipmentOptionsText(e.equipmentOptions);
  e.primaryFor = document.getElementById('exPrimary').value.trim();
  e.rflOk = document.getElementById('exRfl').value;
  e.notes = document.getElementById('exNotes').value.trim();
  markUpdated(e); saveState(); closeModal(); render(); showToast('Exercise saved');
}
function deleteExercise(id) {
  const used = state.programs.some(p => p.sessions.some(s => s.exercises.some(x => x.exerciseId === id)));
  if (used) return showToast('This exercise is used in a program. Swap or remove it there first.');
  if (!confirm('Delete this custom exercise?')) return;
  state.exercises = state.exercises.filter(x => x.id !== id);
  saveState(); closeModal(); render(); showToast('Exercise deleted');
}

function draftHasActivity(draft = workoutDraft) {
  return Boolean(draft?.exercises?.some(ex => ex.sets?.some(set => set.done || toNum(set.reps) > 0 || set.rir !== '' && set.rir !== null && set.rir !== undefined)));
}
function draftIsActive(draft = workoutDraft) {
  return Boolean(draft && (draft.startedExplicitly === true || draftHasActivity(draft)));
}
function startSession(programId, sessionId, force = false) {
  const {program, session} = getSession(programId, sessionId);
  if (!program || !session) return;
  const issues=sessionEquipmentIssues(session);
  if(!force&&issues.length){
    showModal(`<div class="card-title"><span>Equipment check</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">${issues.length} exercise${issues.length===1?'':'s'} do not match your selected equipment.</div><div class="list" style="margin-top:10px">${issues.map(item=>`<div class="row"><strong>${esc(item.slot.name)}</strong><div class="small muted">${esc(missingEquipmentText(item.exercise))}</div></div>`).join('')}</div><div class="button-row" style="margin-top:12px"><button onclick="closeModal();startSession('${esc(programId)}','${esc(sessionId)}',true)">Start anyway</button><button class="secondary" onclick="closeModal();openEquipmentAdaptation('${esc(programId)}')">Create matched copy</button><button class="ghost" onclick="closeModal();openEquipmentManager()">Edit equipment</button></div>`);
    return;
  }
  if (workoutDraft && draftHasActivity(workoutDraft)) {
    if (!confirm('Replace the current unsaved workout? Its entered sets will be discarded.')) return;
  }
  state.settings.lastSession = sessionKey(programId, sessionId);
  state.settings.trainView = 'workout'; saveState({autoSync:false});
  workoutDraft = buildWorkoutDraft(program, session); saveDraft(); page = 'train';
  localStorage.setItem(PAGE_KEY, page); closeModal(); render(); window.scrollTo({top:0,behavior:'smooth'});
}
function exerciseHistory(exerciseName, exerciseId = '', limit = 3) {
  const rows = state.workoutLogs.filter(row =>
    ((exerciseId && row.exerciseId === exerciseId) || row.exercise === exerciseName) && !row.warmup
  );
  if (!rows.length) return [];
  const bySession = new Map();
  rows.forEach(row => {
    if (!bySession.has(row.sessionLogId)) bySession.set(row.sessionLogId, []);
    bySession.get(row.sessionLogId).push(row);
  });
  return [...bySession.entries()].map(([sessionLogId, sets]) => {
    const session = state.workoutSessions.find(item => item.id === sessionLogId) || {
      id:sessionLogId, date:sets[0]?.date || '', startTime:''
    };
    return {session, sets:sets.sort((a,b)=>toNum(a.setNo)-toNum(b.setNo))};
  }).sort((a,b)=>String(b.session.date+(b.session.startTime||'')).localeCompare(String(a.session.date+(a.session.startTime||'')))).slice(0,limit);
}
function migrateWorkoutDraft(input) {
  if (!input || typeof input !== 'object') return null;
  const draft = input;
  const legacyDraft = !draft.draftVersion;
  draft.draftVersion = '2.3.0';
  draft.exercises = Array.isArray(draft.exercises) ? draft.exercises : [];
  draft.exercises.forEach((ex, exIndex) => {
    ex.slotId ||= uid('slot');
    ex.exerciseId ||= '';
    ex.name ||= `Exercise ${exIndex + 1}`;
    ex.targetSets ||= Math.max(1, ex.sets?.length || 1);
    ex.targetReps ||= '8-12';
    ex.targetRir ||= state?.settings?.dietMode === 'RFL / PSMF' ? '2-3' : '1-2';
    ex.restSec = toNum(ex.restSec) || toNum(state?.settings?.restTimerDefaultSec) || 120;
    ex.notes ||= '';
    ex.originalName ||= '';
    ex.originalExerciseId ||= '';
    ex.substitutionReason ||= '';
    ex.collapsed = Boolean(ex.collapsed);
    const previous = exerciseHistory(ex.name, ex.exerciseId, 1)[0]?.sets || [];
    ex.sets = Array.isArray(ex.sets) && ex.sets.length ? ex.sets : [{id:uid('draftset'),setNo:1,warmup:false,weightKg:'',reps:'',rir:'',done:false}];
    ex.sets.forEach((set, setIndex) => {
      set.id ||= uid('draftset');
      set.setNo = setIndex + 1;
      set.warmup = Boolean(set.warmup);
      set.done = Boolean(set.done);
      if (set.weightKg === undefined || set.weightKg === null) set.weightKg = '';
      if (set.reps === undefined || set.reps === null) set.reps = '';
      if (set.rir === undefined || set.rir === null) set.rir = '';
      const prior = previous[setIndex] || previous[previous.length - 1];
      set.previous ||= prior ? {weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir} : null;
    });
  });
  if (legacyDraft) {
    const entered = draft.exercises.flatMap(ex=>ex.sets).filter(set=>toNum(set.reps)>0);
    const untouchedLegacyPrefill = entered.length > 0 && entered.every(set =>
      !set.done && set.previous &&
      toNum(set.weightKg) === toNum(set.previous.weightKg) &&
      toNum(set.reps) === toNum(set.previous.reps) &&
      String(set.rir ?? '') === String(set.previous.rir ?? '')
    );
    if (untouchedLegacyPrefill) {
      draft.exercises.forEach(ex=>ex.sets.forEach(set=>{set.reps='';set.rir='';set.done=false;}));
    }
  }
  if (draft.startedExplicitly === undefined) draft.startedExplicitly = draftHasActivity(draft);
  draft.startedAt ||= localDateTimeISO();
  draft.date ||= localDateISO();
  draft.notes ||= '';
  draft.lastSavedAt ||= nowISO();
  return draft;
}
function buildWorkoutDraft(program, session) {
  const draft = {
    id:uid('draft'),
    draftVersion:'2.3.0',
    startedExplicitly:true,
    date:localDateISO(),
    programId:program.id,
    programName:program.name,
    sessionId:session.id,
    sessionName:session.name,
    startedAt:localDateTimeISO(),
    lastSavedAt:nowISO(),
    bodyWeightKg:latestMetric()?.weightKg || '',
    notes:'',
    exercises:[...(session.exercises || [])].sort((a,b)=>toNum(a.order)-toNum(b.order)).map(slot => {
      const previous = exerciseHistory(slot.name, slot.exerciseId || '', 1)[0]?.sets || [];
      const sets = [];
      for (let i=0;i<Math.max(1,toNum(slot.sets));i++) {
        const prior = previous[i] || previous[previous.length-1];
        sets.push({
          id:uid('draftset'), setNo:i+1, warmup:false,
          weightKg:prior?.weightKg ?? '', reps:'', rir:'', done:false,
          previous:prior ? {weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir} : null
        });
      }
      return {
        slotId:slot.id, exerciseId:slot.exerciseId || '', name:slot.name,
        originalName:'', originalExerciseId:'', substitutionReason:'',
        targetSets:slot.sets, targetReps:slot.reps, targetRir:slot.rir,
        restSec:slot.restSec || state.settings.restTimerDefaultSec || 120,
        notes:'', collapsed:false, sets
      };
    })
  };
  return migrateWorkoutDraft(draft);
}
function ensureWorkoutDraft() {
  if (workoutDraft) {
    workoutDraft = migrateWorkoutDraft(workoutDraft);
    return draftIsActive(workoutDraft) ? workoutDraft : null;
  }
  const stored = loadDraft();
  if (stored?.programId && stored?.sessionId && draftIsActive(stored)) {
    workoutDraft = stored;
    return workoutDraft;
  }
  return null;
}
function setTrainView(value) {
  state.settings.trainView = value === 'history' ? 'history' : 'workout';
  saveState({autoSync:false});
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}
function changeTrainSession(value) {
  const [pid,sid] = value.split('|');
  startSession(pid,sid);
}
function updateDraftField(key, value) {
  ensureWorkoutDraft();
  workoutDraft[key] = ['bodyWeightKg'].includes(key) ? numOrBlank(value) : value;
  saveDraft();
}
function updateDraftSet(exIndex, setIndex, key, value) {
  const set = ensureWorkoutDraft()?.exercises?.[exIndex]?.sets?.[setIndex];
  if (!set) return;
  set[key] = ['weightKg','reps','rir'].includes(key) ? numOrBlank(value) : value;
  if (key === 'reps' && toNum(set.reps) <= 0) set.done = false;
  saveDraft();
  updateWorkoutProgressDom();
}
function updateDraftExerciseNote(exIndex, value) {
  const ex = ensureWorkoutDraft()?.exercises?.[exIndex];
  if (!ex) return;
  ex.notes = value;
  saveDraft();
}
function toggleExerciseCollapse(exIndex) {
  const ex = ensureWorkoutDraft()?.exercises?.[exIndex];
  if (!ex) return;
  ex.collapsed = !ex.collapsed;
  saveDraft();
  render();
  setTimeout(()=>document.getElementById(`workout-exercise-${exIndex}`)?.scrollIntoView({block:'nearest'}),40);
}
function toggleWarmup(exIndex, setIndex) {
  const set = ensureWorkoutDraft()?.exercises?.[exIndex]?.sets?.[setIndex];
  if (!set) return;
  set.warmup = !set.warmup;
  saveDraft();
  render();
}
function toggleSetDone(exIndex, setIndex) {
  const draft = ensureWorkoutDraft();
  const ex = draft?.exercises?.[exIndex];
  const set = ex?.sets?.[setIndex];
  if (!set) return;
  if (!set.done && toNum(set.reps) <= 0) {
    showToast('Enter the repetitions before completing this set');
    setTimeout(()=>document.getElementById(`set-reps-${exIndex}-${setIndex}`)?.focus(),20);
    return;
  }
  set.done = !set.done;
  saveDraft();
  if (set.done && !set.warmup && state.settings.autoRestTimer !== false) startRestTimer(ex.restSec, ex.name);
  render();
  if (set.done && state.settings.autoAdvanceSets !== false) {
    setTimeout(()=>scrollToNextIncompleteSet(exIndex,setIndex),80);
  }
}
function addDraftSet(exIndex) {
  const ex = ensureWorkoutDraft()?.exercises?.[exIndex];
  if (!ex) return;
  const priorDraft = ex.sets[ex.sets.length-1] || {};
  const priorHistory = exerciseHistory(ex.name, ex.exerciseId, 1)[0]?.sets || [];
  const prior = priorHistory[ex.sets.length] || priorHistory[priorHistory.length-1];
  ex.sets.push({
    id:uid('draftset'), setNo:ex.sets.length+1, warmup:false,
    weightKg:priorDraft.weightKg ?? prior?.weightKg ?? '', reps:'', rir:'', done:false,
    previous:prior ? {weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir} : null
  });
  saveDraft(); render();
}
function removeDraftSet(exIndex, setIndex) {
  const ex = ensureWorkoutDraft()?.exercises?.[exIndex];
  const set = ex?.sets?.[setIndex];
  if (!ex || !set || ex.sets.length <= 1) return;
  if ((set.done || toNum(set.reps) > 0) && !confirm('Remove this entered set from the workout draft?')) return;
  ex.sets.splice(setIndex,1);
  ex.sets.forEach((item,i)=>item.setNo=i+1);
  saveDraft(); render();
}
function resetWorkoutDraft() {
  if (!confirm('Discard the current workout draft and start this session again?')) return;
  const current = ensureWorkoutDraft();
  const {program,session} = getSession(current?.programId,current?.sessionId);
  workoutDraft = program && session ? buildWorkoutDraft(program,session) : null;
  saveDraft(); render(); showToast('Fresh workout started');
}
function workoutDraftStats(draft = ensureWorkoutDraft()) {
  const workSets = [];
  const warmups = [];
  (draft?.exercises || []).forEach((ex,exIndex)=>{
    (ex.sets || []).forEach((set,setIndex)=>{
      const row={ex,set,exIndex,setIndex};
      (set.warmup ? warmups : workSets).push(row);
    });
  });
  const completed = workSets.filter(row=>row.set.done && toNum(row.set.reps)>0);
  const entered = workSets.filter(row=>toNum(row.set.reps)>0);
  return {
    total:workSets.length,
    completed:completed.length,
    entered:entered.length,
    incomplete:Math.max(0,workSets.length-completed.length),
    warmups:warmups.length,
    volume:completed.reduce((sum,row)=>sum+toNum(row.set.weightKg)*toNum(row.set.reps),0)
  };
}
function updateWorkoutProgressDom() {
  if (page !== 'train' || (state.settings.trainView || 'workout') !== 'workout' || !workoutDraft) return;
  const stats=workoutDraftStats(workoutDraft);
  const pct=stats.total ? stats.completed/stats.total*100 : 0;
  document.querySelectorAll('[data-workout-progress]').forEach(el=>el.style.width=`${clamp(pct,0,100)}%`);
  document.querySelectorAll('[data-workout-count]').forEach(el=>el.textContent=`${stats.completed}/${stats.total}`);
  const volume=document.getElementById('liveWorkoutVolume');
  if(volume) volume.textContent=`${round(stats.volume/1000,1)} t`;
}
function formatElapsedSeconds(seconds) {
  const safe=Math.max(0,Math.floor(seconds));
  const hours=Math.floor(safe/3600);
  const minutes=Math.floor((safe%3600)/60);
  const secs=safe%60;
  return hours ? `${hours}:${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}` : `${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}
function refreshWorkoutClock() {
  if (!workoutDraft?.startedAt) return;
  const start=new Date(workoutDraft.startedAt);
  const seconds=Number.isNaN(start.getTime()) ? 0 : (Date.now()-start.getTime())/1000;
  document.querySelectorAll('[data-workout-elapsed]').forEach(el=>el.textContent=formatElapsedSeconds(seconds));
}
function updateDraftSaveStatus() {
  const el=document.getElementById('draftSaveStatus');
  if(!el || !workoutDraft?.lastSavedAt) return;
  const seconds=Math.max(0,Math.round((Date.now()-new Date(workoutDraft.lastSavedAt).getTime())/1000));
  el.textContent=seconds<5?'Saved on phone now':seconds<60?`Saved on phone ${seconds}s ago`:`Saved on phone ${Math.floor(seconds/60)}m ago`;
}
function scrollToNextIncompleteSet(afterExIndex=-1, afterSetIndex=-1) {
  const draft=ensureWorkoutDraft();
  const candidates=[];
  draft.exercises.forEach((ex,exIndex)=>ex.sets.forEach((set,setIndex)=>{
    if(!set.warmup && !set.done) candidates.push({exIndex,setIndex});
  }));
  let next=candidates.find(x=>x.exIndex>afterExIndex || x.exIndex===afterExIndex && x.setIndex>afterSetIndex) || candidates[0];
  if(!next) return showToast('All planned work sets are complete');
  const row=document.getElementById(`workout-set-${next.exIndex}-${next.setIndex}`);
  row?.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(()=>document.getElementById(`set-reps-${next.exIndex}-${next.setIndex}`)?.focus(),250);
}
function parseTargetRange(value, fallbackMin=1, fallbackMax=fallbackMin) {
  const numbers=String(value||'').match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  return {min:numbers[0] ?? fallbackMin,max:numbers[1] ?? numbers[0] ?? fallbackMax};
}
function exerciseRecordForDraft(ex) {
  return state.exercises.find(item=>item.id===ex.exerciseId) || state.exercises.find(item=>item.name===ex.name) || null;
}
function progressionIncrement(ex) {
  const record=exerciseRecordForDraft(ex);
  const descriptor=`${ex.name} ${record?.pattern||''} ${record?.equipment||''}`.toLowerCase();
  const small=/lateral|rear delt|curl|triceps|calf|crunch|dead bug|pallof|fly|extension|pushdown/.test(descriptor);
  const dumbbell=!small&&/dumbbell/.test(descriptor);
  const configured=small?state.settings.smallWeightIncrementKg:dumbbell?state.settings.dumbbellWeightIncrementKg:state.settings.weightIncrementKg;
  return Math.max(.25,toNum(configured)||(small?1:dumbbell?2:2.5));
}
function roundToIncrement(value, increment) {
  if(!toNum(value)) return 0;
  return Math.round(toNum(value)/increment)*increment;
}
function sessionPerformance(historyItem) {
  if(!historyItem?.sets?.length) return 0;
  return Math.max(...historyItem.sets.map(set=>calculateE1RM(set.weightKg,set.reps)));
}
function progressionSuggestion(ex) {
  const history=exerciseHistory(ex.name,ex.exerciseId,3);
  const last=history[0];
  const repRange=parseTargetRange(ex.targetReps,1,1);
  const rirRange=parseTargetRange(ex.targetRir,1,2);
  const isRfl=state.settings.dietMode==='RFL / PSMF' || ensureWorkoutDraft()?.programId==='RFL2';
  if(!last?.sets?.length){
    return {kind:'new',label:'Establish baseline',headline:`Choose a controlled ${repRange.min}-${repRange.max} rep load`,detail:`Finish each work set near RIR ${ex.targetRir || (isRfl?'2-3':'1-2')}.`,suggestedWeight:0};
  }
  const sets=last.sets.slice(0,Math.max(1,toNum(ex.targetSets)||last.sets.length));
  const reps=sets.map(set=>toNum(set.reps));
  const knownRir=sets.map(set=>numOrBlank(set.rir)).filter(value=>value!=='').map(Number);
  const avgRir=knownRir.length?knownRir.reduce((a,b)=>a+b,0)/knownRir.length:null;
  const baseWeight=toNum(sets[0]?.weightKg);
  const enoughSets=sets.length>=Math.max(1,toNum(ex.targetSets)||1);
  const allAtTop=enoughSets&&reps.every(value=>value>=repRange.max);
  const allInRange=enoughSets&&reps.every(value=>value>=repRange.min);
  const underRange=reps.filter(value=>value<repRange.min).length>=Math.ceil(reps.length/2);
  const repeatedDecline=history.length>=3&&sessionPerformance(history[0])<sessionPerformance(history[1])*.97&&sessionPerformance(history[1])<sessionPerformance(history[2])*.97;
  const increment=progressionIncrement(ex);
  const previousText=sets.map(set=>`${round(set.weightKg,1)}×${round(set.reps,0)}${set.rir!==''&&set.rir!==undefined?` @${round(set.rir,1)}`:''}`).join(', ');
  if(isRfl){
    if(baseWeight>0&&(underRange&&(avgRir===null||avgRir<1)||repeatedDecline)){
      const suggested=roundToIncrement(baseWeight*.95,increment);
      return {kind:'reduce',label:'RFL: reduce slightly',headline:`Try ${round(suggested,2)} kg`,detail:`Performance was below the programmed range. Preserve clean reps and RIR ${ex.targetRir}. Last: ${previousText}.`,suggestedWeight:suggested};
    }
    return {kind:'maintain',label:'RFL: preserve',headline:baseWeight?`Keep ${round(baseWeight,2)} kg`:'Match the previous setup',detail:`Aim to match the previous reps without grinding. Last: ${previousText}.`,suggestedWeight:baseWeight};
  }
  const rirSupportsIncrease=avgRir===null||avgRir>=rirRange.min;
  if(allAtTop&&rirSupportsIncrease){
    if(baseWeight>0){
      const suggested=roundToIncrement(baseWeight+increment,increment);
      return {kind:'increase',label:'Progress',headline:`Try ${round(suggested,2)} kg`,detail:`You reached the top of the rep range across the planned sets. Start again near ${repRange.min} reps.`,suggestedWeight:suggested};
    }
    return {kind:'increase',label:'Progress',headline:'Add a small amount of resistance',detail:`You reached ${repRange.max} reps across the planned sets.`,suggestedWeight:0};
  }
  if(baseWeight>0&&(repeatedDecline||underRange&&avgRir!==null&&avgRir<Math.max(.5,rirRange.min-1))){
    const suggested=roundToIncrement(baseWeight*.95,increment);
    return {kind:'reduce',label:'Reset load',headline:`Try ${round(suggested,2)} kg`,detail:repeatedDecline?'Estimated strength declined in three consecutive exposures. Use clean reps and rebuild.':`Most sets fell below ${repRange.min} reps at low RIR.`,suggestedWeight:suggested};
  }
  return {kind:'hold',label:allInRange?'Add reps':'Hold and assess',headline:baseWeight?`Keep ${round(baseWeight,2)} kg`:'Repeat the previous setup',detail:`Build toward ${repRange.max} reps on every planned set before increasing load. Last: ${previousText}.`,suggestedWeight:baseWeight};
}
function applySuggestedWeight(exIndex) {
  const ex=ensureWorkoutDraft()?.exercises?.[exIndex];
  if(!ex) return;
  const suggestion=progressionSuggestion(ex);
  if(!suggestion.suggestedWeight) return showToast('No numeric load is available for this suggestion');
  ex.sets.forEach(set=>{if(!set.done&&!set.warmup)set.weightKg=suggestion.suggestedWeight;});
  saveDraft();render();showToast(`Loaded ${round(suggestion.suggestedWeight,2)} kg into unfinished sets`);
}
function previousSetText(previous) {
  if(!previous) return '—';
  const weight=toNum(previous.weightKg)>0?`${round(previous.weightKg,1)} kg`:'BW';
  const rir=previous.rir!==''&&previous.rir!==null&&previous.rir!==undefined?` @${round(previous.rir,1)}`:'';
  return `${weight} × ${round(previous.reps,0)}${rir}`;
}
function renderTrain() {
  const view=state.settings.trainView || 'workout';
  return `<div class="grid train-page">
    <div class="segmented-control" role="tablist" aria-label="Training views">
      <button class="${view==='workout'?'active':''}" onclick="setTrainView('workout')" role="tab">Workout</button>
      <button class="${view==='history'?'active':''}" onclick="setTrainView('history')" role="tab">History</button>
    </div>
    ${view==='history'?renderWorkoutHistoryView():(ensureWorkoutDraft()?renderActiveWorkout():renderWorkoutLanding())}
  </div>`;
}
function renderWorkoutLanding() {
  const program=activeProgram();
  const programs=state.programs.filter(p=>p.active!==false);
  const recommended=todayProgramSession()||nextProgramSession();
  const sessions=[...(program?.sessions||[])].sort((a,b)=>toNum(a.order)-toNum(b.order));
  const programKit=programEquipmentSummary(program);
  return `<div class="grid workout-landing">
    <section class="card highlight">
      <div class="row-head"><div><div class="small muted">Training</div><h2>Choose a workout</h2></div><span class="pill gray">Not started</span></div>
      <p class="small muted">Opening the Train tab does not start a session or its timer. Select a workout below, then tap <strong>Start workout</strong>.</p>
      <label>Program<select onchange="setActiveProgram(this.value)">${programs.map(p=>`<option value="${esc(p.id)}" ${p.id===program?.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label>
      <div class="equipment-program-panel ${programKit.issues.length?'needs-kit':'ready'}"><div><strong>${programKit.ready}/${programKit.total} exercises equipment-ready</strong><div class="tiny muted">${programKit.issues.length?'Create a matched copy or swap individual exercises.':'Your selected program matches the current equipment profile.'}</div></div><div class="button-row"><button class="ghost compact" onclick="openEquipmentManager()">Equipment</button>${programKit.issues.length?`<button class="secondary compact" onclick="openEquipmentAdaptation('${esc(program?.id||'')}')">Adapt program</button>`:''}</div></div>
    </section>
    ${sessions.length?sessions.map(session=>{
      const exercises=[...(session.exercises||[])].sort((a,b)=>toNum(a.order)-toNum(b.order));
      const totalSets=exercises.reduce((sum,ex)=>sum+toNum(ex.sets),0);
      const last=[...state.workoutSessions].filter(row=>row.programId===program.id&&row.sessionId===session.id).sort((a,b)=>String(b.date+(b.startTime||'')).localeCompare(String(a.date+(a.startTime||''))))[0];
      const isRecommended=recommended?.id===session.id;
      const issues=sessionEquipmentIssues(session);
      return `<section class="card workout-launch-card ${isRecommended?'recommended':''}">
        <div class="row-head"><div><div class="small muted">${esc(session.day||'Flexible day')}</div><h2>${esc(session.name)}</h2></div>${issues.length?`<span class="pill warn">${issues.length} kit issue${issues.length===1?'':'s'}</span>`:isRecommended?'<span class="pill good">Suggested</span>':'<span class="pill good">Ready</span>'}</div>
        <div class="workout-launch-metrics"><span>${exercises.length} exercises</span><span>${totalSets} work sets</span>${last?`<span>Last ${esc(formatDate(last.date))}</span>`:'<span>Not logged yet</span>'}</div>
        <div class="small muted workout-launch-exercises">${esc(exercises.slice(0,4).map(ex=>ex.name).join(' · '))}${exercises.length>4?' · …':''}</div>
        <button onclick="startSession('${esc(program.id)}','${esc(session.id)}')">Start workout</button>
      </section>`;
    }).join(''):`<section class="card"><div class="empty">This program has no sessions yet. Add one from the Program tab.</div></section>`}
  </div>`;
}
function renderActiveWorkout() {
  const draft=ensureWorkoutDraft();
  if(!draft) return renderWorkoutLanding();
  const options=state.programs.filter(p=>p.active!==false).flatMap(p=>(p.sessions||[]).map(s=>({value:sessionKey(p.id,s.id),label:`${p.name} — ${s.name}`})));
  const stats=workoutDraftStats(draft);
  const pct=stats.total?stats.completed/stats.total*100:0;
  const recovered=draftHasActivity(draft)&&new Date(draft.startedAt).getTime()<Date.now()-60000;
  return `<div class="grid active-workout">
    <section class="card workout-command-card highlight">
      <div class="row-head">
        <div>
          <div class="small muted">${esc(draft.programName)}</div>
          <h2>${esc(draft.sessionName)}</h2>
        </div>
        <span class="pill ${state.settings.dietMode==='RFL / PSMF'?'warn':'good'}">${esc(state.settings.dietMode==='RFL / PSMF'?'RFL preserve':'Progress')}</span>
      </div>
      <div class="workout-live-grid">
        <div><span class="tiny muted">Elapsed</span><strong data-workout-elapsed>00:00</strong></div>
        <div><span class="tiny muted">Completed</span><strong data-workout-count>${stats.completed}/${stats.total}</strong></div>
        <div><span class="tiny muted">Volume</span><strong id="liveWorkoutVolume">${round(stats.volume/1000,1)} t</strong></div>
      </div>
      <div class="progress workout-progress"><span data-workout-progress style="width:${clamp(pct,0,100)}%"></span></div>
      <div class="workout-meta-line"><span id="draftSaveStatus">Saved on phone</span>${recovered?'<span class="pill gray">Draft recovered</span>':''}</div>
      <div class="button-row">
        <button class="secondary compact" onclick="scrollToNextIncompleteSet()">Next set</button>
        <button class="ghost compact" onclick="openWorkoutOptions()">Workout options</button>
      </div>
      <details class="session-details">
        <summary>Session details and notes</summary>
        <label>Session<select onchange="changeTrainSession(this.value)">${options.map(o=>`<option value="${esc(o.value)}" ${o.value===sessionKey(draft.programId,draft.sessionId)?'selected':''}>${esc(o.label)}</option>`).join('')}</select></label>
        <div class="split">
          <label>Date<input type="date" value="${esc(draft.date)}" oninput="updateDraftField('date',this.value)"></label>
          <label>Body weight kg<input type="number" step="0.1" inputmode="decimal" value="${esc(draft.bodyWeightKg)}" oninput="updateDraftField('bodyWeightKg',this.value)"></label>
        </div>
        <label>Session notes<textarea oninput="updateDraftField('notes',this.value)" placeholder="Energy, pain, equipment changes...">${esc(draft.notes||'')}</textarea></label>
      </details>
    </section>

    ${draft.exercises.map((ex,exIndex)=>renderWorkoutExercise(ex,exIndex)).join('')}

    <section class="card add-exercise-card">
      <div class="row-head"><div><strong>Need another movement?</strong><div class="small muted">Add it to this workout without changing the saved program.</div></div><button class="secondary compact" onclick="openAddDraftExercise()">＋ Exercise</button></div>
    </section>

    <section class="card">
      <div class="button-row">
        <button onclick="openFinishWorkout()">Review and finish</button>
        <button class="ghost" onclick="resetWorkoutDraft()">Restart session</button>
      </div>
      <div class="small muted" style="margin-top:8px">Your draft saves after every field change and set completion. Only sets with repetitions are written to workout history.</div>
    </section>

    <div class="workout-finish-bar">
      <div><strong><span data-workout-count>${stats.completed}/${stats.total}</span> sets</strong><div class="tiny muted"><span data-workout-elapsed>00:00</span> elapsed</div></div>
      <button onclick="openFinishWorkout()">Finish workout</button>
    </div>
  </div>`;
}
function renderWorkoutExercise(ex, exIndex) {
  const history=exerciseHistory(ex.name,ex.exerciseId,3);
  const last=history[0];
  const best=workoutBest(ex.name);
  const suggestion=progressionSuggestion(ex);
  const allDone=ex.sets.filter(set=>!set.warmup).length>0&&ex.sets.filter(set=>!set.warmup).every(set=>set.done);
  const substitution=ex.originalName?`Substituted for ${ex.originalName}${ex.substitutionReason?` · ${ex.substitutionReason}`:''}`:'';
  return `<section id="workout-exercise-${exIndex}" class="card workout-exercise-card ${allDone?'complete':''}">
    <div class="exercise-card-header">
      <div class="exercise-title-block">
        <div class="exercise-number">${exIndex+1}</div>
        <div><h3>${esc(ex.name)}</h3><div class="small muted">${esc(ex.targetSets)} × ${esc(ex.targetReps)} · RIR ${esc(ex.targetRir)}</div>${substitution?`<div class="tiny substitution-note">${esc(substitution)}</div>`:''}</div>
      </div>
      <div class="exercise-top-actions">
        <button class="ghost compact" onclick="openWorkoutSubstitute(${exIndex})">Swap</button>
        <button class="ghost compact" onclick="toggleExerciseCollapse(${exIndex})" aria-label="${ex.collapsed?'Expand':'Collapse'} exercise">${ex.collapsed?'＋':'−'}</button>
      </div>
    </div>
    ${ex.collapsed?`<div class="collapsed-exercise-summary"><span>${ex.sets.filter(set=>!set.warmup&&set.done).length}/${ex.sets.filter(set=>!set.warmup).length} complete</span><button class="secondary compact" onclick="toggleExerciseCollapse(${exIndex})">Open</button></div>`:`
      <div class="progression-suggestion ${esc(suggestion.kind)}">
        <div><span class="suggestion-label">${esc(suggestion.label)}</span><strong>${esc(suggestion.headline)}</strong><div class="tiny">${esc(suggestion.detail)}</div></div>
        ${suggestion.suggestedWeight?`<button class="secondary compact" onclick="applySuggestedWeight(${exIndex})">Apply</button>`:''}
      </div>
      <details class="previous-performance" ${last?'':'hidden'}>
        <summary><span>Previous performance${last?.session?.date?` · ${esc(formatDate(last.session.date,{day:'numeric',month:'short',year:'numeric'}))}`:''}</span>${best?.estimated1RM?`<span class="pill gray">Best e1RM ${round(best.estimated1RM,1)} kg</span>`:''}</summary>
        ${history.map(item=>`<div class="previous-session-row"><span>${esc(formatDate(item.session.date,{day:'numeric',month:'short'}))}</span><strong>${item.sets.map(set=>`${round(set.weightKg,1)}×${round(set.reps,0)}${set.rir!==''&&set.rir!==undefined?` @${round(set.rir,1)}`:''}`).join(' · ')}</strong></div>`).join('')}
      </details>
      <div class="workout-set-head"><span>Set</span><span>Previous</span><span>kg</span><span>Reps</span><span>RIR</span><span></span></div>
      <div class="workout-set-list">
        ${ex.sets.map((set,setIndex)=>`<div id="workout-set-${exIndex}-${setIndex}" class="workout-set-row ${set.done?'done':''} ${set.warmup?'warmup':''}" data-done="${set.done}">
          <button type="button" class="set-badge" onclick="toggleWarmup(${exIndex},${setIndex})" title="Toggle warm-up set">${set.warmup?'W':setIndex+1}</button>
          <div class="previous-cell">${esc(previousSetText(set.previous))}</div>
          <input aria-label="Weight kg" type="number" step="0.25" inputmode="decimal" value="${esc(set.weightKg)}" oninput="updateDraftSet(${exIndex},${setIndex},'weightKg',this.value)">
          <input id="set-reps-${exIndex}-${setIndex}" aria-label="Repetitions" type="number" step="1" inputmode="numeric" value="${esc(set.reps)}" oninput="updateDraftSet(${exIndex},${setIndex},'reps',this.value)">
          <input aria-label="Repetitions in reserve" type="number" step="0.5" inputmode="decimal" value="${esc(set.rir)}" oninput="updateDraftSet(${exIndex},${setIndex},'rir',this.value)">
          <button type="button" class="set-done ${set.done?'done':''}" onclick="toggleSetDone(${exIndex},${setIndex})" aria-label="${set.done?'Mark set incomplete':'Complete set'}">${set.done?'✓':'○'}</button>
        </div>`).join('')}
      </div>
      <div class="exercise-footer-actions">
        <div class="button-row"><button class="secondary compact" onclick="addDraftSet(${exIndex})">＋ Set</button>${ex.sets.length>1?`<button class="ghost compact" onclick="removeDraftSet(${exIndex},${ex.sets.length-1})">Remove last</button>`:''}<button class="ghost compact" onclick="startExerciseRestTimer(${exIndex})">⏱ ${toNum(ex.restSec)||120}s</button></div>
        <details><summary>Notes and exercise actions</summary><label>Exercise notes<textarea oninput="updateDraftExerciseNote(${exIndex},this.value)" placeholder="Technique, pain, tempo...">${esc(ex.notes||'')}</textarea></label><div class="button-row">${ex.originalName?`<button class="secondary compact" onclick="restoreOriginalDraftExercise(${exIndex})">Restore ${esc(ex.originalName)}</button>`:''}<button class="danger compact" onclick="removeDraftExercise(${exIndex})">Remove exercise</button></div></details>
      </div>
    `}
  </section>`;
}
function openWorkoutOptions() {
  showModal(`<div class="card-title"><span>Workout options</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="list">
      <label class="row inline-check"><input id="optionAutoRest" type="checkbox" ${state.settings.autoRestTimer!==false?'checked':''}> Start rest timer after completed work sets</label>
      <label class="row inline-check"><input id="optionSound" type="checkbox" ${state.settings.restTimerSound!==false?'checked':''}> Sound and vibrate when rest finishes</label>
      <label class="row inline-check"><input id="optionAdvance" type="checkbox" ${state.settings.autoAdvanceSets!==false?'checked':''}> Move to the next incomplete set</label>
      <div class="triple"><label>Barbell/standard kg<input id="optionIncrement" type="number" step="0.25" value="${esc(state.settings.weightIncrementKg)}"></label><label>Dumbbell kg<input id="optionDumbbellIncrement" type="number" step="0.25" value="${esc(state.settings.dumbbellWeightIncrementKg)}"></label><label>Small/isolation kg<input id="optionSmallIncrement" type="number" step="0.25" value="${esc(state.settings.smallWeightIncrementKg)}"></label></div>
      <label>Default rest timer seconds<input id="optionRestDefault" type="number" step="15" value="${esc(state.settings.restTimerDefaultSec)}"></label>
      <button onclick="saveWorkoutOptions()">Save workout options</button>
    </div>`);
}
function saveWorkoutOptions() {
  state.settings.autoRestTimer=Boolean(document.getElementById('optionAutoRest')?.checked);
  state.settings.restTimerSound=Boolean(document.getElementById('optionSound')?.checked);
  state.settings.autoAdvanceSets=Boolean(document.getElementById('optionAdvance')?.checked);
  state.settings.weightIncrementKg=Math.max(.25,toNum(document.getElementById('optionIncrement')?.value)||2.5);
  state.settings.dumbbellWeightIncrementKg=Math.max(.25,toNum(document.getElementById('optionDumbbellIncrement')?.value)||2);
  state.settings.smallWeightIncrementKg=Math.max(.25,toNum(document.getElementById('optionSmallIncrement')?.value)||1);
  state.settings.restTimerDefaultSec=Math.max(15,toNum(document.getElementById('optionRestDefault')?.value)||120);
  saveState();closeModal();render();showToast('Workout options saved');
}
function draftAlternativeList(ex) {
  const slot={name:ex.name,exerciseId:ex.exerciseId};
  return alternativesForSlot(slot);
}
function openWorkoutSubstitute(exIndex) {
  const ex=ensureWorkoutDraft()?.exercises?.[exIndex];
  if(!ex) return;
  if(ex.sets.some(set=>set.done||toNum(set.reps)>0)) return showToast('Substitute before entering sets for this exercise');
  showModal(`<div class="card-title"><span>Swap ${esc(ex.name)}</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <label>Reason<select id="draftSwapReason">${['Preference','Equipment unavailable','Lower-back discomfort','Joint discomfort','Fatigue / recovery','Variation'].map(reason=>`<option>${reason}</option>`).join('')}</select></label>
    <label>Search exercise cache<input id="draftSwapSearch" type="search" placeholder="Exercise, muscle, pattern, equipment" oninput="renderDraftSwapList(${exIndex})"></label>
    <label class="inline-check"><input id="draftSwapAvailable" type="checkbox" checked onchange="renderDraftSwapList(${exIndex})"> Compatible equipment only</label>
    <label class="inline-check"><input id="draftSwapPermanent" type="checkbox"> Also replace this slot in the saved program</label>
    <div id="draftSwapList" class="list" style="margin-top:10px">${draftSwapListHtml(exIndex,draftAlternativeList(ex).filter(exerciseAvailable))}</div>
    <hr class="divider"><label>Custom exercise name<input id="draftCustomSwapName" placeholder="Enter a movement"></label><button class="secondary" onclick="applyCustomDraftSwap(${exIndex})">Use custom exercise</button>`);
}
function draftSwapListHtml(exIndex,list) {
  if(!list.length) return `<div class="empty">No compatible alternatives. Show all equipment, edit your equipment profile, or use a custom name.</div>`;
  return list.slice(0,80).map(ex=>`<div class="row"><div class="row-head"><div><strong>${esc(ex.name)}</strong><div class="small muted">${esc(ex.muscle||'')} · ${esc(ex.pattern||'')}</div></div><span class="pill ${exerciseAvailable(ex)?'good':'warn'}">${esc(exerciseAvailable(ex)?'Equipment ready':missingEquipmentText(ex))}</span></div><div class="tiny muted">${esc(ex.equipment||equipmentOptionsText(ex.equipmentOptions))}</div><div class="tiny muted">${esc(ex.notes||'')}</div><button class="secondary compact" onclick="applyDraftSwap(${exIndex},'${esc(ex.id)}')">Choose</button></div>`).join('');
}
function renderDraftSwapList(exIndex) {
  const ex=ensureWorkoutDraft()?.exercises?.[exIndex]; if(!ex) return;
  const q=(document.getElementById('draftSwapSearch')?.value||'').toLowerCase().trim();
  const availableOnly=document.getElementById('draftSwapAvailable')?.checked;
  let list=q?state.exercises.filter(item=>`${item.name} ${item.muscle} ${item.pattern} ${item.equipment} ${item.notes}`.toLowerCase().includes(q)):draftAlternativeList(ex);
  if(availableOnly)list=list.filter(exerciseAvailable);
  list.sort((a,b)=>Number(exerciseAvailable(b))-Number(exerciseAvailable(a))||a.name.localeCompare(b.name));
  const holder=document.getElementById('draftSwapList');if(holder)holder.innerHTML=draftSwapListHtml(exIndex,list);
}
function applyDraftSwap(exIndex,exerciseId) {
  const exercise=state.exercises.find(item=>item.id===exerciseId);
  if(!exercise) return;
  performDraftSwap(exIndex,exercise);
}
function applyCustomDraftSwap(exIndex) {
  const name=(document.getElementById('draftCustomSwapName')?.value||'').trim();
  if(!name) return showToast('Enter an exercise name');
  performDraftSwap(exIndex,{id:'',name,muscle:'',pattern:'',equipment:''});
}
function performDraftSwap(exIndex,exercise) {
  const draft=ensureWorkoutDraft();
  const ex=draft?.exercises?.[exIndex];
  if(!ex||ex.sets.some(set=>set.done||toNum(set.reps)>0)) return showToast('Substitute before entering sets for this exercise');
  const reason=document.getElementById('draftSwapReason')?.value||'Preference';
  const permanent=Boolean(document.getElementById('draftSwapPermanent')?.checked);
  ex.originalName ||= ex.name;
  ex.originalExerciseId ||= ex.exerciseId;
  ex.name=exercise.name;
  ex.exerciseId=exercise.id||'';
  ex.substitutionReason=reason;
  const previous=exerciseHistory(ex.name,ex.exerciseId,1)[0]?.sets||[];
  ex.sets.forEach((set,index)=>{
    const prior=previous[index]||previous[previous.length-1];
    set.weightKg=prior?.weightKg??'';set.reps='';set.rir='';set.done=false;
    set.previous=prior?{weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir}:null;
  });
  if(permanent){
    const {program,session}=getSession(draft.programId,draft.sessionId);
    const slot=session?.exercises?.find(item=>item.id===ex.slotId);
    if(slot){slot.name=exercise.name;slot.exerciseId=exercise.id||'';markUpdated(slot);markUpdated(session);markUpdated(program);saveState();}
  }
  saveDraft();closeModal();render();showToast(permanent?'Exercise changed for this workout and program':'Exercise changed for this workout');
}
function restoreOriginalDraftExercise(exIndex) {
  const ex=ensureWorkoutDraft()?.exercises?.[exIndex];
  if(!ex?.originalName) return;
  if(ex.sets.some(set=>set.done||toNum(set.reps)>0)) return showToast('Restore before entering sets for this exercise');
  const name=ex.originalName,id=ex.originalExerciseId;
  ex.name=name;ex.exerciseId=id;ex.originalName='';ex.originalExerciseId='';ex.substitutionReason='';
  const previous=exerciseHistory(name,id,1)[0]?.sets||[];
  ex.sets.forEach((set,index)=>{const prior=previous[index]||previous[previous.length-1];set.weightKg=prior?.weightKg??'';set.reps='';set.rir='';set.done=false;set.previous=prior?{weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir}:null;});
  saveDraft();render();showToast('Original exercise restored');
}
function openAddDraftExercise() {
  showModal(`<div class="card-title"><span>Add exercise to this workout</span><button class="ghost compact" onclick="closeModal()">Close</button></div><label>Search exercise cache<input id="draftAddSearch" type="search" placeholder="Exercise, muscle, pattern" oninput="renderDraftAddList()"></label><label class="inline-check"><input id="draftAddAvailable" type="checkbox" checked onchange="renderDraftAddList()"> Compatible equipment only</label><div id="draftAddList" class="list" style="margin-top:10px">${draftAddListHtml(state.exercises.filter(exerciseAvailable).slice(0,50))}</div><hr class="divider"><label>Custom exercise<input id="draftAddCustom" placeholder="Exercise name"></label><button class="secondary" onclick="addCustomDraftExercise()">Add custom exercise</button>`);
}
function draftAddListHtml(list) {
  if(!list.length)return `<div class="empty">No matching exercises.</div>`;
  return list.slice(0,80).map(ex=>`<div class="row"><div class="row-head"><div><strong>${esc(ex.name)}</strong><div class="small muted">${esc(ex.muscle||'')} · ${esc(ex.pattern||'')}</div></div><button class="secondary compact" onclick="addDraftExercise('${esc(ex.id)}')">Add</button></div></div>`).join('');
}
function renderDraftAddList() {
  const q=(document.getElementById('draftAddSearch')?.value||'').toLowerCase().trim();
  const availableOnly=document.getElementById('draftAddAvailable')?.checked;
  let list=state.exercises.filter(ex=>!q||`${ex.name} ${ex.muscle} ${ex.pattern} ${ex.equipment}`.toLowerCase().includes(q));
  if(availableOnly)list=list.filter(exerciseAvailable);
  list.sort((a,b)=>Number(exerciseAvailable(b))-Number(exerciseAvailable(a))||a.name.localeCompare(b.name));
  const holder=document.getElementById('draftAddList');if(holder)holder.innerHTML=draftAddListHtml(list);
}
function addDraftExercise(exerciseId) {
  const exercise=state.exercises.find(ex=>ex.id===exerciseId);if(!exercise)return;
  appendDraftExercise(exercise);
}
function addCustomDraftExercise() {
  const name=(document.getElementById('draftAddCustom')?.value||'').trim();if(!name)return showToast('Enter an exercise name');
  appendDraftExercise({id:'',name});
}
function appendDraftExercise(exercise) {
  const draft=ensureWorkoutDraft();
  const previous=exerciseHistory(exercise.name,exercise.id||'',1)[0]?.sets||[];
  const targetSets=3;
  draft.exercises.push({slotId:uid('draftslot'),exerciseId:exercise.id||'',name:exercise.name,originalName:'',originalExerciseId:'',substitutionReason:'',targetSets,targetReps:'8-12',targetRir:state.settings.dietMode==='RFL / PSMF'?'2-3':'1-2',restSec:toNum(state.settings.restTimerDefaultSec)||120,notes:'Added for this workout',collapsed:false,sets:Array.from({length:targetSets},(_,index)=>{const prior=previous[index]||previous[previous.length-1];return{id:uid('draftset'),setNo:index+1,warmup:false,weightKg:prior?.weightKg??'',reps:'',rir:'',done:false,previous:prior?{weightKg:prior.weightKg,reps:prior.reps,rir:prior.rir}:null};})});
  saveDraft();closeModal();render();setTimeout(()=>document.getElementById(`workout-exercise-${draft.exercises.length-1}`)?.scrollIntoView({behavior:'smooth',block:'start'}),80);showToast('Exercise added to this workout');
}
function removeDraftExercise(exIndex) {
  const draft=ensureWorkoutDraft();const ex=draft?.exercises?.[exIndex];if(!ex)return;
  if(ex.sets.some(set=>set.done||toNum(set.reps)>0)&&!confirm(`Remove ${ex.name} and its entered sets from this workout?`))return;
  draft.exercises.splice(exIndex,1);saveDraft();render();showToast('Exercise removed from this workout');
}
function openFinishWorkout() {
  const draft=ensureWorkoutDraft();const stats=workoutDraftStats(draft);
  if(!stats.entered&&!draft.exercises.some(ex=>ex.sets.some(set=>set.warmup&&toNum(set.reps)>0)))return showToast('Enter at least one completed set first');
  const elapsed=Math.max(1,Math.round((Date.now()-new Date(draft.startedAt).getTime())/60000));
  showModal(`<div class="card-title"><span>Finish ${esc(draft.sessionName)}</span><button class="ghost compact" onclick="closeModal()">Keep training</button></div><div class="finish-summary-grid"><div><span>Work sets</span><strong>${stats.entered}</strong></div><div><span>Checked complete</span><strong>${stats.completed}/${stats.total}</strong></div><div><span>Duration</span><strong>${elapsed} min</strong></div><div><span>Volume</span><strong>${round(stats.volume/1000,1)} t</strong></div></div>${stats.incomplete?`<div class="notice warn">${stats.incomplete} planned work set${stats.incomplete===1?' is':'s are'} not checked complete. Sets with repetitions will still be saved.</div>`:''}<div class="button-row" style="margin-top:12px"><button onclick="saveWorkout()">Finish and save</button><button class="danger" onclick="closeModal();discardWorkoutDraft()">Discard workout</button></div>`);
}
function discardWorkoutDraft() {
  if(!confirm('Discard this workout draft permanently?'))return;
  workoutDraft=null;saveDraft();render();showToast('Workout discarded');
}
function calculateE1RM(weight, reps) {
  const w=toNum(weight), r=toNum(reps);
  if (!w || !r) return 0;
  return r <= 15 ? w * (1 + r/30) : w;
}
function saveWorkout() {
  const draft=ensureWorkoutDraft();
  const setRows=[];
  draft.exercises.forEach(ex=>{
    ex.sets.forEach((set,index)=>{
      const reps=toNum(set.reps);if(reps<=0)return;
      const weight=toNum(set.weightKg);
      const substitution=ex.originalName?`Substituted for ${ex.originalName}${ex.substitutionReason?` (${ex.substitutionReason})`:''}. `:'';
      setRows.push({id:uid('set'),sessionLogId:'',date:draft.date||localDateISO(),programId:draft.programId,session:draft.sessionName,exerciseId:ex.exerciseId||'',exercise:ex.name,setNo:index+1,warmup:Boolean(set.warmup),weightKg:weight,reps,rir:numOrBlank(set.rir),restSec:toNum(ex.restSec),volumeKg:weight*reps,estimated1RM:calculateE1RM(weight,reps),notes:`${substitution}${ex.notes||''}`.trim(),updatedAt:nowISO()});
    });
  });
  if(!setRows.length)return showToast('Enter repetitions for at least one set');
  const priorBests={};[...new Set(setRows.map(row=>row.exercise))].forEach(name=>priorBests[name]=toNum(workoutBest(name)?.estimated1RM));
  const end=new Date(),start=new Date(draft.startedAt||end);
  const substitutions=draft.exercises.filter(ex=>ex.originalName).map(ex=>`${ex.originalName} → ${ex.name}${ex.substitutionReason?` (${ex.substitutionReason})`:''}`);
  const sessionNotes=[draft.notes||'',substitutions.length?`Substitutions: ${substitutions.join('; ')}`:''].filter(Boolean).join(' | ');
  const sessionLog={id:uid('workout'),date:draft.date||localDateISO(),programId:draft.programId,programName:draft.programName,sessionId:draft.sessionId,sessionName:draft.sessionName,startTime:String(draft.startedAt||'').slice(11,16),endTime:localDateTimeISO(end).slice(11,16),durationMin:Math.max(1,Math.round((end-start)/60000)),bodyWeightKg:numOrBlank(draft.bodyWeightKg),notes:sessionNotes,completed:true,updatedAt:nowISO()};
  setRows.forEach(row=>row.sessionLogId=sessionLog.id);
  state.workoutSessions.push(sessionLog);state.workoutLogs.push(...setRows);
  const prs=[...new Set(setRows.filter(row=>!row.warmup&&row.estimated1RM>(priorBests[row.exercise]||0)).map(row=>row.exercise))];
  saveState();
  workoutDraft=null;saveDraft();closeModal();render();
  const workSets=setRows.filter(row=>!row.warmup);const volume=workSets.reduce((sum,row)=>sum+toNum(row.volumeKg),0);
  showModal(`<div class="workout-complete-modal"><div class="completion-mark">✓</div><h2>Workout saved</h2><div class="small muted">${esc(sessionLog.sessionName)} · ${sessionLog.durationMin} min</div><div class="finish-summary-grid"><div><span>Work sets</span><strong>${workSets.length}</strong></div><div><span>Volume</span><strong>${round(volume/1000,1)} t</strong></div><div><span>Exercises</span><strong>${new Set(workSets.map(row=>row.exercise)).size}</strong></div><div><span>New bests</span><strong>${prs.length}</strong></div></div>${prs.length?`<div class="notice good"><strong>New estimated best:</strong> ${esc(prs.slice(0,4).join(', '))}${prs.length>4?'…':''}</div>`:''}<div class="button-row"><button onclick="closeModal();setTrainView('history')">View history</button><button class="secondary" onclick="closeModal()">Done</button></div></div>`);
}
function workoutsInLastDays(days=30) {
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-(days-1));const iso=localDateISO(cutoff);
  return state.workoutSessions.filter(session=>session.date>=iso&&session.completed!==false);
}
function renderWorkoutHistoryView() {
  const sessions=[...state.workoutSessions].sort((a,b)=>String(b.date+(b.startTime||'')).localeCompare(String(a.date+(a.startTime||''))));
  const recentIds=new Set(workoutsInLastDays(30).map(session=>session.id));
  const recentSets=state.workoutLogs.filter(row=>recentIds.has(row.sessionLogId)&&!row.warmup);
  const recentVolume=recentSets.reduce((sum,row)=>sum+toNum(row.volumeKg),0);
  return `<div class="grid workout-history-view"><section class="card"><div class="card-title"><span>Workout history</span><span class="pill gray">${state.workoutSessions.length} sessions</span></div><label>Search<input id="workoutHistorySearch" type="search" placeholder="Session, program, exercise, date..." oninput="renderWorkoutHistoryList()"></label><div class="history-stats"><div><span>30-day sessions</span><strong>${recentIds.size}</strong></div><div><span>Work sets</span><strong>${recentSets.length}</strong></div><div><span>Volume</span><strong>${round(recentVolume/1000,1)} t</strong></div></div></section><section class="card"><div class="card-title"><span>Sessions</span><button class="ghost compact" onclick="exportCSV('workoutSessions')">Export CSV</button></div><div id="workoutHistoryList" class="list">${workoutHistoryListHtml(sessions)}</div></section></div>`;
}
function workoutHistoryListHtml(sessions) {
  if(!sessions.length)return `<div class="empty">No workouts match this search.</div>`;
  return sessions.slice(0,250).map(renderWorkoutHistoryRow).join('');
}
function renderWorkoutHistoryList() {
  const q=(document.getElementById('workoutHistorySearch')?.value||'').toLowerCase().trim();
  const sessions=[...state.workoutSessions].sort((a,b)=>String(b.date+(b.startTime||'')).localeCompare(String(a.date+(a.startTime||'')))).filter(session=>{
    if(!q)return true;
    const exercises=state.workoutLogs.filter(row=>row.sessionLogId===session.id).map(row=>row.exercise).join(' ');
    return `${session.date} ${session.sessionName} ${session.programName||session.programId} ${session.notes||''} ${exercises}`.toLowerCase().includes(q);
  });
  const holder=document.getElementById('workoutHistoryList');if(holder)holder.innerHTML=workoutHistoryListHtml(sessions);
}
function renderWorkoutHistoryRow(session) {
  const sets=state.workoutLogs.filter(row=>row.sessionLogId===session.id);
  const workSets=sets.filter(row=>!row.warmup);
  const volume=workSets.reduce((sum,row)=>sum+toNum(row.volumeKg),0);
  const exercises=new Set(workSets.map(row=>row.exercise)).size;
  return `<article class="row workout-history-row"><div class="row-head"><div><strong>${esc(session.sessionName)}</strong><div class="small muted">${esc(session.programName||session.programId)} · ${exercises} exercises · ${workSets.length} work sets</div></div><span class="pill gray">${esc(formatDate(session.date,{day:'numeric',month:'short',year:'numeric'}))}</span></div><div class="history-row-metrics"><span>⏱ ${round(session.durationMin,0)||'—'} min</span><span>↗ ${round(volume/1000,1)} t</span>${session.bodyWeightKg?`<span>⚖ ${round(session.bodyWeightKg,1)} kg</span>`:''}</div><div class="button-row"><button class="secondary compact" onclick="viewWorkout('${esc(session.id)}')">View</button><button class="ghost compact" onclick="repeatWorkout('${esc(session.id)}')">Repeat</button><button class="ghost compact" onclick="openEditWorkoutSession('${esc(session.id)}')">Edit</button><button class="danger compact" onclick="deleteWorkoutSession('${esc(session.id)}')">Delete</button></div></article>`;
}
function viewWorkout(id) {
  const session=state.workoutSessions.find(item=>item.id===id);if(!session)return;
  const rows=state.workoutLogs.filter(row=>row.sessionLogId===id);
  const order=[];const grouped={};
  rows.forEach(row=>{if(!grouped[row.exercise]){grouped[row.exercise]=[];order.push(row.exercise);}grouped[row.exercise].push(row);});
  const workSets=rows.filter(row=>!row.warmup);const volume=workSets.reduce((sum,row)=>sum+toNum(row.volumeKg),0);
  showModal(`<div class="card-title"><span>${esc(session.sessionName)}</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="small muted">${esc(formatDate(session.date,{day:'numeric',month:'long',year:'numeric'}))} · ${round(session.durationMin,0)} min · ${round(volume/1000,1)} t</div>${session.notes?`<div class="notice" style="margin-top:10px">${esc(session.notes)}</div>`:''}<div class="list" style="margin-top:10px">${order.map(name=>`<div class="row"><div class="row-head"><strong>${esc(name)}</strong><span class="pill gray">${grouped[name].filter(row=>!row.warmup).length} sets</span></div><table class="history-table"><thead><tr><th>Set</th><th>kg</th><th>Reps</th><th>RIR</th><th>e1RM</th></tr></thead><tbody>${grouped[name].sort((a,b)=>toNum(a.setNo)-toNum(b.setNo)).map(row=>`<tr><td>${row.warmup?'W':esc(row.setNo)}</td><td>${round(row.weightKg,1)}</td><td>${round(row.reps,0)}</td><td>${esc(row.rir)}</td><td>${row.estimated1RM?round(row.estimated1RM,1):'—'}</td></tr>`).join('')}</tbody></table>${grouped[name][0]?.notes?`<div class="tiny muted">${esc(grouped[name][0].notes)}</div>`:''}</div>`).join('')}</div><div class="button-row" style="margin-top:12px"><button class="secondary" onclick="closeModal();repeatWorkout('${esc(session.id)}')">Repeat workout</button><button class="ghost" onclick="closeModal();openEditWorkoutSession('${esc(session.id)}')">Edit details</button></div>`);
}
function openEditWorkoutSession(id) {
  const session=state.workoutSessions.find(item=>item.id===id);if(!session)return;
  showModal(`<div class="card-title"><span>Edit workout details</span><button class="ghost compact" onclick="closeModal()">Close</button></div><form onsubmit="saveWorkoutSessionEdit(event,'${esc(id)}')"><div class="split"><label>Date<input id="editWorkoutDate" type="date" value="${esc(session.date)}"></label><label>Body weight kg<input id="editWorkoutWeight" type="number" step="0.1" value="${esc(session.bodyWeightKg)}"></label></div><label>Session notes<textarea id="editWorkoutNotes">${esc(session.notes||'')}</textarea></label><button type="submit">Save changes</button></form>`);
}
function saveWorkoutSessionEdit(event,id) {
  event.preventDefault();const session=state.workoutSessions.find(item=>item.id===id);if(!session)return;
  const oldDate=session.date;session.date=document.getElementById('editWorkoutDate').value||oldDate;session.bodyWeightKg=numOrBlank(document.getElementById('editWorkoutWeight').value);session.notes=document.getElementById('editWorkoutNotes').value.trim();markUpdated(session);
  if(session.date!==oldDate)state.workoutLogs.filter(row=>row.sessionLogId===id).forEach(row=>{row.date=session.date;markUpdated(row);});
  saveState();closeModal();render();showToast('Workout details updated');
}
function repeatWorkout(id) {
  const past=state.workoutSessions.find(item=>item.id===id);if(!past)return;
  const {program,session}=getSession(past.programId,past.sessionId);
  if(program&&session)return startSession(program.id,session.id);
  showToast('That original program session is no longer available');
}
function deleteWorkoutSession(id) {
  if(!confirm('Delete this workout and all its sets?'))return;
  state.workoutSessions=state.workoutSessions.filter(item=>item.id!==id);state.workoutLogs=state.workoutLogs.filter(item=>item.sessionLogId!==id);saveState();render();showToast('Workout deleted');
}
function startExerciseRestTimer(exIndex) {
  const ex=ensureWorkoutDraft()?.exercises?.[exIndex];if(!ex)return;startRestTimer(ex.restSec,ex.name);
}
function primeTimerAudio() {
  if(state.settings.restTimerSound===false)return;
  try{timerAudioContext ||= new (window.AudioContext||window.webkitAudioContext)();if(timerAudioContext.state==='suspended')timerAudioContext.resume();}catch{}
}
function playTimerSound() {
  if(state.settings.restTimerSound===false)return;
  try{
    primeTimerAudio();if(!timerAudioContext)return;
    const oscillator=timerAudioContext.createOscillator(),gain=timerAudioContext.createGain();
    oscillator.frequency.setValueAtTime(880,timerAudioContext.currentTime);gain.gain.setValueAtTime(.001,timerAudioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.18,timerAudioContext.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.001,timerAudioContext.currentTime+.35);oscillator.connect(gain).connect(timerAudioContext.destination);oscillator.start();oscillator.stop(timerAudioContext.currentTime+.38);
  }catch{}
}
function startRestTimer(seconds,label='Rest timer') {
  restTimerSeconds=Math.max(1,toNum(seconds)||120);restTimerEndAt=Date.now()+restTimerSeconds*1000;restTimerLabel=label||'Rest timer';primeTimerAudio();
  clearInterval(restTimerInterval);updateRestTimerDisplay();
  const panel=document.getElementById('restTimer');if(panel)panel.hidden=false;
  restTimerInterval=setInterval(updateRestTimerDisplay,250);
}
function updateRestTimerDisplay() {
  if(restTimerEndAt)restTimerSeconds=Math.max(0,Math.ceil((restTimerEndAt-Date.now())/1000));
  const m=Math.floor(Math.max(0,restTimerSeconds)/60),s=Math.max(0,restTimerSeconds)%60;
  const value=document.getElementById('restTimerValue'),label=document.getElementById('restTimerLabel');
  if(value)value.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if(label)label.textContent=restTimerLabel;
  if(restTimerEndAt&&restTimerSeconds<=0){
    clearInterval(restTimerInterval);restTimerInterval=null;restTimerEndAt=0;playTimerSound();if(navigator.vibrate&&state.settings.restTimerSound!==false)navigator.vibrate([200,100,200]);showToast('Rest complete');setTimeout(stopRestTimer,1400);
  }
}
function adjustRestTimer(seconds) {
  if(!restTimerEndAt){restTimerEndAt=Date.now();}
  restTimerEndAt=Math.max(Date.now(),restTimerEndAt+seconds*1000);restTimerSeconds=Math.max(0,Math.ceil((restTimerEndAt-Date.now())/1000));updateRestTimerDisplay();
}
function stopRestTimer() {
  clearInterval(restTimerInterval);restTimerInterval=null;restTimerEndAt=0;restTimerSeconds=0;
  const el=document.getElementById('restTimer');if(el)el.hidden=true;
}

function perServing(recipe, key) {
  const servings = Math.max(1,toNum(recipe.servings));
  const map = {kcal:'totalKcal',protein:'protein',carbs:'carbs',fat:'fat'};
  return toNum(recipe[map[key]]) / servings;
}
function recipeById(id) { return state.recipes.find(r=>r.id===id); }
function renderDiet() {
  const totals = foodTotals(selectedDietDate);
  const t = targets();
  const rows = state.foodLog.filter(x=>x.date===selectedDietDate).sort((a,b)=>String(a.meal).localeCompare(String(b.meal)));
  const recipes = [...state.recipes].sort((a,b)=>Number(Boolean(b.favourite))-Number(Boolean(a.favourite)) || a.name.localeCompare(b.name));
  const reviewCount=recipes.filter(r=>r.importStatus==='Needs review'||r.nutritionConfidence==='Low').length;
  return `<div class="grid">
    <div class="card highlight">
      <div class="card-title"><span>Food diary</span><span class="pill ${state.settings.dietMode==='RFL / PSMF'?'warn':''}">${esc(state.settings.dietMode)}</span></div>
      <label>Date<input type="date" value="${esc(selectedDietDate)}" onchange="selectedDietDate=this.value;render()"></label>
      <div class="stack" style="margin-top:10px">
        ${progressBar('Calories',totals.kcal,t.kcal,' kcal')}
        ${progressBar('Protein',totals.protein,t.protein,' g')}
        <div class="split">${progressBar('Carbs',totals.carbs,t.carbs,' g')}${progressBar('Fat',totals.fat,t.fat,' g')}</div>
      </div>
      <div class="button-row" style="margin-top:10px">
        <button onclick="openAddFood()">Log food</button>
        <button class="secondary" onclick="openRecipeBuilder()">Add recipe</button>
        <button class="secondary" onclick="openRecipeImportHub()">Import recipe</button>
        <button class="ghost" onclick="copyPreviousDay()">Copy yesterday</button>
      </div>
      ${state.settings.dietMode==='RFL / PSMF'?`<div class="notice warn" style="margin-top:10px">Use the targets, free-meal/refeed schedule, essential fats, vegetables, fluids, and electrolytes specified by your RFL edition. The app deliberately does not calculate them for you.</div>`:''}
    </div>

    <div class="card">
      <div class="card-title"><span>${esc(formatDate(selectedDietDate,{weekday:'long',day:'numeric',month:'short'}))}</span><span class="pill gray">${rows.length} entries</span></div>
      ${rows.length ? `<div class="list">${rows.map(row=>`<div class="row">
        <div class="row-head"><div><strong>${esc(row.itemName || row.recipeName)}</strong><div class="small muted">${esc(row.meal)} · ${round(row.servings,2)} serving${toNum(row.servings)===1?'':'s'}</div></div><button class="danger compact" onclick="deleteFood('${esc(row.id)}')">Delete</button></div>
        <div class="small">${round(row.kcal,0)} kcal · ${round(row.protein,1)}P · ${round(row.carbs,1)}C · ${round(row.fat,1)}F</div>
      </div>`).join('')}</div>` : `<div class="empty">No food logged for this date.</div>`}
    </div>

    <div class="card">
      <div class="card-title"><span>Saved recipes</span><span class="pill ${reviewCount?'warn':'gray'}">${recipes.length}${reviewCount?` · ${reviewCount} review`:''}</span></div>
      <div class="recipe-toolbar">
        <label>Search recipes<input id="recipeSearch" type="search" placeholder="Recipe, source, tag, notes..." oninput="renderRecipeList()"></label>
        <button class="secondary" onclick="openRecipeImportHub()">＋ Import</button>
      </div>
      <div id="recipeList" class="list" style="margin-top:10px">${recipeListHtml(recipes)}</div>
    </div>

    <details class="card">
      <summary class="card-title"><span>Ingredient reference cache</span><span class="pill gray">${state.ingredientCache.length}</span></summary>
      <div class="small muted">Confirmed package labels take priority. Generic reference records are starting matches and remain visibly unconfirmed until you approve them.</div>
      <div class="button-row" style="margin:10px 0">
        <button class="secondary" onclick="openIngredientEditor()">＋ Add ingredient</button>
        <button class="ghost" onclick="openStandaloneFoodSearch()">Search reference foods</button>
      </div>
      <label>Filter ingredients<input id="ingredientCacheSearch" type="search" placeholder="Name, brand, alias or source" oninput="renderIngredientCacheList()"></label>
      <div id="ingredientCacheList" class="list" style="margin-top:9px">${ingredientCacheListHtml(state.ingredientCache.slice(0,40))}</div>
    </details>
  </div>`;
}
function recipeListHtml(list) {
  if (!list.length) return `<div class="empty">No saved recipes.</div>`;
  return list.map(r=>{
    normaliseRecipeRecord(r);
    const confidence=recipeNutritionConfidence(r);
    const source=r.sourceName||r.sourceBook||r.sourceType||'';
    const per100=r.finishedWeightG?`${round(recipePer100g(r,'kcal'),0)} kcal / 100 g`:'';
    const flags=recipePreferenceFlags(r);
    return `<div class="row recipe-card-row">
      <div class="row-head">
        <div><strong>${esc(r.name)}</strong><div class="small muted">${esc(r.category || 'Uncategorised')} · ${round(perServing(r,'kcal'),0)} kcal / serving${per100?` · ${per100}`:''}</div></div>
        <button class="ghost compact" onclick="toggleRecipeFavourite('${esc(r.id)}')">${r.favourite?'★':'☆'}</button>
      </div>
      <div class="small">${round(perServing(r,'protein'),1)}P · ${round(perServing(r,'carbs'),1)}C · ${round(perServing(r,'fat'),1)}F${toNum(r.fibre)?` · ${round(toNum(r.fibre)/Math.max(1,toNum(r.servings)),1)} fibre`:''}</div>
      <div class="tag-list">
        <span class="pill ${confidence.label==='High'?'good':confidence.label==='Medium'?'warn':confidence.label==='Manual'?'gray':'danger'}">${esc(confidence.label)} confidence</span>
        <span class="pill ${r.rflFriendly==='Yes'?'good':r.rflFriendly==='Maybe'?'warn':'gray'}">RFL ${esc(r.rflFriendly || 'No')}</span>
        ${r.importStatus==='Needs review'?'<span class="pill warn">Needs review</span>':''}
        ${source?`<span class="pill gray">${esc(source)}</span>`:''}
        ${(r.tags||[]).slice(0,3).map(tag=>`<span class="pill gray">${esc(tag)}</span>`).join('')}
      </div>
      ${flags.length?`<div class="notice warn compact-notice">${flags.map(esc).join(' · ')}</div>`:''}
      ${r.notes ? `<div class="tiny muted">${esc(r.notes)}</div>`:''}
      <div class="button-row">
        <button class="secondary compact" onclick="openAddFood('${esc(r.id)}')" ${toNum(r.totalKcal)<=0?'disabled':''}>Log</button>
        <button class="ghost compact" onclick="openRecipeBuilder('${esc(r.id)}')">${r.importStatus==='Needs review'?'Review':'Edit'}</button>
        ${r.sourceUrl?`<button class="ghost compact" onclick="openExternalSource('${esc(r.sourceUrl)}')">Source</button>`:''}
        <button class="danger compact" onclick="deleteRecipe('${esc(r.id)}')">Delete</button>
      </div>
    </div>`;
  }).join('');
}
function renderRecipeList() {
  const q=(document.getElementById('recipeSearch')?.value||'').toLowerCase().trim();
  const list=[...state.recipes].filter(r=>`${r.name} ${r.category} ${r.notes} ${r.instructions} ${r.sourceName} ${r.sourceBook} ${(r.tags||[]).join(' ')}`.toLowerCase().includes(q))
    .sort((a,b)=>Number(Boolean(b.favourite))-Number(Boolean(a.favourite))||a.name.localeCompare(b.name));
  const el=document.getElementById('recipeList');if(el)el.innerHTML=recipeListHtml(list);
}
function toggleRecipeFavourite(id) {
  const r=recipeById(id); if(!r)return;
  r.favourite=!r.favourite; markUpdated(r); saveState(); render();
}
function openAddFood(recipeId='') {
  const options=[...state.recipes].sort((a,b)=>Number(Boolean(b.favourite))-Number(Boolean(a.favourite))||a.name.localeCompare(b.name))
    .map(r=>`<option value="${esc(r.id)}" ${r.id===recipeId?'selected':''}>${esc(r.name)} · ${round(perServing(r,'kcal'),0)} kcal</option>`).join('');
  showModal(`<div class="card-title"><span>Log food</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="addFood(event)">
      <div class="split">
        <label>Date<input id="foodDate" type="date" value="${esc(selectedDietDate)}"></label>
        <label>Meal<select id="foodMeal">${['Breakfast','Lunch','Dinner','Snack','Post-workout'].map(m=>`<option>${m}</option>`).join('')}</select></label>
      </div>
      <label>Saved recipe (optional)<select id="foodRecipe"><option value="">Custom item</option>${options}</select></label>
      <div class="notice">For a saved recipe, enter servings below and leave custom macros blank. For a one-off item, enter its name and macros.</div>
      <div class="split">
        <label>Servings<input id="foodServings" type="number" step="0.1" min="0.1" value="1"></label>
        <label>Custom item name<input id="foodCustomName" placeholder="e.g., protein bar"></label>
      </div>
      <div class="split">
        <label>Calories<input id="foodKcal" type="number" step="1"></label>
        <label>Protein g<input id="foodProtein" type="number" step="0.1"></label>
        <label>Carbs g<input id="foodCarbs" type="number" step="0.1"></label>
        <label>Fat g<input id="foodFat" type="number" step="0.1"></label>
      </div>
      <label>Notes<input id="foodNotes"></label>
      <button type="submit">Add to diary</button>
    </form>`);
}
function addFood(event) {
  event.preventDefault();
  const recipe=recipeById(document.getElementById('foodRecipe').value);
  const servings=Math.max(.01,toNum(document.getElementById('foodServings').value)||1);
  const customName=document.getElementById('foodCustomName').value.trim();
  if(!recipe && !customName) return showToast('Select a recipe or enter a custom item');
  const row={
    id:uid('food'),
    date:document.getElementById('foodDate').value||selectedDietDate,
    meal:document.getElementById('foodMeal').value,
    recipeId:recipe?.id||'',
    recipeName:recipe?.name||'',
    itemName:recipe?.name||customName,
    servings,
    kcal:recipe?perServing(recipe,'kcal')*servings:toNum(document.getElementById('foodKcal').value),
    protein:recipe?perServing(recipe,'protein')*servings:toNum(document.getElementById('foodProtein').value),
    carbs:recipe?perServing(recipe,'carbs')*servings:toNum(document.getElementById('foodCarbs').value),
    fat:recipe?perServing(recipe,'fat')*servings:toNum(document.getElementById('foodFat').value),
    notes:document.getElementById('foodNotes').value.trim(),
    updatedAt:nowISO()
  };
  state.foodLog.push(row); selectedDietDate=row.date; saveState(); closeModal(); render(); showToast('Food logged');
}
function deleteFood(id) {
  state.foodLog=state.foodLog.filter(x=>x.id!==id); saveState(); render();
}
function copyPreviousDay() {
  const d=parseDate(selectedDietDate); d.setDate(d.getDate()-1); const previous=localDateISO(d);
  const rows=state.foodLog.filter(x=>x.date===previous);
  if(!rows.length) return showToast('No entries on the previous day');
  if(!confirm(`Copy ${rows.length} entries from ${previous}?`)) return;
  rows.forEach(row=>state.foodLog.push({...deepClone(row),id:uid('food'),date:selectedDietDate,updatedAt:nowISO()}));
  saveState(); render(); showToast('Previous day copied');
}
function openRecipeBuilder(id='') {
  const source=recipeById(id);
  recipeDraft=source?deepClone(source):{
    id:'',name:'',category:'',servings:1,totalKcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0,
    rflFriendly:'No',favourite:false,noBellPeppers:Boolean(state.settings.noBellPeppers),
    noShellfish:Boolean(state.settings.noShellfish),instructions:'',notes:'',ingredients:[],
    calculateFromIngredients:true,sourceType:'Manual',sourceName:'',sourceUrl:'',sourceAuthor:'',sourceBook:'',
    importedAt:'',prepTime:'',cookTime:'',totalTime:'',yieldText:'',finishedWeightG:'',nutritionConfidence:'Low',
    importStatus:'Ready',tags:[],imageUrl:'',sourceNutrition:{}
  };
  normaliseRecipeRecord(recipeDraft);
  if(recipeDraft.calculateFromIngredients===undefined) recipeDraft.calculateFromIngredients=Boolean(recipeDraft.ingredients?.length);
  renderRecipeBuilderModal();
}
function renderRecipeBuilderModal() {
  normaliseRecipeRecord(recipeDraft);
  const totals=recipeDraftTotals();
  const confidence=recipeNutritionConfidence(recipeDraft);
  const flags=recipePreferenceFlags(recipeDraft);
  const sourceNutrition=recipeDraft.sourceNutrition||{};
  showModal(`<div class="card-title"><span>${recipeDraft.id?'Edit':'Add'} recipe</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveRecipe(event)">
      ${recipeDraft.sourceType&&recipeDraft.sourceType!=='Manual'?`<div class="card soft flat import-source-card">
        <div class="card-title"><span>Imported source</span><span class="pill gray">${esc(recipeDraft.sourceType)}</span></div>
        <div class="small"><strong>${esc(recipeDraft.sourceName||recipeDraft.sourceBook||'Imported recipe')}</strong>${recipeDraft.sourceAuthor?` · ${esc(recipeDraft.sourceAuthor)}`:''}</div>
        ${recipeDraft.sourceUrl?`<div class="tiny source-link">${esc(recipeDraft.sourceUrl)}</div>`:''}
        ${Object.keys(sourceNutrition).length?`<div class="tiny muted">Source nutrition retained for comparison: ${sourceNutrition.kcal?`${esc(sourceNutrition.kcal)} kcal`:''} ${sourceNutrition.protein?`· ${esc(sourceNutrition.protein)} protein`:''}</div>`:''}
      </div>`:''}
      <label>Recipe name<input id="recipeName" required value="${esc(recipeDraft.name)}" oninput="updateRecipeDraftField('name',this.value)"></label>
      <div class="split">
        <label>Category<input value="${esc(recipeDraft.category||'')}" oninput="updateRecipeDraftField('category',this.value)" placeholder="Batch cook, high protein..."></label>
        <label>Servings<input type="number" min="0.1" step="0.1" value="${esc(recipeDraft.servings)}" oninput="updateRecipeDraftField('servings',this.value);updateRecipeTotalsDisplay()"></label>
      </div>
      <div class="split">
        <label>Finished cooked weight (g)<input type="number" min="0" step="1" value="${esc(recipeDraft.finishedWeightG||'')}" oninput="updateRecipeDraftField('finishedWeightG',this.value);updateRecipeTotalsDisplay()" placeholder="Optional"></label>
        <label>Yield text<input value="${esc(recipeDraft.yieldText||'')}" oninput="updateRecipeDraftField('yieldText',this.value)" placeholder="e.g. 6 servings"></label>
      </div>
      <div class="triple">
        <label>Prep time<input value="${esc(recipeDraft.prepTime||'')}" oninput="updateRecipeDraftField('prepTime',this.value)" placeholder="15 min"></label>
        <label>Cook time<input value="${esc(recipeDraft.cookTime||'')}" oninput="updateRecipeDraftField('cookTime',this.value)" placeholder="30 min"></label>
        <label>Total time<input value="${esc(recipeDraft.totalTime||'')}" oninput="updateRecipeDraftField('totalTime',this.value)" placeholder="45 min"></label>
      </div>
      <div class="split">
        <label>RFL-friendly<select onchange="updateRecipeDraftField('rflFriendly',this.value)">${['Yes','Maybe','No'].map(x=>`<option ${x===recipeDraft.rflFriendly?'selected':''}>${x}</option>`).join('')}</select></label>
        <label class="inline-check"><input type="checkbox" ${recipeDraft.favourite?'checked':''} onchange="updateRecipeDraftField('favourite',this.checked)"> Favourite</label>
      </div>
      <label>Tags<input value="${esc((recipeDraft.tags||[]).join(', '))}" oninput="updateRecipeDraftField('tags',this.value)" placeholder="high protein, freezer, family meal"></label>
      ${flags.length?`<div class="notice warn">${flags.map(esc).join('<br>')}</div>`:''}

      <div class="card soft flat">
        <div class="card-title"><span>Ingredients</span><span class="pill ${confidence.label==='High'?'good':confidence.label==='Medium'?'warn':confidence.label==='Manual'?'gray':'danger'}">${esc(confidence.label)} · ${confidence.calculable}/${confidence.total}</span></div>
        <div class="small muted">Imported lines are matched against your confirmed cache first. Review uncertain matches before relying on the totals.</div>
        <div class="button-row" style="margin-top:8px">
          <button type="button" class="secondary compact" onclick="autoMatchRecipeDraft()">Auto-match all</button>
          <button type="button" class="ghost compact" onclick="addBlankRecipeIngredient()">＋ Blank ingredient</button>
        </div>
        <div class="sync-grid" style="margin-top:8px">
          <label>Use saved ingredient<select id="ingredientPicker"><option value="">Choose...</option>${[...state.ingredientCache].sort((a,b)=>a.name.localeCompare(b.name)).map(i=>`<option value="${esc(i.id)}">${esc(i.name)} · ${round(i.kcal,0)} kcal / ${esc(i.baseAmount||1)} ${esc(i.baseUnit||'serving')}</option>`).join('')}</select></label>
          <button type="button" class="secondary compact" onclick="addIngredientFromCache()">Add</button>
        </div>
        <div class="list" style="margin-top:9px">
          ${(recipeDraft.ingredients||[]).map((ing,index)=>recipeIngredientEditorHtml(ing,index)).join('') || '<div class="empty">Add ingredients, or untick “Calculate totals” and enter total recipe macros manually.</div>'}
        </div>
      </div>

      <div class="card flat nutrition-summary-card">
        <div class="card-title"><span>Recipe nutrition</span><span id="recipePerServing" class="pill">${round(totals.kcal/Math.max(.1,toNum(recipeDraft.servings)),0)} kcal / serving</span></div>
        <label class="inline-check"><input type="checkbox" ${recipeDraft.calculateFromIngredients?'checked':''} onchange="updateRecipeDraftField('calculateFromIngredients',this.checked);updateRecipeTotalsDisplay()"> Calculate from matched ingredients</label>
        <div class="split">
          <label>Total kcal<input id="recipeTotalKcal" type="number" step="0.1" value="${round(totals.kcal,1)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('totalKcal',this.value);updateRecipeTotalsDisplay()"></label>
          <label>Total protein g<input id="recipeTotalProtein" type="number" step="0.1" value="${round(totals.protein,1)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('protein',this.value);updateRecipeTotalsDisplay()"></label>
          <label>Total carbs g<input id="recipeTotalCarbs" type="number" step="0.1" value="${round(totals.carbs,1)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('carbs',this.value);updateRecipeTotalsDisplay()"></label>
          <label>Total fat g<input id="recipeTotalFat" type="number" step="0.1" value="${round(totals.fat,1)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('fat',this.value);updateRecipeTotalsDisplay()"></label>
          <label>Total fibre g<input id="recipeTotalFibre" type="number" step="0.1" value="${round(totals.fibre,1)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('fibre',this.value);updateRecipeTotalsDisplay()"></label>
          <label>Total sodium mg<input id="recipeTotalSodium" type="number" step="1" value="${round(totals.sodiumMg,0)}" ${recipeDraft.calculateFromIngredients?'readonly':''} oninput="updateRecipeDraftField('sodiumMg',this.value);updateRecipeTotalsDisplay()"></label>
        </div>
        <div id="recipePer100g" class="small muted">${recipeDraft.finishedWeightG?`${round(totals.kcal/toNum(recipeDraft.finishedWeightG)*100,0)} kcal per 100 g`: 'Add the finished cooked weight to log portions by grams.'}</div>
        ${Object.keys(sourceNutrition).length?`<button type="button" class="ghost compact" style="margin-top:8px" onclick="useSourceNutrition()">Use source nutrition instead</button>`:''}
      </div>
      <label>Instructions<textarea oninput="updateRecipeDraftField('instructions',this.value)">${esc(recipeDraft.instructions||'')}</textarea></label>
      <label>Notes<textarea oninput="updateRecipeDraftField('notes',this.value)">${esc(recipeDraft.notes||'')}</textarea></label>
      <button type="submit">Save recipe</button>
    </form>`);
}
function updateRecipeDraftField(key,value) {
  if(!recipeDraft)return;
  if(['servings','totalKcal','protein','carbs','fat','fibre','sodiumMg','finishedWeightG'].includes(key)) recipeDraft[key]=numOrBlank(value);
  else if(key==='tags') recipeDraft.tags=String(value||'').split(',').map(x=>x.trim()).filter(Boolean);
  else recipeDraft[key]=value;
}
function updateRecipeIngredient(index,key,value) {
  const ing=recipeDraft?.ingredients?.[index]; if(!ing)return;
  if(['kcal','protein','carbs','fat','fibre','sodiumMg','grams'].includes(key)) ing[key]=numOrBlank(value);
  else ing[key]=value;
  if(['amount','unit'].includes(key)&&ing.ingredientId) recalculateRecipeIngredient(ing);
  if(key==='name'&&ing.matchStatus==='unmatched'){
    const parsed=parseIngredientLine(`${ing.amount||''} ${ing.unit||''} ${ing.name||''}`.trim());
    ing.parsedName=parsed.name;
  }
  updateRecipeTotalsDisplay();
}
function recipeDraftTotals() {
  if(recipeDraft?.calculateFromIngredients && recipeDraft.ingredients?.length) {
    return recipeDraft.ingredients.reduce((a,i)=>({
      kcal:a.kcal+toNum(i.kcal),protein:a.protein+toNum(i.protein),carbs:a.carbs+toNum(i.carbs),fat:a.fat+toNum(i.fat),
      fibre:a.fibre+toNum(i.fibre),sodiumMg:a.sodiumMg+toNum(i.sodiumMg)
    }),{kcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0});
  }
  return {kcal:toNum(recipeDraft?.totalKcal),protein:toNum(recipeDraft?.protein),carbs:toNum(recipeDraft?.carbs),fat:toNum(recipeDraft?.fat),fibre:toNum(recipeDraft?.fibre),sodiumMg:toNum(recipeDraft?.sodiumMg)};
}
function updateRecipeTotalsDisplay() {
  if(!recipeDraft)return;
  const totals=recipeDraftTotals(), servings=Math.max(.1,toNum(recipeDraft.servings)||1);
  const ids={kcal:'recipeTotalKcal',protein:'recipeTotalProtein',carbs:'recipeTotalCarbs',fat:'recipeTotalFat',fibre:'recipeTotalFibre',sodiumMg:'recipeTotalSodium'};
  Object.entries(ids).forEach(([key,id])=>{const el=document.getElementById(id);if(el&&recipeDraft.calculateFromIngredients)el.value=round(totals[key],key==='sodiumMg'?0:1);});
  const badge=document.getElementById('recipePerServing');if(badge)badge.textContent=`${round(totals.kcal/servings,0)} kcal / serving`;
  const per100=document.getElementById('recipePer100g');if(per100)per100.textContent=toNum(recipeDraft.finishedWeightG)>0?`${round(totals.kcal/toNum(recipeDraft.finishedWeightG)*100,0)} kcal · ${round(totals.protein/toNum(recipeDraft.finishedWeightG)*100,1)}P per 100 g`:'Add the finished cooked weight to log portions by grams.';
}
function addIngredientFromCache() {
  const item=state.ingredientCache.find(i=>i.id===document.getElementById('ingredientPicker')?.value);
  if(!item)return showToast('Choose an ingredient');
  normaliseIngredientRecord(item);
  const ing={id:uid('ring'),ingredientId:item.id,name:item.name,sourceLine:item.name,amount:item.baseAmount||1,unit:item.baseUnit||'serving',grams:'',matchStatus:item.confirmed?'confirmed':'likely',matchConfidence:item.confirmed?100:75,kcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0,notes:'',updatedAt:nowISO()};
  recalculateRecipeIngredient(ing);recipeDraft.ingredients.push(ing);renderRecipeBuilderModal();
}
function addBlankRecipeIngredient() {
  recipeDraft.ingredients.push({id:uid('ring'),ingredientId:'',name:'',sourceLine:'',amount:'',unit:'g',grams:'',matchStatus:'unmatched',matchConfidence:0,kcal:'',protein:'',carbs:'',fat:'',fibre:'',sodiumMg:'',notes:'',updatedAt:nowISO()});
  renderRecipeBuilderModal();
}
function removeRecipeIngredient(index) {
  recipeDraft.ingredients.splice(index,1); renderRecipeBuilderModal();
}
function saveRecipe(event) {
  event.preventDefault();
  const totals=recipeDraftTotals();
  if(!recipeDraft.name.trim())return showToast('Enter a recipe name');
  const confidence=recipeNutritionConfidence(recipeDraft);
  let target=recipeDraft.id?recipeById(recipeDraft.id):null;
  if(!target){target={id:uid('recipe')};state.recipes.push(target);}
  Object.assign(target,deepClone(recipeDraft),{
    id:target.id,name:recipeDraft.name.trim(),servings:Math.max(.1,toNum(recipeDraft.servings)||1),
    totalKcal:totals.kcal,protein:totals.protein,carbs:totals.carbs,fat:totals.fat,fibre:totals.fibre,sodiumMg:totals.sodiumMg,
    nutritionConfidence:confidence.label,importStatus:confidence.label==='Low'&&recipeDraft.sourceType!=='Manual'?'Needs review':'Ready',updatedAt:nowISO()
  });
  saveState(); recipeDraft=null; closeModal(); render(); showToast('Recipe saved');
}
function deleteRecipe(id) {
  if(!confirm('Delete this recipe? Existing food-log entries keep their captured macros.'))return;
  state.recipes=state.recipes.filter(r=>r.id!==id); saveState(); render(); showToast('Recipe deleted');
}
function openIngredientEditor(id='',returnIndex='') {
  const ing=state.ingredientCache.find(x=>x.id===id);
  const item=ing?deepClone(ing):{name:'',brand:'',foodState:'',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:'',protein:'',carbs:'',fat:'',fibre:'',sodiumMg:'',aliases:[],commonMeasures:{},source:'Package label / user',sourceId:'',sourceUrl:'',confirmed:true,notes:''};
  normaliseIngredientRecord(item);
  const measures=Object.entries(item.commonMeasures||{}).map(([unit,grams])=>`${unit}=${grams}`).join('\n');
  showModal(`<div class="card-title"><span>${ing?'Edit':'Add'} ingredient</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveIngredient(event,'${esc(id)}','${esc(returnIndex)}')">
      <div class="split"><label>Name<input id="ingName" required value="${esc(item.name||'')}"></label><label>Brand<input id="ingBrand" value="${esc(item.brand||'')}" placeholder="Optional"></label></div>
      <div class="split"><label>Food state<input id="ingState" value="${esc(item.foodState||'')}" placeholder="raw, cooked, drained..."></label><label class="inline-check"><input id="ingConfirmed" type="checkbox" ${item.confirmed?'checked':''}> Confirmed value</label></div>
      <div class="split"><label>Reference amount<input id="ingBaseAmount" type="number" step="0.01" min="0.01" value="${esc(item.baseAmount||100)}"></label><label>Reference unit<select id="ingBaseUnit">${['g','ml','serving','each','scoop'].map(x=>`<option ${x===item.baseUnit?'selected':''}>${x}</option>`).join('')}</select></label></div>
      <div class="split">
        <label>kcal<input id="ingKcal" type="number" step="0.1" value="${esc(item.kcal||'')}"></label>
        <label>Protein g<input id="ingProtein" type="number" step="0.1" value="${esc(item.protein||'')}"></label>
        <label>Carbs g<input id="ingCarbs" type="number" step="0.1" value="${esc(item.carbs||'')}"></label>
        <label>Fat g<input id="ingFat" type="number" step="0.1" value="${esc(item.fat||'')}"></label>
        <label>Fibre g<input id="ingFibre" type="number" step="0.1" value="${esc(item.fibre||'')}"></label>
        <label>Sodium mg<input id="ingSodium" type="number" step="1" value="${esc(item.sodiumMg||'')}"></label>
      </div>
      <label>Aliases (comma separated)<input id="ingAliases" value="${esc((item.aliases||[]).join(', '))}" placeholder="e.g. evoo, extra virgin olive oil"></label>
      <label>Common measures — one per line, unit=grams<textarea id="ingMeasures" placeholder="tbsp=13.5\ncup=240">${esc(measures)}</textarea></label>
      <div class="split"><label>Density g/ml<input id="ingDensity" type="number" step="0.001" value="${esc(item.densityGPerMl||'')}" placeholder="Only for liquids"></label><label>Source<input id="ingSource" value="${esc(item.source||'')}" placeholder="Package label, USDA FDC..."></label></div>
      <label>Source URL<input id="ingSourceUrl" type="url" value="${esc(item.sourceUrl||'')}"></label>
      <label>Notes<textarea id="ingNotes">${esc(item.notes||'')}</textarea></label>
      <button type="submit">Save ingredient</button>
    </form>`);
}
function saveIngredient(event,id,returnIndex='') {
  event.preventDefault();
  let ing=state.ingredientCache.find(x=>x.id===id);
  if(!ing){ing={id:uid('ingredient')};state.ingredientCache.push(ing);}
  Object.assign(ing,{
    name:document.getElementById('ingName').value.trim(),brand:document.getElementById('ingBrand').value.trim(),foodState:document.getElementById('ingState').value.trim(),
    servingDescription:`${toNum(document.getElementById('ingBaseAmount').value)||1} ${document.getElementById('ingBaseUnit').value}`,
    baseAmount:toNum(document.getElementById('ingBaseAmount').value)||1,baseUnit:document.getElementById('ingBaseUnit').value,
    densityGPerMl:numOrBlank(document.getElementById('ingDensity').value),kcal:toNum(document.getElementById('ingKcal').value),protein:toNum(document.getElementById('ingProtein').value),
    carbs:toNum(document.getElementById('ingCarbs').value),fat:toNum(document.getElementById('ingFat').value),fibre:toNum(document.getElementById('ingFibre').value),sodiumMg:toNum(document.getElementById('ingSodium').value),
    aliases:document.getElementById('ingAliases').value.split(',').map(x=>x.trim()).filter(Boolean),commonMeasures:parseMeasuresText(document.getElementById('ingMeasures').value),
    source:document.getElementById('ingSource').value.trim(),sourceUrl:document.getElementById('ingSourceUrl').value.trim(),confirmed:Boolean(document.getElementById('ingConfirmed').checked),
    notes:document.getElementById('ingNotes').value.trim(),updatedAt:nowISO()
  });
  normaliseIngredientRecord(ing);saveState();
  if(returnIndex!==''&&recipeDraft?.ingredients?.[Number(returnIndex)]){
    applyIngredientMatch(recipeDraft.ingredients[Number(returnIndex)],ing,'confirmed',100);
    renderRecipeBuilderModal();showToast('Ingredient saved and matched');return;
  }
  closeModal();render();showToast('Ingredient saved');
}



/* Lift & Cut 2.3 — recipe import, ingredient matching and reference nutrition */
const RECIPE_UNITS=['kg','g','mg','l','ml','cup','cups','tbsp','tablespoon','tablespoons','tsp','teaspoon','teaspoons','oz','lb','pound','pounds','clove','cloves','can','cans','tin','tins','slice','slices','scoop','scoops','each','medium','small','large','bunch','handful','pinch'];
const FRACTION_MAP={'¼':.25,'½':.5,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125,'⅜':.375,'⅝':.625,'⅞':.875};
const PREP_WORDS=new Set(['fresh','finely','roughly','thinly','thickly','chopped','diced','sliced','minced','grated','crushed','peeled','trimmed','washed','drained','rinsed','optional','divided','plus','extra','for','serving','to','taste','about','approximately','heaped','level','packed','large','medium','small']);
function normaliseIngredientRecord(item){
  if(!item||typeof item!=='object')return item;
  item.brand ||= ''; item.foodState ||= '';
  if(!item.baseAmount||!item.baseUnit){
    const m=String(item.servingDescription||'').match(/(\d+(?:\.\d+)?)\s*(g|ml|scoop|serving|each)/i);
    item.baseAmount=m?toNum(m[1]):1;item.baseUnit=m?m[2].toLowerCase():'serving';
  }
  item.servingDescription ||= `${item.baseAmount} ${item.baseUnit}`;
  item.densityGPerMl = item.densityGPerMl===''?'':numOrBlank(item.densityGPerMl);
  item.fibre=toNum(item.fibre);item.sodiumMg=toNum(item.sodiumMg);
  item.aliases=Array.isArray(item.aliases)?item.aliases:String(item.aliases||'').split(',').map(x=>x.trim()).filter(Boolean);
  item.commonMeasures=item.commonMeasures&&typeof item.commonMeasures==='object'&&!Array.isArray(item.commonMeasures)?item.commonMeasures:{};
  item.source ||= 'User / legacy cache';item.sourceId ||= '';item.sourceUrl ||= '';item.confirmed=Boolean(item.confirmed);item.notes ||= '';
  return item;
}
function normaliseRecipeRecord(recipe){
  if(!recipe||typeof recipe!=='object')return recipe;
  recipe.ingredients=Array.isArray(recipe.ingredients)?recipe.ingredients:[];
  recipe.sourceType ||= 'Manual';recipe.sourceName ||= '';recipe.sourceUrl ||= '';recipe.sourceAuthor ||= '';recipe.sourceBook ||= '';recipe.importedAt ||= '';
  recipe.prepTime ||= '';recipe.cookTime ||= '';recipe.totalTime ||= '';recipe.yieldText ||= '';recipe.finishedWeightG=numOrBlank(recipe.finishedWeightG);
  recipe.fibre=toNum(recipe.fibre);recipe.sodiumMg=toNum(recipe.sodiumMg);recipe.nutritionConfidence ||= recipe.ingredients.length?'Low':'Manual';
  recipe.importStatus ||= 'Ready';recipe.tags=Array.isArray(recipe.tags)?recipe.tags:String(recipe.tags||'').split(',').map(x=>x.trim()).filter(Boolean);recipe.imageUrl ||= '';
  recipe.sourceNutrition=recipe.sourceNutrition&&typeof recipe.sourceNutrition==='object'?recipe.sourceNutrition:{};
  recipe.ingredients.forEach(ing=>{
    ing.id ||= uid('ring');ing.ingredientId ||= '';ing.name ||= '';ing.sourceLine ||= ing.name;ing.amount=numOrBlank(ing.amount);ing.unit ||= 'g';ing.grams=numOrBlank(ing.grams);
    ing.matchStatus ||= ing.ingredientId?'likely':'unmatched';ing.matchConfidence=toNum(ing.matchConfidence);ing.fibre=toNum(ing.fibre);ing.sodiumMg=toNum(ing.sodiumMg);ing.notes ||= '';ing.updatedAt ||= recipe.updatedAt||nowISO();
  });
  return recipe;
}
function normaliseFoodName(value){
  return String(value||'').toLowerCase().replace(/&amp;/g,' and ').replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean).filter(w=>!PREP_WORDS.has(w)).map(w=>w.endsWith('ies')?w.slice(0,-3)+'y':w.endsWith('oes')?w.slice(0,-2):w.endsWith('s')&&w.length>4?w.slice(0,-1):w).join(' ').trim();
}
function parseNumericExpression(raw){
  let s=String(raw||'').trim();if(!s)return '';
  Object.entries(FRACTION_MAP).forEach(([char,val])=>{s=s.replaceAll(char,` ${val} `);});
  s=s.replace(/,/g,'.').replace(/\s+/g,' ').trim();
  if(/^\d+\s+\d+\/\d+$/.test(s)){const [whole,frac]=s.split(' ');const [a,b]=frac.split('/').map(Number);return Number(whole)+a/b;}
  if(/^\d+\/\d+$/.test(s)){const [a,b]=s.split('/').map(Number);return b?a/b:'';}
  if(/^\d+(?:\.\d+)?\s*(?:-|–|to)\s*\d+(?:\.\d+)?$/i.test(s)){const nums=s.match(/\d+(?:\.\d+)?/g).map(Number);return (nums[0]+nums[1])/2;}
  const parts=s.split(' ').map(Number).filter(Number.isFinite);if(parts.length>1)return parts.reduce((a,b)=>a+b,0);
  const n=Number(s);return Number.isFinite(n)?n:'';
}
function canonicalUnit(unit){
  const u=String(unit||'').toLowerCase().replace(/\./g,'').trim();
  const map={cups:'cup',tablespoon:'tbsp',tablespoons:'tbsp',teaspoon:'tsp',teaspoons:'tsp',cloves:'clove',cans:'can',tins:'can',tin:'can',slices:'slice',scoops:'scoop',pounds:'lb',pound:'lb',lbs:'lb',ounces:'oz'};
  return map[u]||u;
}
function parseIngredientLine(line){
  let raw=String(line||'').replace(/^[\s•·▪◦*-]+/,'').replace(/\s+/g,' ').trim();
  const out={sourceLine:raw,amount:'',unit:'',name:raw,notes:''};if(!raw)return out;
  const multi=raw.match(/^([\d.,¼½¾⅓⅔⅛⅜⅝⅞]+)\s*[x×]\s*([\d.,¼½¾⅓⅔⅛⅜⅝⅞]+)\s*([a-zA-Z]+)\b\s*(.*)$/);
  if(multi){out.amount=toNum(parseNumericExpression(multi[1]))*toNum(parseNumericExpression(multi[2]));out.unit=canonicalUnit(multi[3]);out.name=multi[4].replace(/^of\s+/i,'').trim();return out;}
  const unitPattern=RECIPE_UNITS.sort((a,b)=>b.length-a.length).map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
  const m=raw.match(new RegExp(`^(?:about\\s+|approximately\\s+)?((?:\\d+\\s+)?(?:\\d+(?:[.,]\\d+)?|\\d+\\/\\d+|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\\s*(?:-|–|to)\\s*(?:\\d+(?:[.,]\\d+)?|\\d+\\/\\d+|[¼½¾⅓⅔⅛⅜⅝⅞]))?)\\s*(${unitPattern})?\\b\\s*(.*)$`,'i'));
  if(m){out.amount=parseNumericExpression(m[1]);out.unit=canonicalUnit(m[2]||'each');out.name=String(m[3]||'').replace(/^of\s+/i,'').trim()||raw;}
  const paren=out.name.match(/^(.*?)\s*\((.*?)\)\s*$/);if(paren){out.name=paren[1].trim();out.notes=paren[2].trim();}
  return out;
}
function ingredientBaseGrams(item){
  normaliseIngredientRecord(item);const amount=Math.max(.0001,toNum(item.baseAmount)||1),unit=canonicalUnit(item.baseUnit);
  if(unit==='g')return amount;if(unit==='kg')return amount*1000;if(unit==='mg')return amount/1000;if(unit==='ml')return amount*(toNum(item.densityGPerMl)||1);
  if(item.commonMeasures?.[unit])return amount*toNum(item.commonMeasures[unit]);return '';
}
function amountToGrams(amount,unit,item){
  const a=toNum(amount),u=canonicalUnit(unit);if(!a)return '';
  if(u==='g')return a;if(u==='kg')return a*1000;if(u==='mg')return a/1000;if(u==='oz')return a*28.3495;if(u==='lb')return a*453.592;
  if(u==='ml')return a*(toNum(item?.densityGPerMl)||1);if(u==='l')return a*1000*(toNum(item?.densityGPerMl)||1);
  const measures=item?.commonMeasures||{};if(measures[u])return a*toNum(measures[u]);
  if(canonicalUnit(item?.baseUnit)===u){const bg=ingredientBaseGrams(item);return bg?bg*(a/Math.max(.0001,toNum(item.baseAmount)||1)):'';}
  return '';
}
function recalculateRecipeIngredient(ing){
  if(!ing)return;const item=state.ingredientCache.find(x=>x.id===ing.ingredientId);if(!item)return;
  normaliseIngredientRecord(item);const baseGrams=ingredientBaseGrams(item),grams=amountToGrams(ing.amount,ing.unit,item);ing.grams=grams;
  let ratio='';if(grams&&baseGrams)ratio=grams/baseGrams;else if(canonicalUnit(ing.unit)===canonicalUnit(item.baseUnit))ratio=toNum(ing.amount)/Math.max(.0001,toNum(item.baseAmount)||1);
  if(!Number.isFinite(ratio)||ratio===''){ing.matchStatus='needs-measure';ing.kcal=ing.protein=ing.carbs=ing.fat=ing.fibre=ing.sodiumMg='';return;}
  ['kcal','protein','carbs','fat','fibre','sodiumMg'].forEach(key=>ing[key]=toNum(item[key])*ratio);
  if(ing.matchStatus==='needs-measure')ing.matchStatus=item.confirmed?'confirmed':'likely';ing.updatedAt=nowISO();
}
function foodMatchScore(query,item){
  const q=normaliseFoodName(query);if(!q)return 0;const names=[item.name,...(item.aliases||[])].map(normaliseFoodName).filter(Boolean);let best=0;
  for(const name of names){if(name===q)best=Math.max(best,100);else if(name.includes(q)||q.includes(name))best=Math.max(best,82);else{const qa=new Set(q.split(' ')),na=new Set(name.split(' '));const intersect=[...qa].filter(x=>na.has(x)).length;const union=new Set([...qa,...na]).size;best=Math.max(best,union?intersect/union*75:0);}}
  return Math.round(best);
}
function localFoodMatches(query,limit=8){return state.ingredientCache.map(item=>({item,score:foodMatchScore(query,item)})).filter(x=>x.score>=28).sort((a,b)=>b.score-a.score||Number(Boolean(b.item.confirmed))-Number(Boolean(a.item.confirmed))).slice(0,limit);}
function applyIngredientMatch(ing,item,status='',score=100){
  normaliseIngredientRecord(item);ing.ingredientId=item.id;ing.name=ing.name||item.name;ing.matchStatus=status||(item.confirmed?'confirmed':'likely');ing.matchConfidence=score;recalculateRecipeIngredient(ing);ing.updatedAt=nowISO();
}
function autoMatchRecipeIngredients(recipe){
  normaliseRecipeRecord(recipe);recipe.ingredients.forEach(ing=>{if(ing.ingredientId){recalculateRecipeIngredient(ing);return;}const matches=localFoodMatches(ing.name||ing.sourceLine,3);if(matches[0]&&matches[0].score>=62)applyIngredientMatch(ing,matches[0].item,matches[0].score>=92&&matches[0].item.confirmed?'confirmed':'likely',matches[0].score);});return recipe;
}
function autoMatchRecipeDraft(){if(!recipeDraft)return;autoMatchRecipeIngredients(recipeDraft);renderRecipeBuilderModal();showToast('Local ingredient matching complete');}
function recipeNutritionConfidence(recipe){
  normaliseRecipeRecord(recipe);const total=recipe.ingredients.length;if(!total)return {label:toNum(recipe.totalKcal)>0?'Manual':'Low',total:0,calculable:0,confirmed:0};
  const calculable=recipe.ingredients.filter(i=>Number.isFinite(Number(i.kcal))&&i.kcal!==''&&i.matchStatus!=='unmatched'&&i.matchStatus!=='needs-measure').length;
  const confirmed=recipe.ingredients.filter(i=>i.matchStatus==='confirmed').length;const pct=calculable/total,confirmedPct=confirmed/total;
  const label=pct===1&&confirmedPct>=.8?'High':pct>=.7?'Medium':'Low';return {label,total,calculable,confirmed};
}
function recipePreferenceFlags(recipe){
  const text=`${recipe.name} ${(recipe.ingredients||[]).map(i=>`${i.name} ${i.sourceLine}`).join(' ')}`.toLowerCase();const flags=[];
  if(state.settings.noShellfish&&/(prawn|shrimp|lobster|crab|crayfish|scampi|shellfish)/i.test(text))flags.push('Contains possible shellfish');
  if(state.settings.noBellPeppers&&/(bell pepper|capsicum|sweet pepper|red pepper|green pepper|yellow pepper)/i.test(text))flags.push('Contains possible bell pepper — review pepper meaning');
  return flags;
}
function recipePer100g(recipe,key){const weight=toNum(recipe.finishedWeightG);if(!weight)return 0;const map={kcal:'totalKcal',protein:'protein',carbs:'carbs',fat:'fat',fibre:'fibre',sodiumMg:'sodiumMg'};return toNum(recipe[map[key]])/weight*100;}
function recipeIngredientEditorHtml(ing,index){
  const status=ing.matchStatus||'unmatched',statusClass=status==='confirmed'?'good':status==='likely'?'warn':status==='needs-measure'?'warn':'danger';const statusText=status==='needs-measure'?'Needs unit conversion':status==='unmatched'?'Unmatched':status[0].toUpperCase()+status.slice(1);
  return `<div class="row recipe-ingredient-row">
    <div class="row-head"><div><strong>Ingredient ${index+1}</strong><div class="tag-list"><span class="pill ${statusClass}">${statusText}</span>${ing.grams?`<span class="pill gray">${round(ing.grams,1)} g</span>`:''}</div></div><button type="button" class="danger compact" onclick="removeRecipeIngredient(${index})">Remove</button></div>
    ${ing.sourceLine&&ing.sourceLine!==ing.name?`<div class="source-ingredient-line">${esc(ing.sourceLine)}</div>`:''}
    <label>Name<input value="${esc(ing.name||'')}" oninput="updateRecipeIngredient(${index},'name',this.value)"></label>
    <div class="split"><label>Amount<input value="${esc(ing.amount??'')}" oninput="updateRecipeIngredient(${index},'amount',this.value)" placeholder="200"></label><label>Unit<input value="${esc(ing.unit||'')}" oninput="updateRecipeIngredient(${index},'unit',this.value)" placeholder="g"></label></div>
    <div class="button-row"><button type="button" class="secondary compact" onclick="openIngredientMatch(${index})">${ing.ingredientId?'Change match':'Match ingredient'}</button>${ing.ingredientId?`<button type="button" class="ghost compact" onclick="unlinkRecipeIngredient(${index})">Unlink</button>`:''}</div>
    <div class="macro-contribution"><span>${round(ing.kcal,0)||0} kcal</span><span>${round(ing.protein,1)||0}P</span><span>${round(ing.carbs,1)||0}C</span><span>${round(ing.fat,1)||0}F</span></div>
    ${ing.matchStatus==='needs-measure'?'<div class="tiny muted">Add a gram conversion for this measure in the ingredient reference record.</div>':''}
  </div>`;
}
function unlinkRecipeIngredient(index){const ing=recipeDraft?.ingredients?.[index];if(!ing)return;ing.ingredientId='';ing.matchStatus='unmatched';ing.matchConfidence=0;ing.grams='';ing.kcal=ing.protein=ing.carbs=ing.fat=ing.fibre=ing.sodiumMg='';renderRecipeBuilderModal();}
function openIngredientMatch(index){
  const ing=recipeDraft?.ingredients?.[index];if(!ing)return;const matches=localFoodMatches(ing.name||ing.sourceLine,10);
  showModal(`<div class="card-title"><span>Match ingredient</span><button class="ghost compact" onclick="renderRecipeBuilderModal()">Back</button></div>
    <div class="notice"><strong>${esc(ing.sourceLine||ing.name)}</strong><br>Choose a confirmed package entry where possible.</div>
    <label style="margin-top:10px">Search reference foods<input id="foodMatchQuery" value="${esc(ing.name||'')}" placeholder="e.g. raw chicken breast"></label>
    <div class="button-row" style="margin-top:8px"><button onclick="searchReferenceFoods(${index})">Search online</button><button class="ghost" onclick="openIngredientEditor('',${index})">Add manually</button></div>
    <div class="card-title" style="margin-top:14px"><span>Local matches</span><span class="pill gray">${matches.length}</span></div>
    <div class="list">${matches.length?matches.map(({item,score})=>`<button class="food-match-card" onclick="selectLocalIngredientMatch(${index},'${esc(item.id)}',${score})"><span><strong>${esc(item.name)}</strong>${item.brand?`<small>${esc(item.brand)}</small>`:''}<small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P per ${esc(item.baseAmount)} ${esc(item.baseUnit)} · ${esc(item.source)}</small></span><span class="pill ${item.confirmed?'good':'warn'}">${item.confirmed?'Confirmed':score+'%'}</span></button>`).join(''):'<div class="empty">No useful local matches. Search the reference databases.</div>'}</div>
    <div id="foodSearchResults"></div>`);
}
function selectLocalIngredientMatch(index,id,score=100){const ing=recipeDraft?.ingredients?.[index],item=state.ingredientCache.find(x=>x.id===id);if(!ing||!item)return;applyIngredientMatch(ing,item,item.confirmed?'confirmed':'likely',score);renderRecipeBuilderModal();}
async function searchReferenceFoods(index){
  const q=(document.getElementById('foodMatchQuery')?.value||'').trim(),box=document.getElementById('foodSearchResults');if(q.length<2)return showToast('Enter at least two characters');
  if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Reference search needs the updated Google Sheets backend',4500);
  if(box)box.innerHTML='<div class="empty">Searching USDA and Open Food Facts…</div>';
  try{const result=await jsonpRequest({action:'food-search',key:state.settings.syncKey,q,source:'all'},35000);if(!result?.ok)throw new Error(result?.error||'Search failed');foodSearchResults=result.foods||[];if(box)box.innerHTML=`<div class="card-title" style="margin-top:14px"><span>Reference results</span><span class="pill gray">${foodSearchResults.length}</span></div><div class="list">${foodSearchResults.length?foodSearchResults.map((item,i)=>`<button class="food-match-card" onclick="selectReferenceFood(${index},${i})"><span><strong>${esc(item.name)}</strong>${item.brand?`<small>${esc(item.brand)}</small>`:''}<small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P · ${round(item.carbs,1)}C · ${round(item.fat,1)}F per 100 g</small><small>${esc(item.source)}</small></span><span class="pill gray">Use</span></button>`).join(''):'<div class="empty">No results. Try a simpler food name or add the package label manually.</div>'}</div>`;
  }catch(error){if(box)box.innerHTML=`<div class="notice warn">${esc(error.message||'Reference search failed')}</div>`;}
}
function selectReferenceFood(index,resultIndex){
  const ing=recipeDraft?.ingredients?.[index],result=foodSearchResults[resultIndex];if(!ing||!result)return;
  const item={id:uid('ingredient'),name:result.name,brand:result.brand||'',foodState:result.foodState||'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:toNum(result.kcal),protein:toNum(result.protein),carbs:toNum(result.carbs),fat:toNum(result.fat),fibre:toNum(result.fibre),sodiumMg:toNum(result.sodiumMg),aliases:[ing.name].filter(Boolean),commonMeasures:{},source:result.source||'Reference database',sourceId:result.sourceId||'',sourceUrl:result.sourceUrl||'',confirmed:true,notes:'Imported from reference search; verify branded values against the current label.',updatedAt:nowISO()};
  state.ingredientCache.push(item);applyIngredientMatch(ing,item,'confirmed',100);saveState();renderRecipeBuilderModal();showToast('Reference food saved and matched');
}
function ingredientCacheListHtml(list){
  if(!list.length)return '<div class="empty">No ingredients found.</div>';
  return list.map(i=>`<div class="row"><div class="row-head"><div><strong>${esc(i.name)}</strong>${i.brand?`<div class="small">${esc(i.brand)}</div>`:''}<div class="small muted">${esc(i.baseAmount||1)} ${esc(i.baseUnit||'serving')} · ${esc(i.source||'')}</div></div><div class="button-row"><span class="pill ${i.confirmed?'good':'warn'}">${i.confirmed?'Confirmed':'Verify'}</span><button class="ghost compact" onclick="openIngredientEditor('${esc(i.id)}')">Edit</button></div></div><div class="small">${round(i.kcal,0)} kcal · ${round(i.protein,1)}P · ${round(i.carbs,1)}C · ${round(i.fat,1)}F</div></div>`).join('');
}
function renderIngredientCacheList(){const q=(document.getElementById('ingredientCacheSearch')?.value||'').toLowerCase().trim();const list=state.ingredientCache.filter(i=>`${i.name} ${i.brand} ${(i.aliases||[]).join(' ')} ${i.source}`.toLowerCase().includes(q)).slice(0,80);const el=document.getElementById('ingredientCacheList');if(el)el.innerHTML=ingredientCacheListHtml(list);}
function parseMeasuresText(value){const out={};String(value||'').split(/\n+/).forEach(line=>{const [u,g]=line.split('=').map(x=>x.trim());if(u&&toNum(g)>0)out[canonicalUnit(u)]=toNum(g);});return out;}
function useSourceNutrition(){
  const n=recipeDraft?.sourceNutrition||{};if(!Object.keys(n).length)return;recipeDraft.calculateFromIngredients=false;
  const servings=Math.max(1,toNum(recipeDraft.servings));const basis=String(n.basis||'perServing');const multiplier=basis==='total'?1:servings;
  const number=v=>toNum(String(v||'').match(/[\d.]+/)?.[0]);recipeDraft.totalKcal=number(n.kcal)*multiplier;recipeDraft.protein=number(n.protein)*multiplier;recipeDraft.carbs=number(n.carbs)*multiplier;recipeDraft.fat=number(n.fat)*multiplier;recipeDraft.fibre=number(n.fibre)*multiplier;recipeDraft.sodiumMg=number(n.sodiumMg)*multiplier;renderRecipeBuilderModal();showToast('Source nutrition copied; verify its serving basis');
}
function openExternalSource(url){try{const parsed=new URL(url);if(!/^https?:$/.test(parsed.protocol))throw new Error();window.open(parsed.href,'_blank','noopener');}catch{showToast('Invalid source URL');}}
function openRecipeImportHub(){
  showModal(`<div class="card-title"><span>Import recipes</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="import-option-grid">
      <section class="import-option"><div class="import-icon">↗</div><div><strong>Recipe website</strong><div class="small muted">Paste a URL or share a recipe page to Lift & Cut. Structured recipe data is extracted through your private Apps Script.</div></div><form class="stack" onsubmit="importRecipeFromUrl(event)"><input id="recipeUrlInput" type="url" required placeholder="https://example.com/recipe"><button type="submit">Import from URL</button></form></section>
      <section class="import-option"><div class="import-icon">EP</div><div><strong>EPUB cookbook</strong><div class="small muted">Processed locally on this device. Choose which detected recipes to keep.</div></div><label class="button secondary file-button">Choose EPUB<input type="file" accept=".epub,application/epub+zip" onchange="handleEpubFile(event)" hidden></label></section>
      <section class="import-option"><div class="import-icon">¶</div><div><strong>Paste recipe text</strong><div class="small muted">Fallback for blocked websites, emails or copied cookbook text.</div></div><button class="ghost" onclick="openPasteRecipeImport()">Paste text</button></section>
    </div>
    <div class="notice" style="margin-top:10px">Imported recipes remain in your private phone and Sheet data. Review ingredient matches and serving sizes before using the calculated nutrition.</div>`);
}
async function importRecipeFromUrl(event,urlOverride=''){
  event?.preventDefault();const url=(urlOverride||document.getElementById('recipeUrlInput')?.value||'').trim();if(!url)return showToast('Enter a recipe URL');
  if(!state.settings.syncUrl||!state.settings.syncKey)return showModal(`<div class="card-title"><span>Google Sheets backend required</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">Website importing requires the v2.3 Apps Script update. EPUB and pasted-text imports work entirely on the phone.</div><button style="margin-top:10px" onclick="closeModal();setPage('settings')">Open sync settings</button>`);
  if(recipeImportBusy)return;recipeImportBusy=true;showModal('<div class="card-title"><span>Importing recipe</span></div><div class="import-progress"><div class="spinner"></div><div>Reading structured recipe data…</div></div>');
  try{const result=await jsonpRequest({action:'recipe-import',key:state.settings.syncKey,url},40000);if(!result?.ok||!result.recipe)throw new Error(result?.error||'No recipe data was found');recipeDraft=recipeFromImportedData(result.recipe,'Website');autoMatchRecipeIngredients(recipeDraft);renderRecipeBuilderModal();showToast('Recipe imported — review ingredient matches');}
  catch(error){showModal(`<div class="card-title"><span>Import could not complete</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">${esc(error.message||'Website import failed')}</div><div class="button-row" style="margin-top:10px"><button onclick="openPasteRecipeImport()">Paste recipe text</button><button class="ghost" onclick="openRecipeImportHub()">Try another URL</button></div>`);}finally{recipeImportBusy=false;}
}
function recipeFromImportedData(data,sourceType='Website'){
  const recipe={id:'',name:data.name||'Imported recipe',category:'Imported',servings:toNum(data.servings)||1,totalKcal:0,protein:0,carbs:0,fat:0,fibre:0,sodiumMg:0,rflFriendly:'No',favourite:false,noBellPeppers:Boolean(state.settings.noBellPeppers),noShellfish:Boolean(state.settings.noShellfish),instructions:data.instructions||'',notes:'',ingredients:(data.ingredients||[]).map(line=>{const parsed=parseIngredientLine(line);return {id:uid('ring'),ingredientId:'',name:parsed.name,sourceLine:line,amount:parsed.amount,unit:parsed.unit||'',grams:'',matchStatus:'unmatched',matchConfidence:0,kcal:'',protein:'',carbs:'',fat:'',fibre:'',sodiumMg:'',notes:parsed.notes||'',updatedAt:nowISO()};}),calculateFromIngredients:true,sourceType,sourceName:data.sourceName||'',sourceUrl:data.sourceUrl||'',sourceAuthor:data.author||'',sourceBook:data.bookTitle||'',importedAt:nowISO(),prepTime:data.prepTime||'',cookTime:data.cookTime||'',totalTime:data.totalTime||'',yieldText:data.yieldText||'',finishedWeightG:'',nutritionConfidence:'Low',importStatus:'Needs review',tags:Array.isArray(data.tags)?data.tags:[],imageUrl:data.imageUrl||'',sourceNutrition:data.nutrition||{},updatedAt:nowISO()};normaliseRecipeRecord(recipe);return recipe;
}
function openPasteRecipeImport(){
  showModal(`<div class="card-title"><span>Paste recipe text</span><button class="ghost compact" onclick="openRecipeImportHub()">Back</button></div><form class="stack" onsubmit="importPastedRecipe(event)"><div class="notice">Include the title, an Ingredients heading, and a Method or Instructions heading where possible.</div><textarea id="pastedRecipeText" style="min-height:280px" required placeholder="Chicken casserole\n\nIngredients\n500 g chicken breast\n1 tbsp olive oil\n...\n\nInstructions\n1. ..."></textarea><button type="submit">Review imported recipe</button></form>`);
}
function importPastedRecipe(event){event.preventDefault();const data=parsePastedRecipe(document.getElementById('pastedRecipeText').value);if(data.ingredients.length<1)return showToast('No ingredient lines were detected');recipeDraft=recipeFromImportedData(data,'Pasted text');autoMatchRecipeIngredients(recipeDraft);renderRecipeBuilderModal();}
function parsePastedRecipe(text){
  const lines=String(text||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);const ingredientHeading=/^ingredients?\b/i,instructionHeading=/^(method|directions?|instructions?|preparation|steps?)\b/i,servingLine=/^(?:serves?|servings?|yield|makes)\b/i;let mode='title',title='',ingredients=[],instructions=[],servings=1,yieldText='';
  for(const line of lines){if(ingredientHeading.test(line)){mode='ingredients';continue;}if(instructionHeading.test(line)){mode='instructions';continue;}if(servingLine.test(line)){yieldText=line;servings=toNum(line.match(/[\d.]+/)?.[0])||servings;continue;}if(!title){title=line;continue;}if(mode==='ingredients')ingredients.push(line);else if(mode==='instructions')instructions.push(line);}
  if(!ingredients.length){const split=lines.findIndex(x=>/^\d+[.)]\s+/.test(x));ingredients=lines.slice(1,split>1?split:Math.min(lines.length,8)).filter(x=>!servingLine.test(x));instructions=split>1?lines.slice(split):[];}
  return {name:title||'Imported recipe',ingredients,instructions:instructions.join('\n'),servings,yieldText,sourceName:'Pasted text',sourceUrl:'',nutrition:{}};
}
async function handleEpubFile(event){
  const file=event.target.files?.[0];if(!file)return;if(typeof JSZip==='undefined')return showToast('EPUB reader library is unavailable');
  showModal('<div class="card-title"><span>Reading EPUB</span></div><div class="import-progress"><div class="spinner"></div><div>Scanning cookbook chapters locally…</div></div>');
  try{const result=await extractRecipesFromEpub(file);epubImportCandidates=result.recipes;epubImportMeta=result.meta;if(!epubImportCandidates.length)throw new Error('No clear recipe sections were detected in this EPUB');showEpubReview();}
  catch(error){showModal(`<div class="card-title"><span>EPUB import</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice warn">${esc(error.message||'The EPUB could not be read')}</div><button style="margin-top:10px" onclick="openRecipeImportHub()">Back to import options</button>`);}
}
function resolveZipPath(base,relative){const parts=(base?base.split('/').slice(0,-1):[]).concat(String(relative||'').split('/'));const out=[];for(const p of parts){if(!p||p==='.')continue;if(p==='..')out.pop();else out.push(p);}return out.join('/');}
async function extractRecipesFromEpub(file){
  const zip=await JSZip.loadAsync(file);let opfPath='';const container=await zip.file('META-INF/container.xml')?.async('text').catch(()=>null);if(container){const doc=new DOMParser().parseFromString(container,'application/xml');opfPath=doc.querySelector('rootfile')?.getAttribute('full-path')||'';}if(!opfPath)opfPath=Object.keys(zip.files).find(x=>x.toLowerCase().endsWith('.opf'))||'';if(!opfPath)throw new Error('This file does not contain a readable EPUB package document.');
  const opfText=await zip.file(opfPath)?.async('text');const opf=new DOMParser().parseFromString(opfText,'application/xml');const byTag=name=>[...opf.getElementsByTagNameNS('*',name)];const title=byTag('title')[0]?.textContent?.trim()||file.name.replace(/\.epub$/i,'');const author=byTag('creator')[0]?.textContent?.trim()||'';const manifest={};byTag('item').forEach(item=>manifest[item.getAttribute('id')]={href:item.getAttribute('href'),type:item.getAttribute('media-type')});let hrefs=byTag('itemref').map(x=>manifest[x.getAttribute('idref')]?.href).filter(Boolean);if(!hrefs.length)hrefs=Object.values(manifest).filter(x=>/xhtml|html/.test(x.type||'')).map(x=>x.href);hrefs=hrefs.slice(0,600);
  const recipes=[],seen=new Set();for(const href of hrefs){const path=resolveZipPath(opfPath,href),entry=zip.file(path);if(!entry)continue;const html=await entry.async('text');const doc=new DOMParser().parseFromString(html,'text/html');for(const data of extractRecipesFromHtmlDocument(doc)){const key=`${normaliseFoodName(data.name)}|${(data.ingredients||[]).slice(0,3).map(normaliseFoodName).join('|')}`;if(!data.name||data.ingredients.length<2||seen.has(key))continue;seen.add(key);recipes.push({...data,sourceName:title,bookTitle:title,author});if(recipes.length>=300)break;}if(recipes.length>=300)break;}
  return {meta:{title,author,fileName:file.name},recipes};
}
function extractRecipesFromHtmlDocument(doc){
  const out=[];doc.querySelectorAll('script[type="application/ld+json"]').forEach(script=>{try{const parsed=JSON.parse(script.textContent);collectStructuredRecipeObjects(parsed).forEach(obj=>out.push(structuredRecipeObjectToData(obj)));}catch{}});if(out.length)return out;
  const blocks=[...doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li')].map(el=>({tag:el.tagName.toLowerCase(),text:el.textContent.replace(/\s+/g,' ').trim()})).filter(x=>x.text);const isHeading=b=>/^h[1-6]$/.test(b.tag);const ingredientRe=/^ingredients?\b/i,instructionRe=/^(method|directions?|instructions?|preparation|steps?)\b/i;
  blocks.forEach((block,i)=>{if(!isHeading(block)||!ingredientRe.test(block.text))return;let title='';for(let j=i-1;j>=0;j--){if(isHeading(blocks[j])&&!ingredientRe.test(blocks[j].text)){title=blocks[j].text;break;}}let methodIndex=-1;for(let j=i+1;j<blocks.length;j++){if(isHeading(blocks[j])&&instructionRe.test(blocks[j].text)){methodIndex=j;break;}if(isHeading(blocks[j])&&j>i+30)break;}if(methodIndex<0)return;const ingredients=blocks.slice(i+1,methodIndex).filter(x=>!isHeading(x)).map(x=>x.text).filter(x=>x.length<240);let end=blocks.length;for(let j=methodIndex+1;j<blocks.length;j++){if(isHeading(blocks[j])&&j>methodIndex+1){end=j;break;}}const instructions=blocks.slice(methodIndex+1,end).filter(x=>!isHeading(x)).map(x=>x.text).join('\n');if(title&&ingredients.length>=2&&instructions)out.push({name:title,ingredients,instructions,servings:1,nutrition:{}});});return out;
}
function collectStructuredRecipeObjects(value,out=[]){if(Array.isArray(value))value.forEach(x=>collectStructuredRecipeObjects(x,out));else if(value&&typeof value==='object'){const types=Array.isArray(value['@type'])?value['@type']:[value['@type']];if(types.some(x=>String(x).toLowerCase()==='recipe'))out.push(value);if(value['@graph'])collectStructuredRecipeObjects(value['@graph'],out);}return out;}
function structuredRecipeObjectToData(obj){const instructions=flattenRecipeInstructions(obj.recipeInstructions);const author=typeof obj.author==='string'?obj.author:Array.isArray(obj.author)?obj.author.map(x=>x.name||x).join(', '):obj.author?.name||'';const image=Array.isArray(obj.image)?obj.image[0]:typeof obj.image==='string'?obj.image:obj.image?.url||'';return {name:obj.name||'',ingredients:obj.recipeIngredient||obj.ingredients||[],instructions,servings:parseServingCount(obj.recipeYield),yieldText:Array.isArray(obj.recipeYield)?obj.recipeYield.join(', '):String(obj.recipeYield||''),prepTime:formatIsoDuration(obj.prepTime),cookTime:formatIsoDuration(obj.cookTime),totalTime:formatIsoDuration(obj.totalTime),author,imageUrl:image,tags:String(obj.recipeCategory||'').split(',').map(x=>x.trim()).filter(Boolean),nutrition:normaliseSourceNutrition(obj.nutrition||{})};}
function flattenRecipeInstructions(value){if(!value)return '';if(typeof value==='string')return value;if(Array.isArray(value))return value.map(flattenRecipeInstructions).filter(Boolean).join('\n');if(typeof value==='object'){if(value.itemListElement)return flattenRecipeInstructions(value.itemListElement);return value.text||value.name||'';}return '';}
function parseServingCount(value){const text=Array.isArray(value)?value.join(' '):String(value||'');return toNum(text.match(/[\d.]+/)?.[0])||1;}
function formatIsoDuration(value){const s=String(value||'');const m=s.match(/^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?/i);if(!m)return s;const parts=[];if(toNum(m[1]))parts.push(`${m[1]} hr`);if(toNum(m[2]))parts.push(`${m[2]} min`);return parts.join(' ');}
function normaliseSourceNutrition(n){return {basis:'perServing',kcal:n.calories||n.energy||'',protein:n.proteinContent||'',carbs:n.carbohydrateContent||'',fat:n.fatContent||'',fibre:n.fiberContent||n.fibreContent||'',sodiumMg:n.sodiumContent||''};}
function showEpubReview(){
  const duplicateNames=new Set(state.recipes.map(r=>normaliseFoodName(r.name)));showModal(`<div class="card-title"><span>EPUB recipes</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice"><strong>${esc(epubImportMeta?.title||'Cookbook')}</strong>${epubImportMeta?.author?` · ${esc(epubImportMeta.author)}`:''}<br>${epubImportCandidates.length} likely recipes detected. Select recipes to add; nutrition is calculated only after ingredient matching.</div><div class="button-row" style="margin:10px 0"><button class="secondary compact" onclick="toggleAllEpubRecipes(true)">Select all</button><button class="ghost compact" onclick="toggleAllEpubRecipes(false)">Clear</button></div><div class="epub-review-list">${epubImportCandidates.map((r,i)=>{const duplicate=duplicateNames.has(normaliseFoodName(r.name));return `<label class="epub-candidate"><input type="checkbox" data-epub-index="${i}" ${duplicate?'':'checked'}><span><strong>${esc(r.name)}</strong><small>${r.ingredients.length} ingredients${duplicate?' · possible duplicate':''}</small><small>${esc(r.ingredients.slice(0,2).join(' · '))}</small></span><span class="pill ${duplicate?'warn':'gray'}">${duplicate?'Duplicate?':'Import'}</span></label>`;}).join('')}</div><button style="margin-top:10px" onclick="commitEpubImport()">Import selected recipes</button>`);
}
function toggleAllEpubRecipes(value){document.querySelectorAll('[data-epub-index]').forEach(x=>x.checked=value);}
function commitEpubImport(){const indexes=[...document.querySelectorAll('[data-epub-index]:checked')].map(x=>toNum(x.dataset.epubIndex));if(!indexes.length)return showToast('Select at least one recipe');let added=0,review=0;indexes.forEach(i=>{const data=epubImportCandidates[i];if(!data)return;const recipe=recipeFromImportedData(data,'EPUB');autoMatchRecipeIngredients(recipe);const confidence=recipeNutritionConfidence(recipe);recipe.nutritionConfidence=confidence.label;recipe.importStatus=confidence.label==='Low'?'Needs review':'Ready';recipe.id=uid('recipe');state.recipes.push(recipe);added++;if(recipe.importStatus==='Needs review')review++;});saveState();closeModal();setPage('diet');showToast(`${added} recipes imported${review?` · ${review} need review`:''}`,5000);}
async function openStandaloneFoodSearch(){showModal(`<div class="card-title"><span>Reference food search</span><button class="ghost compact" onclick="closeModal()">Close</button></div><label>Food or product<input id="standaloneFoodQuery" placeholder="e.g. basmati rice dry"></label><button style="margin-top:8px" onclick="searchStandaloneReferenceFoods()">Search</button><div id="standaloneFoodResults" style="margin-top:10px"></div>`);}
async function searchStandaloneReferenceFoods(){const q=(document.getElementById('standaloneFoodQuery')?.value||'').trim(),box=document.getElementById('standaloneFoodResults');if(q.length<2)return showToast('Enter a food name');if(!state.settings.syncUrl||!state.settings.syncKey)return showToast('Update the Google Sheets backend first');box.innerHTML='<div class="empty">Searching…</div>';try{const result=await jsonpRequest({action:'food-search',key:state.settings.syncKey,q,source:'all'},35000);foodSearchResults=result.foods||[];box.innerHTML=`<div class="list">${foodSearchResults.map((item,i)=>`<button class="food-match-card" onclick="saveStandaloneReferenceFood(${i})"><span><strong>${esc(item.name)}</strong><small>${esc(item.brand||item.source)}</small><small>${round(item.kcal,0)} kcal · ${round(item.protein,1)}P · ${round(item.carbs,1)}C · ${round(item.fat,1)}F per 100 g</small></span><span class="pill gray">Save</span></button>`).join('')||'<div class="empty">No results.</div>'}</div>`;}catch(error){box.innerHTML=`<div class="notice warn">${esc(error.message)}</div>`;}}
function saveStandaloneReferenceFood(i){const result=foodSearchResults[i];if(!result)return;state.ingredientCache.push({id:uid('ingredient'),name:result.name,brand:result.brand||'',foodState:result.foodState||'',servingDescription:'100 g',baseAmount:100,baseUnit:'g',densityGPerMl:'',kcal:toNum(result.kcal),protein:toNum(result.protein),carbs:toNum(result.carbs),fat:toNum(result.fat),fibre:toNum(result.fibre),sodiumMg:toNum(result.sodiumMg),aliases:[],commonMeasures:{},source:result.source,sourceId:result.sourceId||'',sourceUrl:result.sourceUrl||'',confirmed:true,notes:'Imported from reference search; verify current branded labels.',updatedAt:nowISO()});saveState();closeModal();render();showToast('Reference food saved');}
function handleSharedRecipeTarget(){const params=new URLSearchParams(location.search);const sharedUrl=params.get('url')||extractFirstUrl(params.get('text'));if(!sharedUrl&&!params.get('share'))return;history.replaceState({},'',`${location.pathname}?page=diet`);page='diet';render();setTimeout(()=>sharedUrl?importRecipeFromUrl(null,sharedUrl):openRecipeImportHub(),250);}
function extractFirstUrl(text){return String(text||'').match(/https?:\/\/[^\s]+/i)?.[0]||'';}

function bestRecords() {
  const map=new Map();
  state.workoutLogs.filter(x=>!x.warmup && toNum(x.estimated1RM)>0).forEach(row=>{
    const prev=map.get(row.exercise);
    if(!prev || toNum(row.estimated1RM)>toNum(prev.estimated1RM)) map.set(row.exercise,row);
  });
  return [...map.values()].sort((a,b)=>toNum(b.estimated1RM)-toNum(a.estimated1RM));
}
function renderProgress() {
  const metrics=[...state.bodyMetrics].filter(x=>x.date).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  const latest=metrics[metrics.length-1];
  const first=metrics.find(x=>toNum(x.weightKg)>0);
  const target=toNum(state.settings.targetWeightKg);
  const lost=first?.weightKg&&latest?.weightKg?toNum(first.weightKg)-toNum(latest.weightKg):0;
  const totalGoal=first?.weightKg&&target?toNum(first.weightKg)-target:0;
  const goalPct=totalGoal>0?clamp(lost/totalGoal*100,0,100):0;
  const checkins=[...state.dailyCheckins].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,7);
  const phases=[...state.dietPhases].sort((a,b)=>String(b.startDate).localeCompare(String(a.startDate)));
  const cardio=[...state.cardioLogs].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,10);
  const prs=bestRecords().slice(0,12);
  return `<div class="grid">
    <div class="card highlight">
      <div class="card-title"><span>Body progress</span><button onclick="openMetricModal()">＋ Measurement</button></div>
      <div class="cards">
        <div><div class="small muted">Latest</div><div class="kpi">${latest?.weightKg?round(latest.weightKg,1):'—'}</div><div class="small">kg</div></div>
        <div><div class="small muted">7-day average</div><div class="kpi">${rollingWeightAverage(7)?round(rollingWeightAverage(7),1):'—'}</div><div class="small">kg</div></div>
      </div>
      ${totalGoal>0?`<div style="margin-top:12px"><div class="metric-line"><span class="small">Progress from ${round(first.weightKg,1)} kg to ${round(target,1)} kg</span><strong class="small">${round(goalPct,0)}%</strong></div><div class="progress"><span style="width:${goalPct}%"></span></div></div>`:''}
      <div style="margin-top:12px">${lineChartSvg(metrics.slice(-40),'weightKg',{label:'Body weight'})}</div>
      <div class="button-row" style="margin-top:10px"><button class="secondary" onclick="openCheckinModal()">Daily check-in</button><button class="ghost" onclick="openCardioModal()">Log cardio</button></div>
    </div>

    <details class="card" open>
      <summary class="card-title"><span>Measurements</span><span class="pill gray">${metrics.length}</span></summary>
      ${metrics.length?`<div class="list">${[...metrics].reverse().slice(0,12).map(m=>`<div class="row">
        <div class="row-head"><strong>${esc(formatDate(m.date,{day:'numeric',month:'short',year:'numeric'}))}</strong><button class="danger compact" onclick="deleteMetric('${esc(m.id)}')">Delete</button></div>
        <div class="small">${m.weightKg?`${round(m.weightKg,1)} kg`:''}${m.waistCm?` · waist ${round(m.waistCm,1)} cm`:''}${m.bodyFatPct?` · ${round(m.bodyFatPct,1)}% BF`:''}</div>
        <div class="tiny muted">${[m.chestCm&&`chest ${round(m.chestCm,1)}`,m.hipsCm&&`hips ${round(m.hipsCm,1)}`,m.armCm&&`arm ${round(m.armCm,1)}`,m.thighCm&&`thigh ${round(m.thighCm,1)}`,m.restingHR&&`RHR ${round(m.restingHR,0)}`].filter(Boolean).join(' · ')}</div>
        ${m.notes?`<div class="tiny muted">${esc(m.notes)}</div>`:''}
      </div>`).join('')}</div>`:`<div class="empty">No measurements yet.</div>`}
    </details>

    <details class="card" open>
      <summary class="card-title"><span>Diet phases</span><button class="secondary compact" onclick="event.preventDefault();openPhaseModal()">＋ Phase</button></summary>
      ${phases.length?`<div class="list">${phases.map(p=>`<div class="row">
        <div class="row-head"><div><strong>${esc(p.name)}</strong><div class="small muted">${esc(p.mode)} · ${esc(p.startDate)} → ${esc(p.actualEndDate||p.plannedEndDate||'ongoing')}</div></div><span class="pill ${p.status==='Active'?'good':'gray'}">${esc(p.status)}</span></div>
        <div class="small">Start ${p.startWeightKg?`${round(p.startWeightKg,1)} kg`:'—'}${p.endWeightKg?` · end ${round(p.endWeightKg,1)} kg`:''}${p.targetLossKg?` · target −${round(p.targetLossKg,1)} kg`:''}</div>
        ${p.notes?`<div class="tiny muted">${esc(p.notes)}</div>`:''}
        <div class="button-row">${p.status==='Active'?`<button class="secondary compact" onclick="endDietPhase('${esc(p.id)}')">End phase</button>`:''}<button class="ghost compact" onclick="openPhaseModal('${esc(p.id)}')">Edit</button><button class="danger compact" onclick="deleteDietPhase('${esc(p.id)}')">Delete</button></div>
      </div>`).join('')}</div>`:`<div class="empty">Track each normal-cut, maintenance, and RFL block separately.</div>`}
    </details>

    <details class="card">
      <summary class="card-title"><span>Daily readiness</span><span class="pill gray">${state.dailyCheckins.length}</span></summary>
      ${checkins.length?`<div class="list">${checkins.map(c=>`<div class="row">
        <div class="row-head"><strong>${esc(formatDate(c.date))}</strong><span class="pill ${toNum(c.dietAdherencePct)>=85?'good':'warn'}">${round(c.dietAdherencePct,0)||'—'}% adherence</span></div>
        <div class="small">${c.steps?`${round(c.steps,0)} steps · `:''}${c.sleepHrs?`${round(c.sleepHrs,1)}h sleep · `:''}${c.waterMl?`${round(c.waterMl,0)}ml water`:''}</div>
        <div class="tiny muted">Hunger ${c.hunger||'—'}/5 · Energy ${c.energy||'—'}/5 · Stress ${c.stress||'—'}/5 · Readiness ${c.trainingReadiness||'—'}/5</div>
      </div>`).join('')}</div>`:`<div class="empty">Use a quick check-in to connect sleep, hunger, adherence, and training performance.</div>`}
    </details>

    <details class="card">
      <summary class="card-title"><span>Strength records</span><span class="pill gray">estimated</span></summary>
      ${prs.length?`<div class="list">${prs.map(r=>`<div class="row"><div class="row-head"><strong>${esc(r.exercise)}</strong><span class="pill">${round(r.estimated1RM,1)} kg e1RM</span></div><div class="small muted">${round(r.weightKg,1)} × ${round(r.reps,0)} · ${esc(r.date)}</div></div>`).join('')}</div>`:`<div class="empty">Records appear after you log weighted sets.</div>`}
    </details>

    <details class="card">
      <summary class="card-title"><span>Cardio and walking</span><button class="secondary compact" onclick="event.preventDefault();openCardioModal()">＋ Log</button></summary>
      ${cardio.length?`<div class="list">${cardio.map(c=>`<div class="row"><div class="row-head"><strong>${esc(c.type)}</strong><span class="pill gray">${esc(formatDate(c.date))}</span></div><div class="small">${round(c.durationMin,0)} min${c.distanceKm?` · ${round(c.distanceKm,2)} km`:''}${c.steps?` · ${round(c.steps,0)} steps`:''} · ${esc(c.intensity||'')}</div></div>`).join('')}</div>`:`<div class="empty">Easy cardio and steps can be logged here.</div>`}
    </details>

    <details class="card" open>
      <summary class="card-title"><span>Progress photos</span><span class="pill gray">local only</span></summary>
      <div class="notice">Photos are compressed and stored only in this browser on this phone. They are excluded from Google Sheets sync, but included in a full JSON backup.</div>
      <label class="button secondary" style="margin:10px 0">Add photo<input type="file" accept="image/*" capture="environment" hidden onchange="addProgressPhoto(event)"></label>
      <div id="photoGrid" class="photo-grid"><div class="empty" style="grid-column:1/-1">Loading photos…</div></div>
    </details>
  </div>`;
}
function openMetricModal() {
  const latest=latestMetric();
  showModal(`<div class="card-title"><span>Add body measurement</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="addMetric(event)">
      <label>Date<input id="metricDate" type="date" value="${localDateISO()}"></label>
      <div class="split">
        <label>Weight kg<input id="metricWeight" type="number" step="0.1" inputmode="decimal" value=""></label>
        <label>Waist cm<input id="metricWaist" type="number" step="0.1" inputmode="decimal"></label>
        <label>Chest cm<input id="metricChest" type="number" step="0.1"></label>
        <label>Hips cm<input id="metricHips" type="number" step="0.1"></label>
        <label>Arm cm<input id="metricArm" type="number" step="0.1"></label>
        <label>Thigh cm<input id="metricThigh" type="number" step="0.1"></label>
        <label>Body-fat %<input id="metricBodyFat" type="number" step="0.1"></label>
        <label>Resting heart rate<input id="metricRhr" type="number" step="1"></label>
      </div>
      <label>Notes<input id="metricNotes" placeholder="Conditions, time of day, etc."></label>
      <button type="submit">Save measurement</button>
    </form>`);
}
function addMetric(event) {
  event.preventDefault();
  const weight=toNum(document.getElementById('metricWeight').value);
  const waist=toNum(document.getElementById('metricWaist').value);
  if(!weight&&!waist) return showToast('Enter at least weight or waist');
  state.bodyMetrics.push({
    id:uid('metric'),date:document.getElementById('metricDate').value||localDateISO(),
    weightKg:weight||'',waistCm:waist||'',chestCm:numOrBlank(document.getElementById('metricChest').value),
    hipsCm:numOrBlank(document.getElementById('metricHips').value),armCm:numOrBlank(document.getElementById('metricArm').value),
    thighCm:numOrBlank(document.getElementById('metricThigh').value),bodyFatPct:numOrBlank(document.getElementById('metricBodyFat').value),
    restingHR:numOrBlank(document.getElementById('metricRhr').value),notes:document.getElementById('metricNotes').value.trim(),updatedAt:nowISO()
  });
  saveState();closeModal();render();showToast('Measurement saved');
}
function deleteMetric(id) {
  if(!confirm('Delete this measurement?'))return;
  state.bodyMetrics=state.bodyMetrics.filter(x=>x.id!==id);saveState();render();
}
function openCheckinModal() {
  const existing=state.dailyCheckins.find(x=>x.date===localDateISO());
  showModal(`<div class="card-title"><span>Daily check-in</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveCheckin(event,'${esc(existing?.id||'')}')">
      <label>Date<input id="checkinDate" type="date" value="${esc(existing?.date||localDateISO())}"></label>
      <div class="split">
        <label>Steps<input id="checkinSteps" type="number" value="${esc(existing?.steps||'')}"></label>
        <label>Sleep hours<input id="checkinSleep" type="number" step="0.1" value="${esc(existing?.sleepHrs||'')}"></label>
        <label>Water ml<input id="checkinWater" type="number" step="100" value="${esc(existing?.waterMl||'')}"></label>
        <label>Diet adherence %<input id="checkinAdherence" type="number" min="0" max="100" value="${esc(existing?.dietAdherencePct||'')}"></label>
      </div>
      <div class="split">
        ${[['Hunger','hunger'],['Energy','energy'],['Stress','stress'],['Training readiness','readiness']].map(([label,key])=>`<label>${label} 1–5<select id="checkin_${key}"><option value="">—</option>${[1,2,3,4,5].map(v=>`<option ${v===toNum(existing?.[key==='readiness'?'trainingReadiness':key])?'selected':''}>${v}</option>`).join('')}</select></label>`).join('')}
      </div>
      <label>Notes<textarea id="checkinNotes">${esc(existing?.notes||'')}</textarea></label>
      <button type="submit">Save check-in</button>
    </form>`);
}
function saveCheckin(event,id) {
  event.preventDefault();
  let row=state.dailyCheckins.find(x=>x.id===id);
  if(!row){row={id:uid('checkin')};state.dailyCheckins.push(row);}
  Object.assign(row,{
    date:document.getElementById('checkinDate').value||localDateISO(),
    steps:numOrBlank(document.getElementById('checkinSteps').value),
    sleepHrs:numOrBlank(document.getElementById('checkinSleep').value),
    waterMl:numOrBlank(document.getElementById('checkinWater').value),
    hunger:numOrBlank(document.getElementById('checkin_hunger').value),
    energy:numOrBlank(document.getElementById('checkin_energy').value),
    stress:numOrBlank(document.getElementById('checkin_stress').value),
    dietAdherencePct:numOrBlank(document.getElementById('checkinAdherence').value),
    trainingReadiness:numOrBlank(document.getElementById('checkin_readiness').value),
    notes:document.getElementById('checkinNotes').value.trim(),updatedAt:nowISO()
  });
  saveState();closeModal();render();showToast('Check-in saved');
}
function openPhaseModal(id='') {
  const p=state.dietPhases.find(x=>x.id===id);
  showModal(`<div class="card-title"><span>${p?'Edit':'Start'} diet phase</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveDietPhase(event,'${esc(id)}')">
      <label>Name<input id="phaseName" required value="${esc(p?.name||'')}" placeholder="RFL block 1, maintenance break..."></label>
      <label>Mode<select id="phaseMode">${['Normal / moderate deficit','RFL / PSMF','Maintenance / transition','Custom'].map(x=>`<option ${x===p?.mode?'selected':''}>${x}</option>`).join('')}</select></label>
      <div class="split">
        <label>Start date<input id="phaseStart" type="date" value="${esc(p?.startDate||localDateISO())}"></label>
        <label>Planned end<input id="phasePlannedEnd" type="date" value="${esc(p?.plannedEndDate||'')}"></label>
        <label>Start weight kg<input id="phaseStartWeight" type="number" step="0.1" value="${esc(p?.startWeightKg||latestMetric()?.weightKg||'')}"></label>
        <label>Target loss kg<input id="phaseTargetLoss" type="number" step="0.1" value="${esc(p?.targetLossKg||'')}"></label>
      </div>
      <label>Refeed / break plan<input id="phaseRefeed" value="${esc(p?.refeedPlan||'')}" placeholder="Use the schedule from your RFL edition"></label>
      <label>Notes<textarea id="phaseNotes">${esc(p?.notes||'')}</textarea></label>
      <button type="submit">Save phase</button>
    </form>`);
}
function saveDietPhase(event,id) {
  event.preventDefault();
  let p=state.dietPhases.find(x=>x.id===id);
  if(!p){p={id:uid('phase'),status:'Active'};state.dietPhases.push(p);}
  Object.assign(p,{
    name:document.getElementById('phaseName').value.trim(),
    mode:document.getElementById('phaseMode').value,
    startDate:document.getElementById('phaseStart').value,
    plannedEndDate:document.getElementById('phasePlannedEnd').value,
    startWeightKg:numOrBlank(document.getElementById('phaseStartWeight').value),
    targetLossKg:numOrBlank(document.getElementById('phaseTargetLoss').value),
    refeedPlan:document.getElementById('phaseRefeed').value.trim(),
    notes:document.getElementById('phaseNotes').value.trim(),updatedAt:nowISO()
  });
  if(p.status==='Active') state.dietPhases.filter(x=>x.id!==p.id&&x.status==='Active').forEach(x=>{x.status='Completed';x.actualEndDate=p.startDate;markUpdated(x);});
  state.settings.dietMode=p.mode;
  if(p.mode==='RFL / PSMF'&&state.programs.some(x=>x.id==='RFL2')){state.settings.activeProgram='RFL2';state.settings.lastSession=sessionKey('RFL2',state.programs.find(x=>x.id==='RFL2').sessions[0]?.id||'');}
  saveState();closeModal();render();showToast('Diet phase saved');
}
function endDietPhase(id) {
  const p=state.dietPhases.find(x=>x.id===id);if(!p)return;
  p.status='Completed';p.actualEndDate=localDateISO();p.endWeightKg=latestMetric()?.weightKg||'';markUpdated(p);
  state.settings.dietMode='Maintenance / transition';
  saveState();render();showToast('Phase completed');
}
function deleteDietPhase(id) {
  if(!confirm('Delete this diet phase?'))return;
  state.dietPhases=state.dietPhases.filter(x=>x.id!==id);saveState();render();
}
function openCardioModal() {
  showModal(`<div class="card-title"><span>Log cardio</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <form class="stack" onsubmit="saveCardio(event)">
      <div class="split"><label>Date<input id="cardioDate" type="date" value="${localDateISO()}"></label><label>Type<select id="cardioType">${['Brisk walk','Treadmill','Exercise bike','Outdoor cycling','Rowing','Other'].map(x=>`<option>${x}</option>`).join('')}</select></label></div>
      <div class="split">
        <label>Duration min<input id="cardioDuration" type="number" step="1"></label>
        <label>Distance km<input id="cardioDistance" type="number" step="0.01"></label>
        <label>Average HR<input id="cardioHr" type="number" step="1"></label>
        <label>Steps<input id="cardioSteps" type="number" step="1"></label>
      </div>
      <label>Intensity<select id="cardioIntensity"><option>Easy / conversational</option><option>Moderate</option><option>Hard</option></select></label>
      <label>Notes<input id="cardioNotes"></label>
      <button type="submit">Save cardio</button>
    </form>`);
}
function saveCardio(event) {
  event.preventDefault();
  const duration=toNum(document.getElementById('cardioDuration').value);
  if(!duration)return showToast('Enter a duration');
  state.cardioLogs.push({
    id:uid('cardio'),date:document.getElementById('cardioDate').value||localDateISO(),
    type:document.getElementById('cardioType').value,durationMin:duration,
    distanceKm:numOrBlank(document.getElementById('cardioDistance').value),
    avgHR:numOrBlank(document.getElementById('cardioHr').value),
    steps:numOrBlank(document.getElementById('cardioSteps').value),
    intensity:document.getElementById('cardioIntensity').value,
    notes:document.getElementById('cardioNotes').value.trim(),updatedAt:nowISO()
  });
  saveState();closeModal();render();showToast('Cardio saved');
}

function openPhotoDb() {
  if(photoDbPromise)return photoDbPromise;
  photoDbPromise=new Promise((resolve,reject)=>{
    const request=indexedDB.open(PHOTO_DB,1);
    request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(PHOTO_STORE))db.createObjectStore(PHOTO_STORE,{keyPath:'id'});};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
  return photoDbPromise;
}
async function putPhoto(record) {
  const db=await openPhotoDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(PHOTO_STORE,'readwrite');tx.objectStore(PHOTO_STORE).put(record);
    tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
  });
}
async function getPhoto(id) {
  const db=await openPhotoDb();
  return new Promise((resolve,reject)=>{
    const req=db.transaction(PHOTO_STORE,'readonly').objectStore(PHOTO_STORE).get(id);
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
async function getAllPhotos() {
  const db=await openPhotoDb();
  return new Promise((resolve,reject)=>{
    const req=db.transaction(PHOTO_STORE,'readonly').objectStore(PHOTO_STORE).getAll();
    req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);
  });
}
async function deletePhotoBlob(id) {
  const db=await openPhotoDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(PHOTO_STORE,'readwrite');tx.objectStore(PHOTO_STORE).delete(id);
    tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
  });
}
function compressImage(file,maxSize=1200,quality=.78) {
  return new Promise((resolve,reject)=>{
    const img=new Image();const url=URL.createObjectURL(file);
    img.onload=()=>{
      let w=img.width,h=img.height;const scale=Math.min(1,maxSize/Math.max(w,h));w=Math.round(w*scale);h=Math.round(h*scale);
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      canvas.toBlob(blob=>{URL.revokeObjectURL(url);blob?resolve(blob):reject(new Error('Compression failed'));},'image/jpeg',quality);
    };
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Image load failed'));};img.src=url;
  });
}
async function addProgressPhoto(event) {
  const file=event.target.files?.[0];if(!file)return;
  try{
    const blob=await compressImage(file);const id=uid('photo');
    await putPhoto({id,blob,createdAt:nowISO()});
    state.progressPhotos.push({id,date:localDateISO(),note:'',updatedAt:nowISO()});
    saveState();render();showToast('Photo saved locally');
  }catch(error){console.error(error);showToast('Could not save photo');}
}
async function refreshPhotoGrid() {
  const grid=document.getElementById('photoGrid');if(!grid)return;
  if(!state.progressPhotos.length){grid.innerHTML='<div class="empty" style="grid-column:1/-1">No photos saved.</div>';return;}
  const html=[];
  for(const meta of [...state.progressPhotos].sort((a,b)=>String(b.date).localeCompare(String(a.date)))){
    const item=await getPhoto(meta.id).catch(()=>null);
    if(!item?.blob)continue;
    const url=URL.createObjectURL(item.blob);
    html.push(`<div class="photo-card"><img src="${url}" alt="Progress photo ${esc(meta.date)}" onclick="viewProgressPhoto('${esc(meta.id)}')"><button onclick="deleteProgressPhoto('${esc(meta.id)}')">×</button></div>`);
  }
  grid.innerHTML=html.join('')||'<div class="empty" style="grid-column:1/-1">Photo files are unavailable in this browser.</div>';
}
async function viewProgressPhoto(id) {
  const item=await getPhoto(id);const meta=state.progressPhotos.find(x=>x.id===id);if(!item?.blob)return;
  const url=URL.createObjectURL(item.blob);
  showModal(`<div class="card-title"><span>${esc(meta?.date||'Progress photo')}</span><button class="ghost compact" onclick="closeModal()">Close</button></div><img src="${url}" alt="Progress photo" style="width:100%;border-radius:14px"><label style="margin-top:10px">Note<input value="${esc(meta?.note||'')}" onchange="updatePhotoNote('${esc(id)}',this.value)"></label>`);
}
function updatePhotoNote(id,value) {
  const meta=state.progressPhotos.find(x=>x.id===id);if(!meta)return;meta.note=value;markUpdated(meta);saveState();showToast('Photo note saved');
}
async function deleteProgressPhoto(id) {
  if(!confirm('Delete this local photo?'))return;
  await deletePhotoBlob(id).catch(()=>{});
  state.progressPhotos=state.progressPhotos.filter(x=>x.id!==id);saveState();render();showToast('Photo deleted');
}

function renderSettings() {
  const linked=Boolean(state.settings.syncUrl&&state.settings.syncKey);
  const syncAge=state.meta.lastCloudSyncAt?`${formatDate(state.meta.lastCloudSyncAt.slice(0,10),{day:'numeric',month:'short',year:'numeric'})} ${state.meta.lastCloudSyncAt.slice(11,16)}`:'Never';
  return `<div class="grid">
    <div class="card">
      <div class="card-title"><span>Profile and mode</span><span class="pill gray">local</span></div>
      <div class="split">
        <label>Name<input value="${esc(state.settings.profileName)}" onchange="updateSetting('profileName',this.value)"></label>
        <label>Age<input type="number" value="${esc(state.settings.age)}" onchange="updateSetting('age',this.value)"></label>
        <label>Height cm<input type="number" step="0.1" value="${esc(state.settings.heightCm)}" onchange="updateSetting('heightCm',this.value)"></label>
        <label>Target weight kg<input type="number" step="0.1" value="${esc(state.settings.targetWeightKg)}" onchange="updateSetting('targetWeightKg',this.value)"></label>
      </div>
      <label>Diet mode<select onchange="setDietMode(this.value)">${['Normal / moderate deficit','RFL / PSMF','Maintenance / transition'].map(x=>`<option ${x===state.settings.dietMode?'selected':''}>${x}</option>`).join('')}</select></label>
      <div class="split" style="margin-top:10px">
        <label class="inline-check"><input type="checkbox" ${state.settings.noBellPeppers?'checked':''} onchange="updateSetting('noBellPeppers',this.checked)"> Avoid bell peppers</label>
        <label class="inline-check"><input type="checkbox" ${state.settings.noShellfish?'checked':''} onchange="updateSetting('noShellfish',this.checked)"> Avoid shellfish</label>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>Normal-cut targets</span></div>
      <div class="split">
        <label>Calories<input type="number" value="${esc(state.settings.normalCalorieTarget)}" onchange="updateSetting('normalCalorieTarget',this.value)"></label>
        <label>Protein g<input type="number" value="${esc(state.settings.normalProteinTarget)}" onchange="updateSetting('normalProteinTarget',this.value)"></label>
        <label>Carbs g<input type="number" value="${esc(state.settings.normalCarbTarget)}" onchange="updateSetting('normalCarbTarget',this.value)"></label>
        <label>Fat g<input type="number" value="${esc(state.settings.normalFatTarget)}" onchange="updateSetting('normalFatTarget',this.value)"></label>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>RFL targets</span><span class="pill warn">manual</span></div>
      <div class="notice warn">Enter only the values calculated from your edition of Lyle McDonald’s RFL. This app does not invent an RFL prescription.</div>
      <div class="split" style="margin-top:10px">
        <label>Calories<input type="number" value="${esc(state.settings.rflCalorieTarget)}" onchange="updateSetting('rflCalorieTarget',this.value)"></label>
        <label>Protein g<input type="number" value="${esc(state.settings.rflProteinTarget)}" onchange="updateSetting('rflProteinTarget',this.value)"></label>
        <label>Carbs g<input type="number" value="${esc(state.settings.rflCarbTarget)}" onchange="updateSetting('rflCarbTarget',this.value)"></label>
        <label>Fat g<input type="number" value="${esc(state.settings.rflFatTarget)}" onchange="updateSetting('rflFatTarget',this.value)"></label>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>Daily recovery targets</span></div>
      <div class="triple">
        <label>Steps<input type="number" step="500" value="${esc(state.settings.stepsTarget)}" onchange="updateSetting('stepsTarget',this.value)"></label>
        <label>Sleep hours<input type="number" step="0.1" value="${esc(state.settings.sleepTargetHrs)}" onchange="updateSetting('sleepTargetHrs',this.value)"></label>
        <label>Water ml<input type="number" step="100" value="${esc(state.settings.waterTargetMl)}" onchange="updateSetting('waterTargetMl',this.value)"></label>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>Home-gym equipment</span><span class="pill good">${availableExerciseCount()} exercises ready</span></div>
      <div class="small muted">${esc(state.settings.equipmentProfileName||'Custom home gym')} · ${(state.settings.availableEquipment||[]).length} equipment items selected. Exercise lists, substitutions and program checks use this profile.</div>
      <div class="button-row" style="margin-top:10px"><button onclick="openEquipmentManager()">Manage equipment</button><button class="secondary" onclick="setPage('program');setProgramView('library')">View compatible exercises</button></div>
    </div>

    <div class="card" id="syncSettingsCard">
      <div class="card-title"><span>Google Sheets sync</span><span class="pill ${linked?'good':'gray'}">${linked?'Configured':'Optional'}</span></div>
      <div class="notice">The app always saves on this phone first. The sync URL and private key remain in this browser and are removed from cloud backups.</div>
      <label style="margin-top:10px">Apps Script web-app URL<input id="syncUrlInput" type="url" value="${esc(state.settings.syncUrl)}" placeholder="https://script.google.com/macros/s/.../exec"></label>
      <label>Private sync key<input id="syncKeyInput" type="password" value="${esc(state.settings.syncKey)}" placeholder="Paste the key from Sync_Config"></label>
      <label class="inline-check"><input id="autoSyncInput" type="checkbox" ${state.settings.autoSync?'checked':''}> Automatically push after local changes</label>
      <div class="button-row">
        <button onclick="saveSyncSettings()">Save connection</button>
        <button class="secondary" onclick="testSync()">Test</button>
        <button class="secondary" onclick="pushCloud()">Push phone → Sheets</button>
        <button class="ghost" onclick="pullCloud(false)">Pull & merge</button>
      </div>
      <div class="small muted" style="margin-top:8px">Last successful sync: ${esc(syncAge)} · cloud revision ${toNum(state.meta.lastCloudRevision)}</div>
    </div>

    <div class="card">
      <div class="card-title"><span>Phone storage and installation</span><span id="storageStatus" class="pill gray">checking</span></div>
      <div class="button-row">
        ${!isStandalone()?`<button onclick="installApp()">Install app</button>`:'<span class="pill good">Installed</span>'}
        <button class="secondary" onclick="requestPersistentStorage()">Protect local storage</button>
      </div>
      <div id="storageDetail" class="small muted" style="margin-top:8px">The browser may remove site data under storage pressure unless persistent storage is granted.</div>
    </div>

    <div class="card">
      <div class="card-title"><span>Backup and spreadsheet</span></div>
      <div class="button-row">
        <button onclick="exportFullBackup()">Export full JSON</button>
        <button class="secondary" onclick="document.getElementById('backupImport').click()">Import JSON</button>
        <a class="button secondary" href="./Fitness_Database_Template.xlsx" download>Excel template</a>
      </div>
      <input id="backupImport" type="file" accept="application/json,.json" hidden onchange="importBackup(event)">
      <div class="small muted" style="margin-top:8px">Full JSON includes compressed local progress photos. CSV exports contain tables only.</div>
      <hr class="divider">
      <div class="button-row">
        <button class="ghost compact" onclick="exportCSV('workoutSessions')">Workout sessions CSV</button>
        <button class="ghost compact" onclick="exportCSV('workoutLogs')">Workout sets CSV</button>
        <button class="ghost compact" onclick="exportCSV('foodLog')">Food log CSV</button>
        <button class="ghost compact" onclick="exportCSV('recipes')">Recipes CSV</button>
        <button class="ghost compact" onclick="exportCSV('bodyMetrics')">Metrics CSV</button>
      </div>
    </div>

    <details class="card">
      <summary class="card-title"><span>Appearance and app info</span><span class="pill gray">v${APP_VERSION}</span></summary>
      <label>Theme<select onchange="setTheme(this.value)">${['system','light','dark'].map(x=>`<option value="${x}" ${x===state.settings.theme?'selected':''}>${x[0].toUpperCase()+x.slice(1)}</option>`).join('')}</select></label>
      <div class="split" style="margin-top:10px">
        <label>Default rest seconds<input type="number" step="15" value="${esc(state.settings.restTimerDefaultSec)}" onchange="updateSetting('restTimerDefaultSec',this.value)"></label>
        <label>Barbell/standard increase kg<input type="number" step="0.25" value="${esc(state.settings.weightIncrementKg)}" onchange="updateSetting('weightIncrementKg',this.value)"></label>
        <label>Dumbbell increase kg<input type="number" step="0.25" value="${esc(state.settings.dumbbellWeightIncrementKg)}" onchange="updateSetting('dumbbellWeightIncrementKg',this.value)"></label>
        <label>Small/isolation increase kg<input type="number" step="0.25" value="${esc(state.settings.smallWeightIncrementKg)}" onchange="updateSetting('smallWeightIncrementKg',this.value)"></label>
      </div>
      <div class="list" style="margin-top:10px">
        <label class="row inline-check"><input type="checkbox" ${state.settings.autoRestTimer!==false?'checked':''} onchange="updateSetting('autoRestTimer',this.checked)"> Auto-start rest timer</label>
        <label class="row inline-check"><input type="checkbox" ${state.settings.restTimerSound!==false?'checked':''} onchange="updateSetting('restTimerSound',this.checked)"> Timer sound and vibration</label>
        <label class="row inline-check"><input type="checkbox" ${state.settings.autoAdvanceSets!==false?'checked':''} onchange="updateSetting('autoAdvanceSets',this.checked)"> Advance to next incomplete set</label>
      </div>
      <div class="small muted" style="margin-top:8px">Schema v${state.schemaVersion} · local revision ${toNum(state.meta.revision)} · client ${esc(state.meta.clientId)}</div>
    </details>

    <div class="card danger-zone">
      <div class="card-title"><span>Danger zone</span></div>
      <div class="button-row">
        <button class="danger" onclick="factoryReset()">Factory reset phone data</button>
        <button class="ghost" onclick="restoreSeedLibraries()">Restore seeded programs and libraries</button>
      </div>
    </div>
  </div>`;
}
function equipmentManagerListHtml() {
  const q=(document.getElementById('equipmentSearch')?.value||'').toLowerCase().trim();
  const selected=new Set(state.settings.availableEquipment||[]);
  const groups=[...EQUIPMENT_CATALOG];
  const custom=(state.settings.customEquipment||[]).map(name=>({name,description:'Custom equipment item',custom:true}));
  if(custom.length)groups.push({category:'Custom equipment',items:custom});
  return groups.map(group=>{
    const items=group.items.filter(item=>!q||`${item.name} ${item.description||''}`.toLowerCase().includes(q));
    if(!items.length)return '';
    return `<details class="equipment-group" open><summary><strong>${esc(group.category)}</strong><span class="pill gray">${items.filter(item=>selected.has(item.name)).length}/${items.length}</span></summary><div class="equipment-grid">${items.map(item=>`<label class="equipment-option ${selected.has(item.name)?'selected':''}"><input type="checkbox" ${item.name==='Bodyweight / floor space'?'disabled':''} ${selected.has(item.name)?'checked':''} onchange="toggleEquipmentManager('${esc(item.name)}',this.checked)"><span><strong>${esc(item.name)}</strong><small>${esc(item.description||'')}</small></span>${item.custom?`<button type="button" class="ghost compact" onclick="event.preventDefault();removeCustomEquipment('${esc(item.name)}')">Remove</button>`:''}</label>`).join('')}</div></details>`;
  }).join('');
}
function openEquipmentManager() {
  showModal(`<div class="card-title"><span>Home-gym equipment</span><button class="ghost compact" onclick="closeEquipmentManager()">Done</button></div>
    <div id="equipmentManagerSummary" class="equipment-summary"></div>
    <div class="preset-row">${Object.entries(EQUIPMENT_PRESETS).map(([key,preset])=>`<button class="secondary compact" onclick="applyEquipmentPreset('${key}')">${esc(preset.label)}</button>`).join('')}<button class="ghost compact" onclick="clearEquipmentSelection()">Clear</button></div>
    <label>Find equipment<input id="equipmentSearch" type="search" placeholder="Rack, cables, bands, cardio..." oninput="renderEquipmentManagerBody()"></label>
    <div id="equipmentManagerList" class="equipment-manager-list"></div>
    <div class="row"><label>Add equipment not listed<input id="customEquipmentName" placeholder="e.g. Lever squat machine"></label><button class="secondary compact" onclick="addCustomEquipment()">Add custom item</button></div>`);
  renderEquipmentManagerBody();
}
function renderEquipmentManagerBody() {
  const list=document.getElementById('equipmentManagerList'); if(list)list.innerHTML=equipmentManagerListHtml();
  const summary=document.getElementById('equipmentManagerSummary');
  if(summary)summary.innerHTML=`<div><strong>${(state.settings.availableEquipment||[]).length} items selected</strong><span>${availableExerciseCount()} of ${state.exercises.length} exercises compatible</span></div><div class="progress"><span style="width:${state.exercises.length?availableExerciseCount()/state.exercises.length*100:0}%"></span></div>`;
}
function toggleEquipmentManager(item,checked) {
  const set=new Set(state.settings.availableEquipment||[]); checked?set.add(item):set.delete(item); set.add('Bodyweight / floor space');
  state.settings.availableEquipment=[...set]; state.settings.equipmentProfileName='Custom home gym'; saveState({autoSync:false}); renderEquipmentManagerBody();
}
function applyEquipmentPreset(key) {
  const preset=EQUIPMENT_PRESETS[key]; if(!preset)return;
  state.settings.availableEquipment=normalizeEquipmentSelection(preset.items); state.settings.equipmentProfileName=preset.label; saveState({autoSync:false}); renderEquipmentManagerBody(); showToast(`${preset.label} equipment selected`);
}
function clearEquipmentSelection() {
  state.settings.availableEquipment=['Bodyweight / floor space']; state.settings.equipmentProfileName='Minimal'; saveState({autoSync:false}); renderEquipmentManagerBody();
}
function addCustomEquipment() {
  const input=document.getElementById('customEquipmentName'); const name=(input?.value||'').trim(); if(!name)return showToast('Enter an equipment name');
  state.settings.customEquipment=[...new Set([...(state.settings.customEquipment||[]),name])];
  state.settings.availableEquipment=[...new Set([...(state.settings.availableEquipment||[]),name])]; saveState({autoSync:false}); if(input)input.value=''; renderEquipmentManagerBody();
}
function removeCustomEquipment(name) {
  state.settings.customEquipment=(state.settings.customEquipment||[]).filter(item=>item!==name);
  state.settings.availableEquipment=(state.settings.availableEquipment||[]).filter(item=>item!==name); saveState({autoSync:false}); renderEquipmentManagerBody();
}
function closeEquipmentManager() { closeModal(); saveState(); render(); }
function bestCompatibleAlternative(slot,mode='') {
  const source=state.exercises.find(e=>e.id===slot.exerciseId)||state.exercises.find(e=>e.name===slot.name);
  const candidates=alternativesForSlot(slot).filter(ex=>exerciseAvailable(ex)&&ex.id!==source?.id);
  if(mode==='RFL / PSMF')candidates.sort((a,b)=>Number(String(b.rflOk).startsWith('Yes'))-Number(String(a.rflOk).startsWith('Yes')));
  return candidates[0]||null;
}
function equipmentAdaptationPlan(program) {
  const changes=[],unresolved=[];
  (program?.sessions||[]).forEach(session=>(session.exercises||[]).forEach(slot=>{
    const exercise=state.exercises.find(e=>e.id===slot.exerciseId)||state.exercises.find(e=>e.name===slot.name);
    if(!exercise||exerciseAvailable(exercise))return;
    const replacement=bestCompatibleAlternative(slot,program.mode);
    (replacement?changes:unresolved).push(replacement?{session,slot,exercise,replacement}:{session,slot,exercise});
  }));
  return {changes,unresolved};
}
function openEquipmentAdaptation(programId) {
  const program=state.programs.find(item=>item.id===programId); if(!program)return;
  const plan=equipmentAdaptationPlan(program);
  if(!plan.changes.length&&!plan.unresolved.length)return showToast('This program already matches your equipment');
  showModal(`<div class="card-title"><span>Create equipment-matched copy</span><button class="ghost compact" onclick="closeModal()">Close</button></div><div class="notice">The original program is preserved. A new copy will be created using the best compatible exercise for each unavailable slot.</div><div class="list" style="margin-top:10px">${plan.changes.map(change=>`<div class="row"><div class="tiny muted">${esc(change.session.name)}</div><strong>${esc(change.slot.name)} → ${esc(change.replacement.name)}</strong><div class="tiny muted">${esc(change.replacement.equipment)}</div></div>`).join('')}${plan.unresolved.map(change=>`<div class="row"><div class="tiny muted">${esc(change.session.name)}</div><strong>${esc(change.slot.name)}</strong><span class="pill warn">No compatible match found</span></div>`).join('')}</div><div class="button-row" style="margin-top:12px"><button onclick="applyEquipmentAdaptation('${esc(programId)}')">Create matched program</button><button class="ghost" onclick="closeModal();openEquipmentManager()">Edit equipment instead</button></div>`);
}
function applyEquipmentAdaptation(programId) {
  const source=state.programs.find(item=>item.id===programId); if(!source)return;
  const plan=equipmentAdaptationPlan(source); const replacementMap=new Map(plan.changes.map(change=>[change.slot.id,change.replacement]));
  const clone=deepClone(source); clone.id=uid('program'); clone.name=`${source.name} — ${state.settings.equipmentProfileName||'My equipment'}`; clone.description=`Equipment-matched copy of ${source.name}.`;
  clone.updatedAt=nowISO(); clone.sessions.forEach((session,si)=>{session.id=uid('session');session.order=si+1;session.updatedAt=nowISO();session.exercises.forEach((slot,xi)=>{const replacement=replacementMap.get(slot.id);slot.id=uid('slot');slot.order=xi+1;if(replacement){slot.notes=[slot.notes,`Equipment adaptation from ${slot.name}.`].filter(Boolean).join(' ');slot.name=replacement.name;slot.exerciseId=replacement.id;}slot.updatedAt=nowISO();});});
  state.programs.push(clone); state.settings.activeProgram=clone.id; state.settings.lastSession=sessionKey(clone.id,clone.sessions[0]?.id||''); saveState(); closeModal(); render(); showToast(`Created ${clone.name}`);
}
function updateSetting(key,value) {
  const numeric=['age','heightCm','targetWeightKg','normalCalorieTarget','normalProteinTarget','normalCarbTarget','normalFatTarget',
    'rflCalorieTarget','rflProteinTarget','rflCarbTarget','rflFatTarget','stepsTarget','sleepTargetHrs','waterTargetMl','restTimerDefaultSec','weightIncrementKg','dumbbellWeightIncrementKg','smallWeightIncrementKg'];
  state.settings[key]=numeric.includes(key)?numOrBlank(value):value;
  saveState();showToast('Saved');
}
function toggleEquipment(item,checked) {
  const set=new Set(state.settings.availableEquipment||[]); checked?set.add(item):set.delete(item); set.add('Bodyweight / floor space');
  state.settings.availableEquipment=[...set]; state.settings.equipmentProfileName='Custom home gym'; saveState(); render();
}
function saveSyncSettings() {
  const url=(document.getElementById('syncUrlInput')?.value||'').trim();
  const key=(document.getElementById('syncKeyInput')?.value||'').trim();
  if(url && !/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(url)) return showToast('Use the deployed Apps Script /exec URL');
  state.settings.syncUrl=url.replace(/\?.*$/,'');
  state.settings.syncKey=key;
  state.settings.autoSync=Boolean(document.getElementById('autoSyncInput')?.checked);
  saveState({autoSync:false});render();showToast('Sync settings saved');
}
function openSyncPanel() {
  const linked=state.settings.syncUrl&&state.settings.syncKey;
  showModal(`<div class="card-title"><span>Cloud sync</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="notice">${linked?'Google Sheets is configured. Local phone data remains the working copy.':'No cloud connection is configured; all data is currently phone-only.'}</div>
    <div class="stack" style="margin-top:10px">
      <div class="metric-line"><span>Local revision</span><strong>${toNum(state.meta.revision)}</strong></div>
      <div class="metric-line"><span>Cloud revision seen</span><strong>${toNum(state.meta.lastCloudRevision)}</strong></div>
      <div class="metric-line"><span>Last sync</span><strong>${esc(state.meta.lastCloudSyncAt||'Never')}</strong></div>
      ${linked?`<button onclick="testSync()">Test connection</button><button class="secondary" onclick="pushCloud()">Push to Sheets</button><button class="ghost" onclick="pullCloud(false)">Pull & merge</button>`:''}
      <button class="ghost" onclick="closeModal();setPage('settings');setTimeout(()=>document.getElementById('syncSettingsCard')?.scrollIntoView({behavior:'smooth'}),100)">Open settings</button>
    </div>`);
}
function updateSyncIndicator(status='') {
  const dot=document.getElementById('syncDot');if(!dot)return;
  dot.className='status-dot ';
  if(status==='error')dot.classList.add('error');
  else if(status==='pending')dot.classList.add('pending');
  else if(state.settings.syncUrl&&state.settings.syncKey&&state.meta.lastCloudSyncAt)dot.classList.add('synced');
  else dot.classList.add('local');
}
function jsonpRequest(params,timeoutMs=20000) {
  return new Promise((resolve,reject)=>{
    const url=state.settings.syncUrl;
    if(!url)return reject(new Error('Sync URL missing'));
    const callback=`liftCutJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script=document.createElement('script');
    const cleanup=()=>{delete window[callback];script.remove();clearTimeout(timer);};
    window[callback]=data=>{cleanup();resolve(data);};
    const query=new URLSearchParams({...params,callback});
    script.src=`${url}?${query.toString()}`;
    script.onerror=()=>{cleanup();reject(new Error('Could not reach Apps Script'));};
    const timer=setTimeout(()=>{cleanup();reject(new Error('Sync timed out'));},timeoutMs);
    document.head.appendChild(script);
  });
}
async function cloudStatus({silent=false}={}) {
  if(!state.settings.syncUrl||!state.settings.syncKey)throw new Error('Configure the sync URL and key first');
  const result=await jsonpRequest({action:'status',key:state.settings.syncKey,clientId:state.meta.clientId});
  if(!result?.ok)throw new Error(result?.error||'Connection rejected');
  if(result.revision!==undefined)state.meta.lastCloudRevision=toNum(result.revision);
  if(!silent){saveState({touch:false,autoSync:false});showToast(`Cloud revision ${toNum(result.revision)}`);}
  return result;
}
async function testSync() {
  try{
    saveSyncSettings();
    updateSyncIndicator('pending');
    const result=await cloudStatus({silent:true});
    state.meta.lastCloudRevision=toNum(result.revision);saveState({touch:false,autoSync:false});
    updateSyncIndicator();closeModal();showToast('Google Sheets connection works');
  }catch(error){console.error(error);updateSyncIndicator('error');showToast(error.message||'Sync test failed',4000);}
}
function cloudSafeState() {
  const copy=deepClone(state);
  copy.settings.syncUrl='';
  copy.settings.syncKey='';
  copy.settings.autoSync=false;
  copy.progressPhotos=(copy.progressPhotos||[]).map(x=>({...x,localOnly:true}));
  return copy;
}
function submitCloudForm(payload) {
  return new Promise(resolve=>{
    const frameName=`syncFrame_${Date.now()}`;
    const iframe=document.createElement('iframe');iframe.name=frameName;iframe.hidden=true;
    const form=document.createElement('form');form.method='POST';form.action=state.settings.syncUrl;form.target=frameName;form.hidden=true;
    Object.entries(payload).forEach(([name,value])=>{
      const input=document.createElement('input');input.type='hidden';input.name=name;input.value=String(value??'');form.appendChild(input);
    });
    document.body.append(iframe,form);form.submit();
    setTimeout(()=>{form.remove();iframe.remove();resolve();},2200);
  });
}
async function waitForSyncRequest(requestId,attempts=12) {
  for(let i=0;i<attempts;i++){
    await new Promise(r=>setTimeout(r,1000+i*150));
    const status=await cloudStatus({silent:true});
    if(status.lastRequestId===requestId)return status;
  }
  throw new Error('The push was sent, but confirmation was not received');
}
async function pushCloud(force=false,silent=false) {
  if(!state.settings.syncUrl||!state.settings.syncKey){if(!silent)setPage('settings');return showToast('Configure Google Sheets sync first');}
  try{
    updateSyncIndicator('pending');
    const requestId=uid('request');
    const payload=JSON.stringify(cloudSafeState());
    await submitCloudForm({
      action:'push',key:state.settings.syncKey,payload,requestId,
      clientId:state.meta.clientId,baseRevision:toNum(state.meta.lastCloudRevision),force:force?'true':'false'
    });
    const status=await waitForSyncRequest(requestId);
    if(status.lastStatus==='conflict'){
      updateSyncIndicator('error');
      if(!silent)showModal(`<div class="card-title"><span>Cloud conflict</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
        <div class="notice warn">The spreadsheet has a newer revision than this phone. Pull and merge first, or force-push only when you are certain the phone copy should replace it.</div>
        <div class="button-row" style="margin-top:10px"><button onclick="closeModal();pullCloud(false)">Pull & merge</button><button class="danger" onclick="closeModal();pushCloud(true)">Force phone copy</button></div>`);
      return false;
    }
    if(status.lastStatus!=='success')throw new Error(status.lastError||'Cloud rejected the push');
    state.meta.lastCloudRevision=toNum(status.revision);
    state.meta.lastCloudSyncAt=nowISO();
    saveState({touch:false,autoSync:false});
    updateSyncIndicator();
    if(!silent){closeModal();showToast('Phone data pushed to Google Sheets');}
    return true;
  }catch(error){console.error(error);updateSyncIndicator('error');if(!silent)showToast(error.message||'Push failed',4500);return false;}
}
function mergeArrayById(localRows,remoteRows) {
  const map=new Map();
  [...(localRows||[]),...(remoteRows||[])].forEach(row=>{
    if(!row?.id)return;
    const current=map.get(row.id);
    if(!current || String(row.updatedAt||'')>=String(current.updatedAt||''))map.set(row.id,deepClone(row));
  });
  return [...map.values()];
}
function mergeCloudState(local,remote) {
  const merged=migrateState(deepClone(local));
  const remoteState=migrateState(remote);
  const localSync={syncUrl:local.settings.syncUrl,syncKey:local.settings.syncKey,autoSync:local.settings.autoSync,theme:local.settings.theme};
  if(String(remoteState.meta.lastModifiedAt||'')>=String(local.meta.lastModifiedAt||''))merged.settings={...merged.settings,...remoteState.settings};
  Object.assign(merged.settings,localSync);
  ['programs','exercises','alternatives','ingredientCache','recipes','workoutSessions','workoutLogs',
    'foodLog','bodyMetrics','dailyCheckins','dietPhases','cardioLogs','progressPhotos'].forEach(key=>{
      merged[key]=mergeArrayById(local[key],remoteState[key]);
  });
  merged.meta={...merged.meta,...remoteState.meta,clientId:local.meta.clientId,lastCloudSyncAt:nowISO()};
  return migrateState(merged);
}
async function pullCloud(replace=false) {
  if(!state.settings.syncUrl||!state.settings.syncKey){setPage('settings');return showToast('Configure Google Sheets sync first');}
  try{
    updateSyncIndicator('pending');
    const result=await jsonpRequest({action:'pull',key:state.settings.syncKey,clientId:state.meta.clientId});
    if(!result?.ok||!result.state)throw new Error(result?.error||'No cloud state available');
    if(replace&&!confirm('Replace the phone copy with the cloud copy? Local-only changes may be lost.'))return;
    const sync={syncUrl:state.settings.syncUrl,syncKey:state.settings.syncKey,autoSync:state.settings.autoSync,theme:state.settings.theme};
    state=replace?migrateState(result.state):mergeCloudState(state,result.state);
    Object.assign(state.settings,sync);
    state.meta.lastCloudRevision=toNum(result.revision);
    state.meta.lastCloudSyncAt=nowISO();
    saveState({touch:false,autoSync:false});
    workoutDraft=null;localStorage.removeItem(DRAFT_KEY);
    closeModal();render();updateSyncIndicator();showToast(replace?'Cloud copy restored':'Cloud data merged');
  }catch(error){console.error(error);updateSyncIndicator('error');showToast(error.message||'Pull failed',4500);}
}
async function exportFullBackup() {
  try{
    showToast('Preparing full backup…',5000);
    const photos=await getAllPhotos().catch(()=>[]);
    const photoRows=[];
    for(const item of photos)photoRows.push({id:item.id,createdAt:item.createdAt,dataUrl:await blobToDataURL(item.blob)});
    const payload={format:'lift-cut-full-backup',appVersion:APP_VERSION,exportedAt:nowISO(),state,photos:photoRows};
    downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`lift-cut-full-backup-${localDateISO()}.json`);
    showToast('Backup exported');
  }catch(error){console.error(error);showToast('Backup export failed');}
}
async function importBackup(event) {
  const file=event.target.files?.[0];if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    const incoming=parsed.state||parsed;
    if(!incoming||typeof incoming!=='object')throw new Error('Invalid backup');
    if(!confirm('Import this backup and replace the current phone data?'))return;
    const localSync={syncUrl:state.settings.syncUrl,syncKey:state.settings.syncKey,autoSync:state.settings.autoSync};
    state=migrateState(incoming);Object.assign(state.settings,localSync);
    saveState({touch:false,autoSync:false});
    if(Array.isArray(parsed.photos)){
      for(const p of parsed.photos){if(p.id&&p.dataUrl)await putPhoto({id:p.id,blob:dataURLToBlob(p.dataUrl),createdAt:p.createdAt||nowISO()});}
    }
    workoutDraft=null;localStorage.removeItem(DRAFT_KEY);render();showToast('Backup imported');
  }catch(error){console.error(error);showToast('Import failed: invalid backup',4500);}
  event.target.value='';
}
function exportCSV(key) {
  let rows=state[key]||[];
  if(!rows.length)return showToast('No rows to export');
  if(key==='recipes')rows=rows.map(({ingredients,...r})=>({...r,ingredientCount:ingredients?.length||0}));
  const headers=[...rows.reduce((set,row)=>{Object.keys(row).forEach(k=>{if(typeof row[k]!=='object')set.add(k);});return set;},new Set())];
  const csv=[headers.join(',')].concat(rows.map(row=>headers.map(h=>csvCell(row[h])).join(','))).join('\n');
  downloadBlob(new Blob([csv],{type:'text/csv;charset=utf-8'}),`${key}-${localDateISO()}.csv`);
}
function downloadBlob(blob,filename) {
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function requestPersistentStorage() {
  try{
    if(!navigator.storage?.persist)return showToast('Persistent storage is not supported by this browser');
    const granted=await navigator.storage.persist();
    await refreshStorageStatus();
    showToast(granted?'Persistent storage granted':'Browser did not grant persistent storage');
  }catch{showToast('Could not change storage setting');}
}
async function refreshStorageStatus() {
  const badge=document.getElementById('storageStatus'),detail=document.getElementById('storageDetail');
  if(!badge||!detail)return;
  let persisted=false,estimate=null;
  try{persisted=await navigator.storage?.persisted?.();estimate=await navigator.storage?.estimate?.();}catch{}
  badge.textContent=persisted?'Protected':'Best effort';badge.className=`pill ${persisted?'good':'warn'}`;
  if(estimate?.usage!==undefined)detail.textContent=`Using ${round(estimate.usage/1024/1024,1)} MB of an estimated ${round(estimate.quota/1024/1024,0)} MB quota.`;
}
function restoreSeedLibraries() {
  if(!confirm('Restore seeded programs, exercises, alternatives, ingredients, and example recipes? Your logs and measurements remain.'))return;
  ['programs','exercises','alternatives','ingredientCache','recipes'].forEach(key=>state[key]=deepClone(DEFAULT_STATE[key]));
  state.settings.activeProgram='UL4';state.settings.lastSession='UL4|lower-a';
  saveState();render();showToast('Seed libraries restored');
}
async function factoryReset() {
  if(!confirm('Delete all local workouts, food, recipes, metrics, phases, photos, and settings on this phone?'))return;
  try{const photos=await getAllPhotos();for(const p of photos)await deletePhotoBlob(p.id);}catch{}
  localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(DRAFT_KEY);
  state=migrateState(deepClone(DEFAULT_STATE));workoutDraft=null;saveState({touch:false,autoSync:false});render();showToast('Phone data reset');
}
function openQuickAdd() {
  showModal(`<div class="card-title"><span>Quick add</span><button class="ghost compact" onclick="closeModal()">Close</button></div>
    <div class="grid">
      <button onclick="closeModal();setPage('train')">Log workout</button>
      <button class="secondary" onclick="closeModal();openAddFood()">Log food</button>
      <button class="secondary" onclick="closeModal();openMetricModal()">Body measurement</button>
      <button class="secondary" onclick="closeModal();openCheckinModal()">Daily check-in</button>
      <button class="ghost" onclick="closeModal();openRecipeBuilder()">Add recipe</button>
      <button class="ghost" onclick="closeModal();openRecipeImportHub()">Import recipe</button>
      <button class="ghost" onclick="closeModal();openCardioModal()">Log cardio</button>
    </div>`);
}
async function installApp() {
  if(isStandalone())return showToast('App is already installed');
  if(installPrompt){
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt=null;render();
  }else if(isIOS()){
    showToast('In Safari, tap Share then Add to Home Screen',5000);
  }else{
    showToast('Open the browser menu and choose Install app or Add to Home screen',5000);
  }
}
function registerServiceWorker() {
  if(!('serviceWorker' in navigator)||location.protocol==='file:')return;
  navigator.serviceWorker.register('./sw.js').then(reg=>{
    reg.addEventListener('updatefound',()=>{
      const worker=reg.installing;
      worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)showToast('App update ready. Reopen to use it.',5000);});
    });
  }).catch(error=>console.warn('Service worker registration failed',error));
}
async function boot() {
  state=loadState();
  workoutDraft=loadDraft();
  const requested=new URLSearchParams(location.search).get('page');
  page=requested||localStorage.getItem(PAGE_KEY)||'dashboard';
  if(!['dashboard','program','train','diet','progress','settings'].includes(page))page='dashboard';
  applyTheme();render();registerServiceWorker();openPhotoDb().catch(()=>{});
  window.addEventListener('online',()=>{updateSyncIndicator();if(state.settings.autoSync)cloudStatus({silent:true}).catch(()=>{});});
  window.addEventListener('offline',()=>updateSyncIndicator('error'));
  setTimeout(refreshStorageStatus,250);
  setTimeout(handleSharedRecipeTarget,350);
  clearInterval(workoutClockInterval);
  workoutClockInterval=setInterval(()=>{refreshWorkoutClock();updateDraftSaveStatus();},1000);
  if(state.settings.syncUrl&&state.settings.syncKey)cloudStatus({silent:true}).then(r=>{state.meta.lastCloudRevision=toNum(r.revision);saveState({touch:false,autoSync:false});updateSyncIndicator();}).catch(()=>updateSyncIndicator('error'));
}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;render();});
window.addEventListener('appinstalled',()=>{installPrompt=null;showToast('Lift & Cut installed');render();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveDraft();else{updateRestTimerDisplay();refreshWorkoutClock();}});
boot();
