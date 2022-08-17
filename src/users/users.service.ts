import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { createHash } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './types/login-response.type';
import { RefreshResponse } from './types/refresh-response.type';

@Injectable()
export class UsersService extends EntityService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtTokenService: JwtService,
  ) {
    super(EntityTypes.USERS, userRepository);
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHash: string = this.getPasswordHexHash(
      createUserDto.password,
    );

    const createUser = this.userRepository.create({
      login: createUserDto.login,
      password: passwordHash,
    });

    return this.userRepository.save(createUser);
  }

  async login(loginData: CreateUserDto): Promise<LoginResponse> {
    const passwordHash: string = this.getPasswordHexHash(loginData.password);

    const user = await this.userRepository.findOneBy({
      login: loginData.login,
      password: passwordHash,
    });

    if (user === null) {
      throw new HttpException(
        HttpStatusMessages.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
    }

    const accessToken = this.createJWTToken(
      user,
      +process.env.TOKEN_EXPIRE_TIME,
      process.env.JWT_SECRET_KEY,
    );

    const refreshToken = this.createJWTToken(
      user,
      +process.env.TOKEN_REFRESH_EXPIRE_TIME,
      process.env.JWT_SECRET_REFRESH_KEY,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    try {
      const { userId, exp } = this.jwtTokenService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      if (exp < +Date.now()) {
        throw new Error('Token expired');
      }

      const user = await this.findOne(userId);

      const accessToken = this.createJWTToken(
        user,
        +process.env.TOKEN_EXPIRE_TIME,
        process.env.JWT_SECRET_KEY,
      );

      const newRefreshToken = this.createJWTToken(
        user,
        +process.env.TOKEN_REFRESH_EXPIRE_TIME,
        process.env.JWT_SECRET_REFRESH_KEY,
      );

      return {
        accessToken,
        newRefreshToken,
      };
    } catch {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(id);

    const oldPasswordHash: string = this.getPasswordHexHash(
      updatePasswordDto.oldPassword,
    );

    if (oldPasswordHash === user.password) {
      await this.userRepository.update(id, {
        password: this.getPasswordHexHash(updatePasswordDto.newPassword),
        version: user.version + 1,
        updatedAt: new Date(),
      });

      return this.findOne(id);
    }

    throw new HttpException(HttpStatusMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
  }

  private getPasswordHexHash(password: string): string {
    const hash = createHash('sha256');

    return hash.update(password).digest('hex');
  }

  private createJWTToken(
    user: UserEntity,
    expiresIn: number,
    secret: string,
  ): string {
    const expirationTime = +Date.now() + expiresIn * 1000;
    const payload = { userId: user.id, login: user.login, exp: expirationTime };

    return this.jwtTokenService.sign(payload, { secret: secret });
  }
}
