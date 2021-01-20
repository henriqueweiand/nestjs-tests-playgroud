import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
})
export class PeopleModule {}
