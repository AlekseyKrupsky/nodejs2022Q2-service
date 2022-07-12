import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto } from './interfaces/updateUserDto';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
    private readonly users: { [key: string]: User } = {};

    create(user: User): User {
        this.users[user.id] = user;

        return user;
    }

    getAll(): User[] {
        return Object.values(this.users);
    }

    getOne(id: string): User {
        if (this.users[id] !== undefined) {
            return this.users[id];
        }

        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    update(id: string, updatePasswordDto: UpdatePasswordDto): User {
        if (this.users[id] !== undefined) {
            const user: User = this.getOne(id);

            const hash = createHash('sha256');
            const oldPasswordHash: string = hash
                .update(updatePasswordDto.oldPassword)
                .digest('hex');

            if (oldPasswordHash === user.password) {
                const hash = createHash('sha256');

                user.password = hash
                    .update(updatePasswordDto.newPassword)
                    .digest('hex');
                user.version++;
                user.updatedAt = Math.floor(Date.now() / 1000);

                this.users[id] = user;

                return user;
            }

            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    delete(id: string): void {
        if (this.users[id] === undefined) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        delete this.users[id];
    }
}
