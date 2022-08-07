import { MigrationInterface, QueryRunner } from "typeorm"

export class createAlbumsTable1659088525426 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS albums
                                 (
                                     id UUID DEFAULT uuid_generate_v4(),
                                     name  VARCHAR(255)        NOT NULL,
                                     year   SMALLINT            NOT NULL,
                                     "artistId" UUID NULL DEFAULT NULL,
                                     CONSTRAINT table_albums_id_pk PRIMARY KEY (id),
                                     CONSTRAINT artists_id_fk FOREIGN KEY ("artistId") REFERENCES public.artists(id) ON DELETE SET NULL
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS albums`);
    }
}
