import { EntityWithIdInterface } from '../../interfaces/entity-with-id.interface';

export interface Artist extends EntityWithIdInterface {
  name: string;
  grammy: boolean;
}
