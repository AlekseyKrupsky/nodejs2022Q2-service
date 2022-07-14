import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDB } from '../database/in-memory-db';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { EntityTypeUnion } from '../types/entity-types';

@Injectable()
export class FavoritesService {
  constructor(private readonly inMemoryDB: InMemoryDB) {}

  private readonly favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return this.favorites;
  }

  add(type: EntityTypeUnion, id: string): void {
    const item = this.inMemoryDB.selectById(type, id);

    if (item === undefined) {
      throw new HttpException(
        HttpStatusMessages.UNPROCESSABLE_ENTITY,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favorites[type].push(item);
  }

  remove(type: EntityTypeUnion, id: string): boolean {
    let deleted = false;

    this.favorites[type] = this.favorites[type].filter((item) => {
      if (item.id !== id) {
        return item;
      }

      deleted = true;
    });

    return deleted;
  }
}
