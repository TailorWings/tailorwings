
export enum SideEnum {
    'front' = 'front',
    'back' = 'back',
    'side' = 'side',
    'other' = 'other'
}
export interface PhotoWithNote {
    file: File;
    note?: string;
    downloadUrl?: string;
    blobUrl?: string;
}
export interface ClothesDesign {
    side: SideEnum;
    photoNotes?: Array<PhotoWithNote | null>;
}