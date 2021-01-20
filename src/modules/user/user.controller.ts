import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionResponseDto } from '../common/dto/httpExceptionResponse.dto';
import { CreateUserDto } from './dto/request/createUser.dto';
import { GetAllUserRequestDto } from './dto/request/getAllUser.dto';
import { GetAllUserResponseDto } from './dto/response/getAllUserResponse.dto';
import { GetOneUserResponseDto } from './dto/response/getOneUserResponse.dto';
import { CreateUserResponseDto } from './dto/response/createUserReponse.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserResponseDto } from './dto/response/updateUserReponse.dto';
import { UpdateUserDto } from './dto/request/updateUser.dto';
import { DeleteUserResponseDto } from './dto/response/deleteUserReponse.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User criado com sucesso',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Usuário já existe',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
    type: HttpExceptionResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.service.create(user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de Users',
    type: GetAllUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users não encontradas',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.METHOD_NOT_ALLOWED,
    description: 'Não é possível trazer esse número de documentos',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
    type: HttpExceptionResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters: GetAllUserRequestDto) {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Busca por um User específico',
    type: GetOneUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User não encontrado',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
    type: HttpExceptionResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User atualizado com sucesso',
    type: UpdateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User não encontrada',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Dado já cadastrado',
    type: HttpExceptionResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UpdateUserResponseDto> {
    return await this.service.update(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User desativado',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
    type: HttpExceptionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User não encontrada',
    type: HttpExceptionResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    await this.service.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
    };
  }
}
