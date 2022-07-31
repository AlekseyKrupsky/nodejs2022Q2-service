import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtistEntity} from "./entities/artist.entity";

@Module({
  imports: [
      FavoritesModule,
      TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
