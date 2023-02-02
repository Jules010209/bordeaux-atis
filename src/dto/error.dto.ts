import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
    @ApiProperty()
    status: number

    @ApiProperty()
    message: string
}