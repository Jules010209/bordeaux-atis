import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
    @ApiProperty()
    altitude: number

    @ApiProperty()
    runways: []

    @ApiProperty()
    solved_runways: []

    @ApiProperty()
    sid: Object

    @ApiProperty()
    star: Object
}