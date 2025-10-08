import { pdfToPng } from 'pdf-to-png-converter';
import fs from 'fs';
import path from 'path';

export const pdfToImage = async (buffer: Buffer) => {
    const images = await pdfToPng(buffer, {
        outputFileMaskFunc: (pageNum: number) => `page_${pageNum}`,
    });
    
    const outputDir = "/home/oussama/Desktop/QrCodeValidator/backend/src/QrCodeValidator/utils/images";
    images.forEach((image, index) => {
        const filePath = path.join(outputDir, `page_${index + 1}.png`); // add filename
        fs.writeFileSync(filePath, image.content); // save the buffer as PNG
    });
    
    return images;
};
