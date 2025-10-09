import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseService } from "./database.service";


@Controller('api')
export class DatabaseController {
    constructor(private readonly databaseservice: DatabaseService) {}

    @Get("get-data/:uploadId")
    async getDataByUploadId(@Param('uploadId') uploadId: string) {

        return this.databaseservice.getDataById(uploadId);
    }
}