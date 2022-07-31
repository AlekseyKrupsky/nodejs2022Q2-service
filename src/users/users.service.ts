import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { createHash } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends EntityService<User> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(EntityTypes.USERS, userRepository);
  }

  create(createUserDto: CreateUserDto) {
    const passwordHash: string = this.getPasswordHexHash(
      createUserDto.password,
    );

    const createUser = this.userRepository.create({
      login: createUserDto.login,
      password: passwordHash,
    });

    return this.userRepository.save(createUser);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
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

  getPasswordHexHash(password: string): string {
    const hash = createHash('sha256');

    return hash.update(password).digest('hex');
  }
}
