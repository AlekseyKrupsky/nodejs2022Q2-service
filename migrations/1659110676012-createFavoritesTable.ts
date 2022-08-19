import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFavoritesTable1659110676012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(
      `CREATE TYPE favorite AS ENUM ('artists', 'albums', 'tracks')`,
    );

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS favorites
                                 (
                                     "userId" UUID NOT NULL,
                                     "favoriteItemId" UUID NOT NULL,
                                     "favoriteType" favorite NOT NULL,
                                     CONSTRAINT users_id_fk FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE,
                                     CONSTRAINT table_favorites_pk PRIMARY KEY ("userId", "favoriteItemId", "favoriteType")
                                 )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS favorites`);
    await queryRunner.query(`DROP TYPE IF EXISTS favorite`);
  }
}
