import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseCollection {
  @ApiProperty({ description: 'Id da entidade' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @ApiProperty({
    description: 'Data de criação do registro',
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  createDate?: string;

  @ApiProperty({
    description: 'Data de atualização do registro',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updateDate?: string;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: string;
}
