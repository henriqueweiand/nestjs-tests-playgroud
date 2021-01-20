import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponseDto {
  @ApiProperty({
    description: 'Número de erro HTTP',
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
  })
  message: string;
}
