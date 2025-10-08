import { Module } from "@nestjs/common";
import { QrCodeController } from "./QrCode.controller";
import { QrCodeService } from "./QrCode.service";

@Module({
    controllers: [QrCodeController],
    providers: [QrCodeService]
})
export class QrCodeModule {}