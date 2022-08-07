import { MigrationInterface, QueryRunner } from "typeorm"

export class createArtistsTable1659087790070 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS artists
                                 (
                                     id UUID DEFAULT uuid_generate_v4(),
                                     name   VARCHAR(255) NOT NULL,
                                     grammy BOOLEAN NOT NULL DEFAULT FALSE,
                                     CONSTRAINT table_artists_id_primary_key PRIMARY KEY (id)
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS artists`);
    }
}
