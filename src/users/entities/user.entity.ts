import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    login: string;

    @Column()
    password: string;

    @Column({ default: 1 })
    version: number;

    @CreateDateColumn({ type: 'timestamptz', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)',
        transformer: {
            to(value: Date): Date {
                return value;
            },
            from: (value: Date): number => +new Date(value)
        }
    })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)',
        transformer: {
            to(value: Date): Date {
                return value;
            },
            from: (value: Date): number => +new Date(value)
        }
    })
    updatedAt: Date;
}
