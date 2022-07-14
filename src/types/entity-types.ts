import { EntityTypes } from '../enums/entity-types';
import { User } from '../users/interfaces/user.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Album } from '../albums/interfaces/album.interface';
import { Track } from '../tracks/interfaces/track.interface';

export type EntityTypeUnion = `${EntityTypes}`;
export type EntityUnion = User | Artist | Album | Track;
