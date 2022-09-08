export const BODY_METRICS = [
    'chest',
    'bust',
    'waist',
    'highHips',
    'hips',
    'bustDepth',
    'frontShoulderToWaist',
    'napeToWaist',
    'waistToFloor',
    'waistToHips',
    'shoulder',
    'armLength',
    'armHole',
    'bicep',
    'wrist',
    'thigh',
    'calf',
    'neckSize'
]

export const PRODUCT_METRICS = [
    'pantsSkirtWaist',
    'pantsSkirtLength',
    'dressShirtLength',
    'dressShirtNeckDepth',
    'dressShirtNeckWidth',
    'sleeveLength'
]

export const STYLE_PRODUCT_METRICS_MAP: { [key: string]: string[] } = {
    "dress": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "shirts": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "ao dai": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "others": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "pants": ['pantsSkirtWaist', 'pantsSkirtLength'],
    "skirts": ['pantsSkirtWaist', 'pantsSkirtLength']
}