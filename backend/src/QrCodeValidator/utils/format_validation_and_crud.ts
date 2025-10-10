import { formatCheck } from "./formate_validator_utils/formateCheck"
import { ClassCheck, QrCodeInterface } from "./interfaces/interfaces";
import { MongoClient } from "mongodb";
import { BinaryDataOfQrCodes } from "./detectbarcodes";
// Connection URL
const uri = "mongodb://mongo:mongo@mongodb:27017/?authSource=admin"; 

// Database and client
const client = new MongoClient(uri);

export const formatValidationAndCRUD = async (QrCodes: any, images: any, uploadId: string) => {
    await client.connect();

    const db = client.db("qrcodevalidator"); // choose your DB
    const QrCodeCollection = db.collection("QrCodes"); // choose your collection
    let tag_id_Array: string[] = []

    for (let i = 0;i < QrCodes.length;i++) {
        let formatResult = formatCheck(QrCodes[i], tag_id_Array);
        const str: string = QrCodes[i];
        const buffer = Buffer.from(BinaryDataOfQrCodes[i]);
        
        if (formatResult === ClassCheck.VALID && !str.startsWith("No"))
        {
            const QrcodeObj: QrCodeInterface = JSON.parse(QrCodes[i]);
            await QrCodeCollection.insertOne({
                status: "VALID",
                data: {
                    batch: QrcodeObj.batch,
                    category: QrcodeObj.category,
                    location: QrcodeObj.location,
                    serial: QrcodeObj.serial,
                    tag_id: QrcodeObj.tag_id
                },
                qrImageBase64: buffer.toString('base64'),
                uploadId: uploadId
            });
        }
        else if (formatResult === ClassCheck.INVALID && !str.startsWith("No"))
        {
            const QrcodeObj: QrCodeInterface = JSON.parse(QrCodes[i]);
            await QrCodeCollection.insertOne({
                status: "INVALID",
                data: {
                    batch: QrcodeObj.batch || null,
                    category: QrcodeObj.category || null,
                    location: QrcodeObj.location || null,
                    serial: QrcodeObj.serial || null,
                    tag_id: QrcodeObj.tag_id || null
                },
                qrImageBase64: buffer.toString('base64'),
                uploadId: uploadId
            });
        }
        else if (formatResult === ClassCheck.UNREADABLE && !str.startsWith("No"))
        {
            await QrCodeCollection.insertOne({
                status: "UNREADABLE",
                qrImageBase64: buffer.toString('base64'),
                uploadId: uploadId
            });
        }
        else if (formatResult === ClassCheck.DUBLICATE && !str.startsWith("No"))
        {
            const QrcodeObj: QrCodeInterface = JSON.parse(QrCodes[i]);
            await QrCodeCollection.insertOne({
                status: "DUPLICATE",
                data: {
                    batch: QrcodeObj.batch || null,
                    category: QrcodeObj.category || null,
                    location: QrcodeObj.location || null,
                    serial: QrcodeObj.serial || null,
                    tag_id: QrcodeObj.tag_id || null
                },
                qrImageBase64: buffer.toString('base64'),
                uploadId: uploadId
            });
        }
    }
}