import { createCanvas, loadImage } from 'canvas';
import fs from "fs";
import jsQR from "jsqr";


    let imgH = 710;
    let imgW = 485
    let x = -50;
    let y = -90;
// export const detectBarCodes = async (images: any) => {
// // console.log(images[0].content)

//     const img = await loadImage(images[0].content);
//     const canvas = createCanvas(img.width - 485, img.height - 710);
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, -45, -95);
//     const imageData = ctx.getImageData(0, 0, img.width, img.height);
//     const code = jsQR(imageData.data, img.width, img.height);
//     if (!code) {
//     console.log("No QR code found");
//     return null;
//     }
//     console.log(code.data)
//     return code.data;
// }
export const detectBarCodes = async (images: any) => {
    console.log(images[0].content)
    // 1. Load image from buffer
    const img = await loadImage(images[1].content);
    console.log(img.width + " " + img.height)
    const canvas = createCanvas(img.width - 490, img.height - 740);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, -45 + (x * 8), -95 + (y * 2));

        // Export the canvas to a file
    const out = fs.createWriteStream('output.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('✅ Image drawn and saved as output.png'));
}