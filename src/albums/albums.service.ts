import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Injectable()
export class AlbumsService extends EntityService<Album> {
  private readonly favoritesService: FavoritesService;

  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    favoritesService: FavoritesService,
  ) {
    super(EntityTypes.ALBUMS, albumRepository);
    this.favoritesService = favoritesService;
  }

  create(createAlbumDto: CreateAlbumDto) {
    try {
      const album = this.albumRepository.create(createAlbumDto);

      return this.albumRepository.save(album);
    } catch {
      throw new HttpException(
        `Provided entity is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const updateResult = await this.albumRepository.update(
        id,
        updateAlbumDto,
      );

      if (updateResult.affected === 1) {
        return this.findOne(id);
      }
    } catch {
      throw new HttpException(
        `Provided entity is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    await this.favoritesService.remove(this.entityType, id);

    await super.remove(id);
  }
}
