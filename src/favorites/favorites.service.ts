import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { EntityTypeUnion } from '../types/entity-types';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { In, Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { EntityTypes } from '../enums/entity-types';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    const favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const allFavorites = await this.favoriteRepository.find();

    allFavorites.forEach((item) => {
      if (item.favoriteType === EntityTypes.ALBUMS) {
        favorites.albums.push(item.favoriteItemId);
      } else if (item.favoriteType === EntityTypes.ARTISTS) {
        favorites.artists.push(item.favoriteItemId);
      } else if (item.favoriteType === EntityTypes.TRACKS) {
        favorites.tracks.push(item.favoriteItemId);
      }
    });

    favorites.albums = await this.albumRepository.findBy({
      id: In(favorites.albums),
    });
    favorites.artists = await this.artistRepository.findBy({
      id: In(favorites.artists),
    });
    favorites.tracks = await this.trackRepository.findBy({
      id: In(favorites.tracks),
    });

    return favorites;
  }

  async add(type: EntityTypeUnion, id: string) {
    let repository;

    switch (type) {
      case EntityTypes.ARTISTS:
        repository = this.artistRepository;
        break;
      case EntityTypes.ALBUMS:
        repository = this.albumRepository;
        break;
      case EntityTypes.TRACKS:
        repository = this.trackRepository;
        break;
    }

    const item = await repository.findOneBy({ id: id });

    if (item === null) {
      throw new HttpException(
        HttpStatusMessages.UNPROCESSABLE_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = this.favoriteRepository.create({
      favoriteItemId: id,
      favoriteType: type,
    });

    await this.favoriteRepository.save(favorite);
  }

  async remove(type: EntityTypeUnion, id: string): Promise<boolean> {
    const result = await this.favoriteRepository.delete({
      favoriteType: type,
      favoriteItemId: id,
    });

    return result.affected !== 0;
  }
}
