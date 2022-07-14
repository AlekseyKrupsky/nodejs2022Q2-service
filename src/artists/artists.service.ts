import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { randomUUID } from 'crypto';
import { InMemoryDB } from '../database/in-memory-db';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import { FavoritesService } from '../favorites/favorites.service';
import { Album } from '../albums/interfaces/album.interface';
import { Track } from '../tracks/interfaces/track.interface';

@Injectable()
export class ArtistsService extends EntityService<Artist> {
  private readonly favoritesService: FavoritesService;

  constructor(inMemoryDB: InMemoryDB, favoritesService: FavoritesService) {
    super(EntityTypes.ARTISTS, inMemoryDB);
    this.favoritesService = favoritesService;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    return this.inMemoryDB.insert(this.entityType, artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    this.inMemoryDB.update(this.entityType, id, updateArtistDto);

    return artist;
  }

  remove(id: string): void {
    this.favoritesService.remove(this.entityType, id);

    const albums: Album[] = this.inMemoryDB.selectAll(EntityTypes.ALBUMS);

    for (const albumId in albums) {
      if (albums[albumId].artistId === id) {
        albums[albumId].artistId = null;
      }
    }

    const tracks: Track[] = this.inMemoryDB.selectAll(EntityTypes.TRACKS);

    for (const trackId in tracks) {
      if (tracks[trackId].artistId === id) {
        tracks[trackId].artistId = null;
      }
    }

    super.remove(id);
  }
}
