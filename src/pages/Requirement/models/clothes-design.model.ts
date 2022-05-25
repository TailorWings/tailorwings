
export enum SideEnum {
    'front' = 'front',
    'back' = 'back',
    'side' = 'side',
    'other' = 'other'
}
export interface PhotoWithNote {
    file: File;
    note?: string;
}
export interface ClothesDesign {
    side: SideEnum;
    photoNotes?: Array<PhotoWithNote | null>;
}