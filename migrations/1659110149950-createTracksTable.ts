import { MigrationInterface, QueryRunner } from "typeorm"

export class createTracksTable1659110149950 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS tracks
                                 (
                                     id UUID DEFAULT uuid_generate_v4(),
                                     name VARCHAR(255) NOT NULL,
                                     "albumId" UUID NULL DEFAULT NULL,
                                    "artistId" UUID NULL DEFAULT NULL,
                                     duration SMALLINT NOT NULL,
                                     CONSTRAINT table_tracks_id_pk PRIMARY KEY (id),    
                                     CONSTRAINT artists_id_fk FOREIGN KEY ("artistId") REFERENCES public.artists(id) ON DELETE SET NULL,
                                     CONSTRAINT albums_id_fk FOREIGN KEY ("albumId") REFERENCES public.albums(id) ON DELETE SET NULL
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS tracks`);
    }
}
