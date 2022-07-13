import {Injectable} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { randomUUID } from 'crypto';
import {InMemoryDB} from "../database/in-memory-db";
import {EntityTypes} from "../enums/entity-types";
import {EntityService} from "../classes/entity.service";
import {validateRelatedEntity} from "../classes/helper";
import {FavoritesService} from "../favorites/favorites.service";

@Injectable()
export class AlbumsService extends EntityService<Album> {
  private readonly favoritesService: FavoritesService;

  constructor(inMemoryDB: InMemoryDB, favoritesService: FavoritesService) {
    super(EntityTypes.ALBUMS, inMemoryDB);
    this.favoritesService = favoritesService;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const artistId = createAlbumDto.artistId;

    validateRelatedEntity(artistId, EntityTypes.ARTISTS, this.inMemoryDB);

    return this.inMemoryDB.insert(this.entityType, {
      id: randomUUID(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artistId ?? null,
    });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    validateRelatedEntity(updateAlbumDto.artistId, EntityTypes.ARTISTS, this.inMemoryDB);

    this.inMemoryDB.update(this.entityType, id, updateAlbumDto);

    return album;
  }

  remove(id: string): void {
    try {
      this.favoritesService.remove(this.entityType, id);
    } catch {}

    super.remove(id);
  }
}
