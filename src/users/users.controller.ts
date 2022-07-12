import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Delete, HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './interfaces/createUserDto';
import { User } from './interfaces/user.interface';
import { createHash, randomUUID } from 'crypto';
import { UpdatePasswordDto } from './interfaces/updateUserDto';
import { FindOneParams } from './interfaces/findOneParams';
import { UpdateParams } from './interfaces/updateParams';
import { PasswordInterceptor } from './password.interceptor';

const DEFAULT_USER_ENTITY_VERSION = 1;

@Controller('user')
@UseInterceptors(new PasswordInterceptor())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdDate: number = Math.floor(Date.now() / 1000);
    const hash = createHash('sha256');
    const passwordHash: string = hash
      .update(createUserDto.password)
      .digest('hex');

    const user: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: passwordHash,
      version: DEFAULT_USER_ENTITY_VERSION,
      createdAt: createdDate,
      updatedAt: createdDate,
    };

    return this.usersService.create(user);
  }

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param() params: FindOneParams): User {
    return this.usersService.getOne(params.id);
  }

  @Put(':id')
  update(@Body() updatePasswordDto: UpdatePasswordDto, @Param() params: UpdateParams): User {
    return this.usersService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params: UpdateParams): void {
    this.usersService.delete(params.id);
  }
}
