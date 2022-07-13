import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import {InMemoryDBModule} from "../database/database.module";
import {FavoritesModule} from "../favorites/favorites.module";

@Module({
  imports: [InMemoryDBModule, FavoritesModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
