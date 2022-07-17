import { Injectable } from '@nestjs/common';
import { DatabaseInterface } from '../interfaces/database.interface';
import { EntityWithIdInterface } from '../interfaces/entity-with-id.interface';
import { UpdateDtoInterface } from '../interfaces/update-dto-interface';
import { User } from '../users/interfaces/user.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Album } from '../albums/interfaces/album.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { EntityTypeUnion } from '../types/entity-types';

@Injectable()
export class InMemoryDB implements DatabaseInterface {
  private readonly users: { [key: string]: User } = {};
  private readonly artists: { [key: string]: Artist } = {};
  private readonly albums: { [key: string]: Album } = {};
  private readonly tracks: { [key: string]: Track } = {};

  insert<Type extends EntityWithIdInterface>(
    entity: EntityTypeUnion,
    row: Type,
  ): Type {
    this[entity][row.id] = row;

    return row;
  }

  selectById(entity: EntityTypeUnion, id: string) {
    return this[entity][id];
  }

  selectAll(entity: EntityTypeUnion) {
    return this[entity];
  }

  update(entity: EntityTypeUnion, id: string, payload: UpdateDtoInterface) {
    for (const key in payload) {
      this[entity][id][key] = payload[key];
    }
  }

  delete(entity: EntityTypeUnion, id: string): void {
    delete this[entity][id];
  }
}
