import { ApiProperty } from '@nestjs/swagger';
import { People } from '../../../people/people.entity';

export class GetAllUserResponseDataDto extends People {}

export class GetAllUserResponseDto {
  @ApiProperty({
    description: 'Lista de clientes',
    type: GetAllUserResponseDataDto,
    isArray: true,
  })
  data: GetAllUserResponseDataDto[];

  @ApiProperty({
    description: 'Total de registros encontrados',
    type: 'number',
  })
  count: number;
}
