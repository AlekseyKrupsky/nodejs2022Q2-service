import { Module } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
  ]
})
export class AppModule {}
