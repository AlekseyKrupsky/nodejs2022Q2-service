import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [FavoritesModule, TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
