import { CreateUserResponseDto } from '../../../dto/response/createUserReponse.dto';

export const mockResponseCreateUserDto = {
  id: '111111111-222222222-333333333',
  username: 'almir@gmail.com',
  password: '$2b$10$XE3BLP6SR5dxHZ3O8EtW9Owz4FwNQv6fPXkyP6vUhLH6bg2y5qlfO',
  people: {
    id: '3333333-22222222-11111111',
    firtName: 'almir',
    lastName: 'junior',
  },
} as CreateUserResponseDto;
