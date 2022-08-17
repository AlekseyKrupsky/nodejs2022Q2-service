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
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { FindOneParams } from '../classes/params/findOneParams';
import { PasswordInterceptor } from './password.interceptor';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { HttpExceptionFilter } from './http-exception.filter';
import { UserEntity } from './entities/user.entity';
import { LoginResponse } from './types/login-response.type';
import { RefreshResponse } from './types/refresh-response.type';

@Controller()
@UseInterceptors(new PasswordInterceptor())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() loginData: CreateUserDto): Promise<LoginResponse> {
    return this.usersService.login(loginData);
  }

  @UseFilters(new HttpExceptionFilter())
  @Post('auth/refresh')
  @HttpCode(200)
  refresh(@Body() refreshTokenData: RefreshTokenDto): Promise<RefreshResponse> {
    return this.usersService.refresh(refreshTokenData.refreshToken);
  }

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get('user')
  async getAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  async getOne(@Param() params: FindOneParams): Promise<UserEntity> {
    return this.usersService.findOne(params.id);
  }

  @Put('user/:id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param() params: FindOneParams,
  ): Promise<UserEntity> {
    return this.usersService.update(params.id, updatePasswordDto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams): Promise<void> {
    await this.usersService.remove(params.id);
  }
}
