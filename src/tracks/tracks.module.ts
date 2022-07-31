import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackEntity} from "./entities/track.entity";

@Module({
  imports: [
    FavoritesModule,
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
