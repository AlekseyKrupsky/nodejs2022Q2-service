import { EntityWithIdInterface } from '../../interfaces/entity-with-id.interface';

export interface Album extends EntityWithIdInterface {
  name: string;
  year: number;
  artistId: string | null;
}
