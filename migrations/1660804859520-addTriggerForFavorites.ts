import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTriggerForFavorites1660804859520 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION check_foreign_id_exists() RETURNS TRIGGER LANGUAGE PLPGSQL AS
            $$
            DECLARE cnt INT;
            DECLARE entityType VARCHAR(10);
            DECLARE itemId UUID;
            BEGIN
                entityType := NEW."favoriteType";
                itemId := NEW."favoriteItemId";
                
                IF entityType = 'artists' THEN
                    cnt := (SELECT COUNT(artists.id) FROM public.artists WHERE artists.id = itemId);
                ELSIF entityType = 'albums' THEN
                    cnt := (SELECT COUNT(albums.id) FROM public.albums WHERE albums.id = itemId);
                ELSIF entityType = 'tracks' THEN
                    cnt := (SELECT COUNT(tracks.id) FROM public.tracks WHERE tracks.id = itemId);
                END IF;
    
                IF cnt != 1 THEN
                    RAISE EXCEPTION 'Invalid favoriteItemId';
                ELSE
                    RETURN NEW;
                END IF;
            END;
            $$
        `);

        await queryRunner.query(`
            CREATE TRIGGER check_favourite_on_insert 
            BEFORE INSERT ON favorites
            FOR EACH ROW
            EXECUTE PROCEDURE check_foreign_id_exists();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS check_favourite_on_insert ON favorites`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS check_foreign_id_exists()`);
    }
}
