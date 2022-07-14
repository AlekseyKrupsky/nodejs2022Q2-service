import { EntityTypes } from '../enums/entity-types';
import { HttpException, HttpStatus } from '@nestjs/common';

export const validateRelatedEntity = (
  id: any,
  entity: `${EntityTypes}`,
  database: any,
) => {
  if (id && database.selectById(entity, id) === undefined) {
    throw new HttpException(
      `Entity ${entity} with id ${id} doesn't exist`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
