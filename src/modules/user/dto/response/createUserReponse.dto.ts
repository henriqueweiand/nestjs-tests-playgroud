import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { People } from '../../../people/people.entity';
import { User } from '../../user.entity';

class UserDto extends OmitType(User, ['people']) {}

class PeopleCreateUserDto {
  @ApiProperty({
    description:
      'Entidade relacionada caso o usuário deve possuir acesso ao sistema',
    required: true,
  })
  @IsNotEmptyObject()
  people: People;
}

export class CreateUserResponseDto extends IntersectionType(
  UserDto,
  PeopleCreateUserDto,
) {}
