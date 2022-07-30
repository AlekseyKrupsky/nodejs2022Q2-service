import { MigrationInterface, QueryRunner } from "typeorm"

export class createTracksTable1659110149950 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS tracks
                                 (
                                     id VARCHAR(255) NOT NULL,
                                     name VARCHAR(255) NOT NULL,
                                     albumId VARCHAR(255) NOT NULL,
                                     artistId VARCHAR(255) NOT NULL,
                                     duration SMALLINT NOT NULL,
                                     CONSTRAINT table_tracks_id_pk PRIMARY KEY (id),    
                                     CONSTRAINT artists_id_fk FOREIGN KEY (artistId) REFERENCES public.artists(id),
                                     CONSTRAINT albums_id_fk FOREIGN KEY (albumId) REFERENCES public.albums(id)
                                 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS tracks`);
    }
}
