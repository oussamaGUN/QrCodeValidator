import { Injectable } from "@nestjs/common";
import { pdfToImage } from "./utils/pdftoimage";
import { detectBarCodes } from "./utils/detectbarcodes";

@Injectable()
export class QrCodeService {
    async pdf(buffer: any) {
        const images = await pdfToImage(buffer);
        detectBarCodes(images);
        return {message: "halloooooo"};
    }
}