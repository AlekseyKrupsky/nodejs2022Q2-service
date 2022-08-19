import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1659078114121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users
                                 (
                                     id UUID DEFAULT uuid_generate_v4(),
                                     login     VARCHAR(255) NOT NULL,
                                     password  VARCHAR(255)        NOT NULL,
                                     version   SMALLINT            NOT NULL DEFAULT 1,
                                     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                                     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                                     CONSTRAINT table_users_id_pk PRIMARY KEY (id)
                                 )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
