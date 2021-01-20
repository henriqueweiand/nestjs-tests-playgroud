import { User } from 'src/modules/user/user.entity';
import { UpdateUserDto } from '../../../dto/request/updateUser.dto';

export const mockUserForUpdate = {
  id: '111111111-222222222-333333333',
  username: 'almir@gmail.com',
  password: '$2b$10$XE3BLP6SR5dxHZ3O8EtW9Owz4FwNQv6fPXkyP6vUhLH6bg2y5qlfO',
} as User;

export const mockRequestUpdateUserDto = {
  username: mockUserForUpdate.username,
  password: mockUserForUpdate.password,
} as UpdateUserDto;
