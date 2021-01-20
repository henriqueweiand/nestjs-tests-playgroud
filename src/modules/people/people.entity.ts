import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseCollection } from '../common/entities/base.entity';
import { User } from '../user/user.entity';

@Entity()
export class People extends BaseCollection {
  @IsNotEmpty()
  @Column({
    nullable: false,
  })
  @ApiProperty({
    description: 'Primeiro nome',
    required: true,
  })
  firtName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Último nome',
    required: true,
  })
  @Column({
    nullable: false,
  })
  lastName: string;

  @IsOptional()
  @OneToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  user?: User;
}
