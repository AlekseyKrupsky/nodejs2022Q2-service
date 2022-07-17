import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDBModule } from '../database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [InMemoryDBModule, FavoritesModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
