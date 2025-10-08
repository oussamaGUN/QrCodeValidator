import { Controller, Post, UploadedFile, UseInterceptors, Res } from "@nestjs/common";
import { QrCodeService } from "./QrCode.service";
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';




@Controller('qr')
export class QrCodeController {
    constructor(private readonly qrcodeservice: QrCodeService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    qr(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        if (!file)
            res.status(400).json({message: "error"})
        return res.status(200).json(this.qrcodeservice.pdf(file.buffer));
    }
}