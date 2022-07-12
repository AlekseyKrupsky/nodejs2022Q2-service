import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Delete,
  HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { createHash, randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { FindOneParams } from './interfaces/findOneParams';
import { UpdateParams } from './interfaces/updateParams';
import { PasswordInterceptor } from './password.interceptor';

@Controller('user')
@UseInterceptors(new PasswordInterceptor())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param() params: FindOneParams): User {
    return this.usersService.findOne(params.id);
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
