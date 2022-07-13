import {Injectable} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {Track} from "./interfaces/track.interface";
import {EntityService} from "../classes/entity.service";
import {InMemoryDB} from "../database/in-memory-db";
import {EntityTypes} from "../enums/entity-types";
import {randomUUID} from "crypto";
import {validateRelatedEntity} from "../classes/helper";
import {FavoritesService} from "../favorites/favorites.service";

@Injectable()
export class TracksService extends EntityService<Track> {
  private readonly favoritesService: FavoritesService;

  constructor(inMemoryDB: InMemoryDB, favoritesService: FavoritesService) {
    super(EntityTypes.TRACKS, inMemoryDB);
    this.favoritesService = favoritesService;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const { albumId, artistId } = createTrackDto;

    validateRelatedEntity(artistId, EntityTypes.ARTISTS, this.inMemoryDB);
    validateRelatedEntity(albumId, EntityTypes.ALBUMS, this.inMemoryDB);

    return this.inMemoryDB.insert(this.entityType, {
      id: randomUUID(),
      name: createTrackDto.name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration: createTrackDto.duration,
    });
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);
    const { artistId, albumId } = updateTrackDto;

    validateRelatedEntity(artistId, EntityTypes.ARTISTS, this.inMemoryDB);
    validateRelatedEntity(albumId, EntityTypes.ALBUMS, this.inMemoryDB);

    this.inMemoryDB.update(this.entityType, id, updateTrackDto);

    return track;
  }

  remove(id: string): void {
    this.favoritesService.remove(this.entityType, id);

    super.remove(id);
  }
}
