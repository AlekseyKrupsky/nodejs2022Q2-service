import { MigrationInterface, QueryRunner } from "typeorm"

export class createUsersTable1659078114121 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users
                                 (
                                     login     VARCHAR(255) UNIQUE NOT NULL,
                                     password  VARCHAR(255)        NOT NULL,
                                     version   SMALLINT            NOT NULL DEFAULT 1,
                                     createdAt TIMESTAMP           NOT NULL,
                                     updatedAt TIMESTAMP           NOT NULL,
                                    CONSTRAINT table_users_login_pk
    PRIMARY KEY (login)
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}
