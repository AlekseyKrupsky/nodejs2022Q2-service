import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { createHash, randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { InMemoryDB } from '../database/in-memory-db';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";

const DEFAULT_USER_ENTITY_VERSION = 1;

@Injectable()
export class UsersService extends EntityService<User> {
  constructor(
      inMemoryDB: InMemoryDB,
      // @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {
    super(EntityTypes.USERS, inMemoryDB);
  }

  // async createDB(createUserDto: CreateUserDto) {
  //   const createUser = this.userRepository.create(createUserDto);
  //
  //   return await this.userRepository.save(createUser);
  // }

  create(createUserDto: CreateUserDto): User {
    const createdDate: number = +Date.now();
    const passwordHash: string = this.getPasswordHexHash(
      createUserDto.password,
    );

    const user: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: passwordHash,
      version: DEFAULT_USER_ENTITY_VERSION,
      createdAt: createdDate,
      updatedAt: createdDate,
    };

    return this.inMemoryDB.insert(EntityTypes.USERS, user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findOne(id);

    const oldPasswordHash: string = this.getPasswordHexHash(
      updatePasswordDto.oldPassword,
    );

    if (oldPasswordHash === user.password) {
      this.inMemoryDB.update(EntityTypes.USERS, id, {
        password: this.getPasswordHexHash(updatePasswordDto.newPassword),
        version: user.version + 1,
        updatedAt: +Date.now(),
      });

      return user;
    }

    throw new HttpException(HttpStatusMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
  }

  getPasswordHexHash(password: string): string {
    const hash = createHash('sha256');

    return hash.update(password).digest('hex');
  }
}
