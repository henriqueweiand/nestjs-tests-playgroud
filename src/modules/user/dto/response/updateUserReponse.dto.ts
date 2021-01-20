import { OmitType } from '@nestjs/swagger';
import { User } from '../../user.entity';

export class UpdateUserResponseDto extends OmitType(User, ['people']) {}
