import { EntityWithIdInterface } from '../../interfaces/entity-with-id.interface';

export interface Track extends EntityWithIdInterface {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
