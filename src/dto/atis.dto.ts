import { ApiProperty } from '@nestjs/swagger';

export class AtisDto {
    @ApiProperty()
    runway_in_use: string
    
    @ApiProperty()
    sid: Object

    @ApiProperty()
    star: Object
}