import { ClassCheck, QrCodeInterface } from "../interfaces/interfaces";
let tag_id_Array: string[] = ["TAG-00022"]

const formatKeysValCheck = (QrcodeObj: QrCodeInterface): boolean => {
    if (!QrcodeObj.batch || !QrcodeObj.category
        || !QrcodeObj.location || !QrcodeObj.serial
        || !QrcodeObj.tag_id
    )
        return false;
    if (QrcodeObj.tag_id && !/^TAG-\d{5}$/.test(QrcodeObj.tag_id)) {
        return false;
    }
    if (QrcodeObj.serial && !/^SN-\d+$/.test(QrcodeObj.serial)) {
        return false;
    }
    if (QrcodeObj.batch && !/^B\d{8}$/.test(QrcodeObj.batch)) {
        return false;
    }
    if (QrcodeObj.location && !/^DEP-\d{2}$/.test(QrcodeObj.location)) {
        return false;
    }
    return true;
}
export  const formatCheck = (QrCode: any): ClassCheck => {
    try {
        const QrcodeObj: QrCodeInterface = JSON.parse(QrCode);
        if (!formatKeysValCheck(QrcodeObj))
            return ClassCheck.INVALID;
        if (tag_id_Array.includes(QrcodeObj.tag_id))
            return ClassCheck.DUBLICATE;
        else
            tag_id_Array.push(QrcodeObj.tag_id);
    } catch (error) {
        return ClassCheck.UNREADABLE;
    }
    return ClassCheck.VALID;
}