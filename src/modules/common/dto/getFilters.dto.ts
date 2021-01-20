import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class GetFiltersDto {
  @ApiProperty({ description: 'Id do programa (Pode ser passado pelo header)' })
  @IsUUID()
  @IsNotEmpty()
  programId: string;

  @ApiProperty({ description: 'Id da loja (Pode ser passado pelo header)' })
  @IsUUID()
  @IsNotEmpty()
  storeId: string;

  @ApiProperty({ description: 'Filtro de status', type: Boolean })
  @IsOptional()
  @IsBooleanString()
  status?: string;
}
