import { EntityTypes } from '../enums/entity-types';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { InMemoryDB } from '../database/in-memory-db';

export class EntityService<EntityType> {
  protected readonly entityType: `${EntityTypes}`;
  protected readonly inMemoryDB: InMemoryDB;

  constructor(entityType: `${EntityTypes}`, inMemoryDB: InMemoryDB) {
    this.entityType = entityType;
    this.inMemoryDB = inMemoryDB;
  }

  findAll(): EntityType[] {
    return Object.values(this.inMemoryDB.selectAll(this.entityType));
  }

  findOne(id: string): EntityType {
    const row = this.inMemoryDB.selectById(this.entityType, id);

    if (row !== undefined) {
      return row;
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  remove(id: string): void {
    if (this.findOne(id)) {
      this.inMemoryDB.delete(this.entityType, id);
    }
  }
}
