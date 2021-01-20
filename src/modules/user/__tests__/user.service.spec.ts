import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../common/__tests__/mock/mockType';
import { repositoryFactoryMock } from '../../common/__tests__/mock/repositoryFactory.mock';
import { GetAllUserRequestDto } from '../dto/request/getAllUser.dto';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { mockRequestCreateUserDto } from './mock/request/mockCreateUser.dto';
import {
  mockUserForUpdate,
  mockRequestUpdateUserDto,
} from './mock/request/mockUpdateUser.dto';
import { mockUser } from './mock/response/mockUser';

describe('userService', () => {
  let service: UserService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryFactoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      repository.save.mockImplementation(() => mockUser);

      await expect(service.create(mockRequestCreateUserDto)).resolves.toBe(
        mockUser,
      );
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      repository.save.mockImplementation(async () => mockUser);

      await expect(
        service.update(mockUserForUpdate.id, mockRequestUpdateUserDto),
      ).resolves.toBe(mockUser);
    });

    it('should not found for update', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => false);

      await expect(
        service.update('invalid-id', mockRequestUpdateUserDto),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw an error when trying to update', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new BadRequestException();
      });

      await expect(
        service.update(mockUser.id, mockRequestUpdateUserDto),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const userDeleted = {
        ...mockUser,
        deletedAt: '2021-01-09 20:17:21.445155',
      } as User;

      jest.spyOn(repository, 'findOne').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockReturnValue(userDeleted);

      await expect(service.delete(mockUser.id)).resolves.toBeTruthy();
    });

    it('should not found user in delete', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => false);

      await expect(service.delete(mockUser.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('should error on delete', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new BadRequestException();
      });

      await expect(service.delete(mockUser.id)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('get', () => {
    it('should an empty list', async () => {
      jest.spyOn(repository, 'findAndCount').mockReturnValue([[], 0]);

      const filters: GetAllUserRequestDto = {
        take: 15,
        skip: 0,
        search: '',
      };

      await expect(service.getAll(filters)).resolves.toStrictEqual({
        data: [],
        count: 0,
      });
    });

    it('should get a list (with search)', async () => {
      jest.spyOn(repository, 'findAndCount').mockReturnValue([[mockUser], 1]);

      const filters: GetAllUserRequestDto = {
        take: 15,
        skip: 0,
        search: 'with-search@gmail.com',
      };

      await expect(service.getAll(filters)).resolves.toStrictEqual({
        data: [mockUser],
        count: 1,
      });
    });

    it('should a get one user', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockUser);

      await expect(service.getOne(mockUser.id)).resolves.toStrictEqual(
        mockUser,
      );
    });

    it('should a not found user', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => false);

      await expect(service.getOne(mockUser.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
