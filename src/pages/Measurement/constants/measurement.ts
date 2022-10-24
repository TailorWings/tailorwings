export const BODY_MEASUREMENT_KEY_LIST = [
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
export const MEASUREMENT_UNIT_MAP: {[key:string]: string} = {
    'weight': 'kg'
}

export const PRODUCT_MEASUREMENT_KEY_LIST = [
    'pantsSkirtWaist',
    'pantsSkirtLength',
    'dressShirtLength',
    'dressShirtNeckDepth',
    'dressShirtNeckWidth',
    'sleeveLength'
]

export const STYLE_PRODUCT_MEASUREMENT_MAP: { [key: string]: string[] } = {
    "dress": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "shirts": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "ao dai": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "others": ['dressShirtLength', 'dressShirtNeckDepth', 'dressShirtNeckWidth', 'sleeveLength'],
    "pants": ['pantsSkirtWaist', 'pantsSkirtLength'],
    "skirts": ['pantsSkirtWaist', 'pantsSkirtLength']
}