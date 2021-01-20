import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { People } from '../../../people/people.entity';
import { User } from '../../user.entity';

class UserDto extends OmitType(User, [
  'id',
  'people',
  'updateDate',
  'createDate',
]) {}

class PeopleDto extends OmitType(People, ['id', 'updateDate', 'createDate']) {}

class PeopleCreateUserDto {
  @ApiProperty({
    description:
      'Entidade relacionada caso o usuário deve possuir acesso ao sistema',
    required: true,
  })
  @IsNotEmptyObject()
  people: PeopleDto;
}

export class CreateUserDto extends IntersectionType(
  UserDto,
  PeopleCreateUserDto,
) {}
