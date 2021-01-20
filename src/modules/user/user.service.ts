import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/createUser.dto';
import { GetAllUserRequestDto } from './dto/request/getAllUser.dto';
import { UpdateUserDto } from './dto/request/updateUser.dto';
import { GetOneUserResponseDto } from './dto/response/getOneUserResponse.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async getOne(id: string): Promise<GetOneUserResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('User not found');
    }

    return entity;
  }

  async getAll(
    filters: GetAllUserRequestDto,
  ): Promise<{ data: User[]; count: number }> {
    const conditions: FindManyOptions<User> = {
      take: filters.take,
      skip: filters.skip,
      withDeleted: false,
    };

    if (filters.search) {
      conditions.where = { username: Like('%' + filters.search + '%') };
    }

    const [data, count] = await this.repository.findAndCount(conditions);

    return {
      data,
      count,
    };
  }

  async create(user: CreateUserDto): Promise<User> {
    const userToInsert = this.repository.create(user);
    const savedUser = await this.repository.save(userToInsert);

    delete savedUser.password;

    return savedUser;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('User not found');
    }

    try {
      const entityUpdate = this.repository.merge(entity, {
        ...user,
        id,
      });

      return await this.repository.save(entityUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('User not found');
    }

    try {
      entity.deletedAt = format(new Date(), 'yyyy-MM-dd');
      await this.repository.save(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }

    return true;
  }
}
