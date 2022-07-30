import { MigrationInterface, QueryRunner } from "typeorm"

export class createFavoritesTable1659110676012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE favorite AS ENUM ('artists', 'albums', 'tracks')`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS favorites
                                 (
                                     userLogin VARCHAR(255) NOT NULL,
                                     favoriteItemId VARCHAR(255) NOT NULL,
                                     favoriteType favorite NOT NULL,
                                     CONSTRAINT table_favorites_pk PRIMARY KEY (userLogin, favoriteItemId, favoriteType),
                                     CONSTRAINT users_id_fk FOREIGN KEY (userLogin) REFERENCES public.users(login)
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS favorites`);
    }

}
