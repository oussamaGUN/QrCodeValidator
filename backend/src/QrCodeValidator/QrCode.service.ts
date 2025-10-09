import { Injectable } from "@nestjs/common";
import { pdfToImage } from "./utils/pdftoimage";
import { detectBarCodes } from "./utils/detectbarcodes";
import { formatValidationAndCRUD } from "./utils/format_validation_and_crud";
@Injectable()
export class QrCodeService {
    async pdf(buffer: any) {
        const images = await pdfToImage(buffer);
        const QrCodes: any = await detectBarCodes(images);
        formatValidationAndCRUD(QrCodes);
// {"batch":"B20245685","category":"LOG","location":"DEP-04","serial":"SN-890879","tag_id":"TAG-00022"}
        return {message: "halloooooo"};
    }
}