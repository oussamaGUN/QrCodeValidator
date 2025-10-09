import { createCanvas, Image, loadImage } from 'canvas';
import fs from "fs";
import jsQR from "jsqr";

export let BinaryDataOfQrCodes: number[][] = [];

const imageIsBlank = (img: Image, x: number, row: number, y: number, col: number): boolean => {
    const canvas = createCanvas(img.width - 490, img.height - 740);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, -45 + (x * row), -95 + (y * col));

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // If the pixel is not white (or not transparent treated as white)
        if (a !== 0 && (r !== 255 || g !== 255 || b !== 255)) {
        return false;
        }
    }
    return true;
}

let x = -50;
let y = -90;
export const detectBarCodes = async (images: any) => {
    let QrCodes: any = [];
    let i = 0;
    while (i < images.length) {
        for (let col = 0;col <= 6;) {
            for (let row = 0;row <= 8;) {
                const img = await loadImage(images[i].content);
                const canvas = createCanvas(img.width - 485, img.height - 710);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, -45 + (x * row), -95 + (y * col));
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const code = jsQR(imageData.data, img.width, img.height);
                if (!code) {
                    if (imageIsBlank(img, x, row, y, col))
                        QrCodes.push(`No QR code found pos ${row} + ${col} + section ${i}`);
                    else
                        QrCodes.push(`Invalid QrCode pos ${row} + ${col} + section ${i}`);
                    BinaryDataOfQrCodes.push([0]);
                }
                else {
                    BinaryDataOfQrCodes.push(code.binaryData);
                    QrCodes.push(code.data);
                }
                row += 2;
            }
            col += 2;
        }
        i++;
    }
    return QrCodes;
}

// export const detectBarCodes = async (images: any) => {
//     console.log(images[1].content)
//     // 1. Load image from buffer
//     const img = await loadImage(images[1].content);
//     console.log(img.width + " " + img.height)
//     const canvas = createCanvas(img.width - 490, img.height - 740);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, -45 + (x * 0), -95);

//         // Export the canvas to a file
//     const out = fs.createWriteStream('output.png');
//     const stream = canvas.createPNGStream();
//     stream.pipe(out);
//     out.on('finish', () => console.log('✅ Image drawn and saved as output.png'));
// }