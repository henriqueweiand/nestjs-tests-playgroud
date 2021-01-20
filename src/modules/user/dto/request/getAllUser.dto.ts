import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max } from 'class-validator';

export class GetAllUserRequestDto {
  @ApiProperty({
    description: 'Quantidade de registros a serem obtidos',
    default: 10,
    required: false,
    nullable: true,
  })
  @Transform((value) => parseInt(value))
  @IsOptional()
  @Max(50)
  take?: number = 10;

  @ApiProperty({
    description: 'Quantidade de registros a serem ignorados',
    default: 0,
    required: false,
    nullable: true,
  })
  @Transform((value) => parseInt(value))
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({
    description: 'Termo de busca para username',
    required: false,
    nullable: true,
  })
  @IsOptional()
  search?: string;
}
