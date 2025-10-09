import { Controller, Get, Param } from "@nestjs/common";

@Controller('api')
export class DatabaseController {

    @Get("get-uploadId")
    async getDataByUploadId(@Param() uploadId: string) {
        return "hello wo;rld";
    }
}