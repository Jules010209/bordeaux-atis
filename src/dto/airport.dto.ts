import { ApiProperty } from '@nestjs/swagger';

export class AirportDto {
    @ApiProperty()
    runway: Object
}