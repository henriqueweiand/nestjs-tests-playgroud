import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../../user.entity';

class UpdateUser extends PartialType(User) {}

export class UpdateUserDto extends OmitType(UpdateUser, [
  'id',
  'updateDate',
  'createDate',
  'people',
]) {}
