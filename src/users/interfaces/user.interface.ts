import { EntityWithIdInterface } from '../../interfaces/entity-with-id.interface';

export interface User extends EntityWithIdInterface {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
