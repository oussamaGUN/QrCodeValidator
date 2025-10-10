import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { ClassCheck } from "src/QrCodeValidator/utils/interfaces/interfaces";

// Connection URL
const uri = "mongodb://mongo:mongo@mongodb:27017/?authSource=admin"; 
// admin:secret are username/password if auth is enabled

// Database and client
const client = new MongoClient(uri);


@Injectable()
export class DatabaseService {
    async getDataById(uploadId: string) {
        await client.connect();
        const db = client.db("qrcodevalidator"); // choose your DB
        const QrCodeCollection = db.collection("QrCodes"); // choose your collection

        const results = await QrCodeCollection.find({ uploadId }).toArray();

        let validCount = 0;
        let invalidCount = 0;
        let unreadableCount = 0;
        let duplicatesCount = 0;

        for (let index = 0; index < results.length; index++) {
            if (results[index].status === "VALID")
                validCount++;
            else if (results[index].status === "INVALID")
                invalidCount++;
            else if (results[index].status === "UNREADABLE")
                unreadableCount++;
            else if (results[index].status === "DUPLICATE")
                duplicatesCount++;
        }
        const finalResult = {
            valid: validCount,
            invalid: invalidCount,
            unreadable: unreadableCount,
            duplicates: duplicatesCount
        }
        return finalResult;
    }
}