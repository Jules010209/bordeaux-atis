import { Controller, Get, Res, Req, Param } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse, ApiBadRequestResponse, ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AtisDto } from './dto/atis.dto';
import { DataDto } from './dto/data.dto';
import { ErrorDto } from './dto/error.dto';

@ApiTags('Api')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiSecurity('X-API-KEY')
    @ApiParam({ name: 'icao', type: String, example: 'LFBD', required: true })
    @ApiOkResponse({ status: 200, type: AtisDto })
    @ApiBadRequestResponse({ status: 400, type: ErrorDto, description: 'Select the good airport' })
    @Get('/atis/:icao')
    atis(@Param('icao') icao: any, @Res() res: any, @Req() req: any) {
        return this.appService.atis(icao, res, req);
    }

    @ApiSecurity('X-API-KEY')
    @ApiOkResponse({ status: 200, type: DataDto })
    @ApiBadRequestResponse({ status: 500, type: ErrorDto })
    @Get('/data')
    data(@Res() res: any) {
        return this.appService.data(res);
    }

    @ApiSecurity('X-API-KEY')
    @ApiParam({ name: 'icao', type: String, example: 'LFBE', required: true })
    @ApiOkResponse({ status: 200, type: DataDto })
    @Get('/infos/:icao')
    infos(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.infos(icao, res);
    }

    @ApiSecurity('X-API-KEY')
    @ApiParam({ name: 'icao', type: String, example: 'LFBD', required: true })
    @ApiOkResponse({ status: 200, type: DataDto })
    @Get('/sid/:icao')
    sid(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.sid(icao, res);
    }

    @ApiSecurity('X-API-KEY')
    @ApiParam({ name: 'icao', type: String, example: 'LFBH', required: true })
    @ApiOkResponse({ status: 200, type: DataDto })
    @Get('/star/:icao')
    star(@Param('icao') icao: any, @Res() res: any) {
        return this.appService.star(icao, res);
    }
}
