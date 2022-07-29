import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    login: string;

    @Column()
    password: string;
}
