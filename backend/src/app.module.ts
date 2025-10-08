import { Module } from '@nestjs/common';
import { QrCodeModule } from './QrCodeValidator/QrCode.module';

@Module({
  imports: [QrCodeModule],
})
export class AppModule {}
