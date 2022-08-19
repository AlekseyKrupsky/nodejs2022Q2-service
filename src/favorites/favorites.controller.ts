import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { favoritesParams } from '../classes/params/favoritesParams';
import { FavoritesService } from './favorites.service';
import { EntityTypes } from '../enums/entity-types';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  async add(@Param() params: favoritesParams, @Headers() headers) {
    const authHeader = headers.authorization;

    if (params.type === 'track') {
      await this.favoritesService.add(
        EntityTypes.TRACKS,
        params.id,
        authHeader,
      );
    } else if (params.type === 'album') {
      await this.favoritesService.add(
        EntityTypes.ALBUMS,
        params.id,
        authHeader,
      );
    } else if (params.type === 'artist') {
      await this.favoritesService.add(
        EntityTypes.ARTISTS,
        params.id,
        authHeader,
      );
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
  async remove(
    @Param() params: favoritesParams,
    @Headers() headers,
  ): Promise<void> {
    const authHeader = headers.authorization;
    let deleted = false;

    if (params.type === 'track') {
      deleted = await this.favoritesService.remove(
        EntityTypes.TRACKS,
        params.id,
        authHeader,
      );
    } else if (params.type === 'album') {
      deleted = await this.favoritesService.remove(
        EntityTypes.ALBUMS,
        params.id,
        authHeader,
      );
    } else if (params.type === 'artist') {
      deleted = await this.favoritesService.remove(
        EntityTypes.ARTISTS,
        params.id,
        authHeader,
      );
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
