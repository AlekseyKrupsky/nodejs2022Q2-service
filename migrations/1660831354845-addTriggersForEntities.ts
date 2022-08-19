import { MigrationInterface, QueryRunner } from 'typeorm';

const functionTemplate = `
            CREATE OR REPLACE FUNCTION delete_%s_from_favorite() RETURNS TRIGGER LANGUAGE PLPGSQL AS
            $$
            DECLARE itemId UUID;
            BEGIN
                itemId := OLD.id;
                
                DELETE FROM public.favorites WHERE "favoriteItemId" = itemId AND "favoriteType" = '%s';
                
                RETURN OLD;
            END;
            $$
        `;

const triggerTemplate = `
            CREATE TRIGGER delete_from_favorite_on_delete_%s
            AFTER DELETE ON %s
            FOR EACH ROW
            EXECUTE PROCEDURE delete_%s_from_favorite();
        `;

const functionRevertTemplate = `DROP TRIGGER IF EXISTS delete_from_favorite_on_delete_%s ON %s`;

const triggerRevertTemplate = `DROP FUNCTION IF EXISTS delete_%s_from_favorite()`;

const ARTISTS_TABLE = 'artists';
const TRACKS_TABLE = 'tracks';
const ALBUMS_TABLE = 'albums';

export class addTriggersForEntities1660831354845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(functionTemplate.replaceAll('%s', ARTISTS_TABLE));
    await queryRunner.query(triggerTemplate.replaceAll('%s', ARTISTS_TABLE));

    await queryRunner.query(functionTemplate.replaceAll('%s', TRACKS_TABLE));
    await queryRunner.query(triggerTemplate.replaceAll('%s', TRACKS_TABLE));

    await queryRunner.query(functionTemplate.replaceAll('%s', ALBUMS_TABLE));
    await queryRunner.query(triggerTemplate.replaceAll('%s', ALBUMS_TABLE));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      functionRevertTemplate.replaceAll('%s', ARTISTS_TABLE),
    );
    await queryRunner.query(
      triggerRevertTemplate.replaceAll('%s', ARTISTS_TABLE),
    );

    await queryRunner.query(
      functionRevertTemplate.replaceAll('%s', TRACKS_TABLE),
    );
    await queryRunner.query(
      triggerRevertTemplate.replaceAll('%s', TRACKS_TABLE),
    );

    await queryRunner.query(
      functionRevertTemplate.replaceAll('%s', ALBUMS_TABLE),
    );
    await queryRunner.query(
      triggerRevertTemplate.replaceAll('%s', ALBUMS_TABLE),
    );
  }
}
