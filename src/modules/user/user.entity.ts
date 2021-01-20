import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BaseCollection } from '../common/entities/base.entity';
import { People } from '../people/people.entity';

@Entity()
export class User extends BaseCollection {
  @IsNotEmpty()
  @Column({
    nullable: false,
  })
  @ApiProperty({
    description: 'Username',
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha de acesso',
    required: true,
  })
  @Column({
    nullable: false,
  })
  password: string;

  @OneToOne(() => People, (people) => people.user, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  people: People;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
