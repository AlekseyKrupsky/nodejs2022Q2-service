import { Column, Entity } from "typeorm";

@Entity('user')
export class UserEntity {
    @Column()
    login: string;

    @Column()
    password: string;
}