export interface QrCodeInterface {
    batch: string;
    category: string;
    location: string;
    serial: string;
    tag_id: string;
}
export enum ClassCheck {
    VALID,
    INVALID,
    UNREADABLE,
    DUBLICATE
}