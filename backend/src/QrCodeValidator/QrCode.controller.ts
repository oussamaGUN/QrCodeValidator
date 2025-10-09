import { Controller, Post, UploadedFile, UseInterceptors, Res } from "@nestjs/common";
import { QrCodeService } from "./QrCode.service";
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('qr')
export class QrCodeController {
    constructor(private readonly qrcodeservice: QrCodeService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async qr(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        if (!file) {
            return res.status(400).json({ message: "error" });
        }
        const result = await this.qrcodeservice.pdf(file.buffer);
        return res.status(200).json(result);
    }
}