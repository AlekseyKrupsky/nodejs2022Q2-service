import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { randomUUID } from 'crypto';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Injectable()
export class ArtistsService {
  private readonly artists: { [key: string]: Artist } = {};

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists[artist.id] = artist;

    return artist;
  }

  findAll(): Artist[] {
    return Object.values(this.artists);
  }

  findOne(id: string): Artist {
    if (this.artists[id] !== undefined) {
      return this.artists[id];
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (this.artists[id] !== undefined) {
      for (const key in updateArtistDto) {
        this.artists[id][key] = updateArtistDto[key];
      }

      return this.artists[id];
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  remove(id: string): void {
    if (this.artists[id] === undefined) {
      throw new HttpException(
        HttpStatusMessages.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    delete this.artists[id];
  }
}
