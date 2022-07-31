import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpStatusMessages } from '../enums/http-status-messages';
import { EntityTypeUnion } from '../types/entity-types';

export class EntityService<EntityType> {
  protected readonly entityType: EntityTypeUnion;
  protected readonly repository;

  constructor(entityType: EntityTypeUnion, repository) {
    this.entityType = entityType;
    this.repository = repository;
  }

  findAll(): EntityType[] {
    return this.repository.find();
  }

  async findOne(id: string): Promise<EntityType> {
    const item = await this.repository.findOneBy({ id: id });

    if (item === null) {
      throw new HttpException(
          HttpStatusMessages.NOT_FOUND,
          HttpStatus.NOT_FOUND,
      );
    }

    return item;
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new HttpException(
          HttpStatusMessages.NOT_FOUND,
          HttpStatus.NOT_FOUND,
      );
    }
  }
}
