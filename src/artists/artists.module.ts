import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDBModule } from '../database/database.module';
import {FavoritesModule} from "../favorites/favorites.module";

@Module({
  imports: [InMemoryDBModule, FavoritesModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
