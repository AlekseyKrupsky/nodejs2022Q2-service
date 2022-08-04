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
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller()
@UseInterceptors(new PasswordInterceptor())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() loginData: CreateUserDto) {
    return this.usersService.login(loginData);
  }

  @Post('auth/refresh')
  @HttpCode(200)
  refresh(@Body() refreshTokenData: RefreshTokenDto) {
    return this.usersService.refresh(refreshTokenData.refreshToken);
  }

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('user')
  async getAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  async getOne(@Param() params: FindOneParams) {
    return this.usersService.findOne(params.id);
  }

  @Put('user/:id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param() params: FindOneParams,
  ) {
    return this.usersService.update(params.id, updatePasswordDto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    await this.usersService.remove(params.id);
  }
}
