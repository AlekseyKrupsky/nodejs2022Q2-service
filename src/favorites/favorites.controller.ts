import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Favorites } from './interfaces/favorites.interface';
import { favoritesParams } from '../classes/params/favoritesParams';
import { FavoritesService } from './favorites.service';
import { EntityTypes } from '../enums/entity-types';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): Favorites {
    return this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  add(@Param() params: favoritesParams): Favorites {
    if (params.type === 'track') {
      this.favoritesService.add(EntityTypes.TRACKS, params.id);
    } else if (params.type === 'album') {
      this.favoritesService.add(EntityTypes.ALBUMS, params.id);
    } else if (params.type === 'artist') {
      this.favoritesService.add(EntityTypes.ARTISTS, params.id);
    } else {
      throw new HttpException(
        HttpStatusMessages.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.findAll();
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  remove(@Param() params: favoritesParams): void {
    let deleted = false;

    if (params.type === 'track') {
      deleted = this.favoritesService.remove(EntityTypes.TRACKS, params.id);
    } else if (params.type === 'album') {
      deleted = this.favoritesService.remove(EntityTypes.ALBUMS, params.id);
    } else if (params.type === 'artist') {
      deleted = this.favoritesService.remove(EntityTypes.ARTISTS, params.id);
    } else {
      throw new HttpException(
        HttpStatusMessages.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!deleted) {
      throw new HttpException(
        HttpStatusMessages.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
