import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityTypeUnion } from '../types/entity-types';
import { DatabaseInterface } from '../interfaces/database.interface';

export const validateRelatedEntity = (
  id: any,
  entity: EntityTypeUnion,
  database: DatabaseInterface,
) => {
  if (id && database.selectById(entity, id) === undefined) {
    throw new HttpException(
      `Entity ${entity} with id ${id} doesn't exist`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
