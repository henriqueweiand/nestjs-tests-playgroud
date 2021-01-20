import { CreateUserDto } from '../../../dto/request/createUser.dto';

export const mockRequestCreateUserDto = {
  username: 'almir@gmail.com',
  password: '123456',
  people: {
    firtName: 'almir',
    lastName: 'junior',
  },
} as CreateUserDto;
