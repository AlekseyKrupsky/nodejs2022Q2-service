import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackEntity} from "../tracks/entities/track.entity";
import {AlbumEntity} from "../albums/entities/album.entity";
import {ArtistEntity} from "../artists/entities/artist.entity";
import {FavoriteEntity} from "./entities/favorite.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([AlbumEntity]),
      TypeOrmModule.forFeature([ArtistEntity]),
      TypeOrmModule.forFeature([TrackEntity]),
      TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
