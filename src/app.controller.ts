import { Controller, Get, Res, Req, Param } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Api')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiParam({ name: 'icao', type: String, example: 'LFBD', required: true })
    @ApiOkResponse({ status: 200, type: [Object] })
    @Get('/atis/:icao')
    atis(@Param('icao') icao: any, @Res() res: any, @Req() req: any) {
        return this.appService.atis(icao, res, req);
    }

    @ApiOkResponse({ status: 200, type: [Object] })
    @Get('/data')
    data(@Res() res: any) {
        return this.appService.data(res);
    }

    @ApiParam({ name: 'icao', type: String, example: 'LFBE', required: true })
    @ApiOkResponse({ status: 200, type: [Object] })
    @Get('/infos/:icao')
    infos(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.infos(icao, res);
    }

    @ApiParam({ name: 'icao', type: String, example: 'LFBD', required: true })
    @ApiOkResponse({ status: 200, type: [Object] })
    @Get('/sid/:icao')
    sid(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.sid(icao, res);
    }

    @ApiParam({ name: 'icao', type: String, example: 'LFBH', required: true })
    @ApiOkResponse({ status: 200, type: [Object] })
    @Get('/star/:icao')
    star(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.star(icao, res);
    }
}
