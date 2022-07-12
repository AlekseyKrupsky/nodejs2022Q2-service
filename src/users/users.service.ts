import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { createHash, randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatusMessages } from '../enums/http-status-messages';

const DEFAULT_USER_ENTITY_VERSION = 1;

@Injectable()
export class UsersService {
    private readonly users: { [key: string]: User } = {};

    create(createUserDto: CreateUserDto): User {
        const createdDate: number = Math.floor(Date.now() / 1000);
        const passwordHash: string = this.getPasswordHexHash(createUserDto.password);

        const user: User = {
            id: randomUUID(),
            login: createUserDto.login,
            password: passwordHash,
            version: DEFAULT_USER_ENTITY_VERSION,
            createdAt: createdDate,
            updatedAt: createdDate,
        };

        this.users[user.id] = user;

        return user;
    }

    findAll(): User[] {
        return Object.values(this.users);
    }

    findOne(id: string): User {
        if (this.users[id] !== undefined) {
            return this.users[id];
        }

        throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    update(id: string, updatePasswordDto: UpdatePasswordDto): User {
        if (this.users[id] !== undefined) {
            const user: User = this.findOne(id);
            const oldPasswordHash: string = this.getPasswordHexHash(updatePasswordDto.oldPassword);

            if (oldPasswordHash === user.password) {
                user.password = this.getPasswordHexHash(updatePasswordDto.newPassword);

                user.version++;
                user.updatedAt = Math.floor(Date.now() / 1000);

                return user;
            }

            throw new HttpException(HttpStatusMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
        }

        throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    remove(id: string): void {
        if (this.users[id] === undefined) {
            throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        delete this.users[id];
    }

    getPasswordHexHash(password: string): string {
        const hash = createHash('sha256');
        return hash
            .update(password)
            .digest('hex');
    }
}
