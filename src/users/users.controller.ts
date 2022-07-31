import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { FindOneParams } from '../classes/params/findOneParams';
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
  async getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params: FindOneParams) {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param() params: FindOneParams,
  ) {
    return this.usersService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    await this.usersService.remove(params.id);
  }
}
