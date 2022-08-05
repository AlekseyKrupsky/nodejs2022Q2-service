import { Module } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import Ormconfig from './../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
    AuthModule,
    TypeOrmModule.forRoot(Ormconfig),
  ],
})
export class AppModule {}
