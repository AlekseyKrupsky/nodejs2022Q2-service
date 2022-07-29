import { MigrationInterface, QueryRunner } from "typeorm"

export class createAlbumsTable1659088525426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS albums
                                 (
                                     id     VARCHAR(255) NOT NULL,
                                     name  VARCHAR(255)        NOT NULL,
                                     year   SMALLINT            NOT NULL,
                                     artistId VARCHAR(255)       NOT NULL,
                                    CONSTRAINT table_albums_id_pk
    PRIMARY KEY (id)
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS albums`);
    }

}
