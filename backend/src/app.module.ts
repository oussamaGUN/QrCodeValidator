import { Module } from '@nestjs/common';
import { QrCodeModule } from './QrCodeValidator/QrCode.module';
import { DataOperationsModule } from './DatabaseController/database.module';

@Module({
  imports: [QrCodeModule, DataOperationsModule],
})
export class AppModule {}
