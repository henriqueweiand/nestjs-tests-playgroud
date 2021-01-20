import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { internet, name } from 'faker';
import { Repository } from 'typeorm';
import { createTestingModule } from '../../common/__tests__/server';
import { People } from '../../people/people.entity';
import { PeopleModule } from '../../people/people.module';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { mockRequestCreateUserDto } from './mock/request/mockCreateUser.dto';

dotenv.config();

let app: NestFastifyApplication;
let repository: Repository<User>;
let peopleRepository: Repository<People>;
let createdUserRegister: User;

describe('User (e2e)', () => {
  beforeAll(async () => {
    const module = await createTestingModule({
      imports: [UserModule, PeopleModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(People),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    repository = module.get<Repository<User>>(getRepositoryToken(User));
    peopleRepository = module.get<Repository<People>>(
      getRepositoryToken(People),
    );
    await app.init();
  });

  beforeAll(async () => {
    await repository.delete({});
    await peopleRepository.delete({});

    const savedPeople = await peopleRepository.save({
      firtName: name.firstName(),
      lastName: name.lastName(),
    });

    createdUserRegister = await repository.save({
      username: internet.email(),
      password: internet.password(8),
      people: savedPeople,
    });
  });

  describe('Create', () => {
    it('It should create register', async () => {
      return await app
        .inject({
          method: 'POST',
          url: `/user`,
          payload: mockRequestCreateUserDto,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(201);
          const body = JSON.parse(response.body);
          expect(body.id).toBeDefined();
        });
    });
  });

  describe('Get All', () => {
    it('It should get all register', async () => {
      return await app
        .inject({
          method: 'GET',
          url: `/user`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(200);

          const body = JSON.parse(response.body);
          expect(body.data.length).toBeGreaterThanOrEqual(1);
          expect(body.count).toBeGreaterThanOrEqual(1);
        });
    });

    it('It should get all register (with filter)', async () => {
      const savedPeople = await peopleRepository.save({
        firtName: name.firstName(),
        lastName: name.lastName(),
      });

      const newUserForDelete = await repository.save({
        username: internet.email(),
        password: internet.password(8),
        people: savedPeople,
      });

      return await app
        .inject({
          method: 'GET',
          url: `/user?search=${newUserForDelete.username}`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(200);

          const body = JSON.parse(response.body);
          expect(body.data.length).toBe(1);
          expect(body.count).toBe(1);
        });
    });
  });

  describe('Get One', () => {
    it('It should get a register', async () => {
      return await app
        .inject({
          method: 'GET',
          url: `/user/${createdUserRegister.id}`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(200);

          const body = JSON.parse(response.body);
          expect(body.id).toBeDefined();
        });
    });

    it('It should not found user', async () => {
      return await app
        .inject({
          method: 'GET',
          url: `/user/5cc139f5-8559-47b9-a337-438b0d682091`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(404);
        });
    });
  });

  describe('Update', () => {
    it('It should update a user', async () => {
      const username = internet.email();

      return await app
        .inject({
          method: 'PATCH',
          url: `/user/${createdUserRegister.id}`,
          payload: {
            username: username,
          },
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(200);
          const body = JSON.parse(response.body);
          expect(body.username).toBe(username);
          expect(body.id).toBeDefined();
        });
    });

    it('It should not found user for update', async () => {
      return await app
        .inject({
          method: 'PATCH',
          url: `/user/5cc139f5-8559-47b9-a337-438b0d682091`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(404);
        });
    });
  });

  describe('Delete', () => {
    it('It should delete a user', async () => {
      const savedPeople = await peopleRepository.save({
        firtName: name.firstName(),
        lastName: name.lastName(),
      });

      const newUserForDelete = await repository.save({
        username: internet.email(),
        password: internet.password(8),
        people: savedPeople,
      });

      return await app
        .inject({
          method: 'DELETE',
          url: `/user/${newUserForDelete.id}`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(200);
          const body = JSON.parse(response.body);
          expect(body.message).toBe('ok');
        });
    });

    it('It should not found user for delete', async () => {
      return await app
        .inject({
          method: 'DELETE',
          url: `/user/5cc139f5-8559-47b9-a337-438b0d682091`,
        })
        .then((response: any) => {
          expect(response.statusCode).toBe(404);
        });
    });
  });

  afterAll(async () => {
    await repository.delete({});
    await peopleRepository.delete({});
    await app.close();
  });
});
