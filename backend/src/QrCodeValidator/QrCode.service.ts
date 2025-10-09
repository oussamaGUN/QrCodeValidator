import { Injectable } from "@nestjs/common";
import { pdfToImage } from "./utils/pdftoimage";
import { detectBarCodes } from "./utils/detectbarcodes";
import { formatValidationAndCRUD } from "./utils/format_validation_and_crud";
import { uploadIdGenerator } from "./utils/uploadIdGenerator";

@Injectable()
export class QrCodeService {
    async pdf(buffer: any) {
        const uploadId: string = uploadIdGenerator();
        const images = await pdfToImage(buffer);
        const QrCodes: any = await detectBarCodes(images);
        formatValidationAndCRUD(QrCodes, images, uploadId);
        return {uploadId: uploadId};
    }
}