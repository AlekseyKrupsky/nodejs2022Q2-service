import { Artist } from "../artists/interfaces/artist.interface";
import { Injectable } from "@nestjs/common";
import { Album } from "../albums/interfaces/album.interface";
import {EntityTypes} from "../enums/entity-types";
import {User} from "../users/interfaces/user.interface";
import {UpdateArtistDto} from "../artists/dto/update-artist.dto";
import {UpdateAlbumDto} from "../albums/dto/update-album.dto";
import {UpdatePasswordDto} from "../users/dto/update-user.dto";
import {Track} from "../tracks/interfaces/track.interface";
import {Favorites} from "../favorites/interfaces/favorites.interface";

type EntityTypeUnion = `${EntityTypes}`;
type EntityUnion = User | Artist | Album | Track;
// type UpdateDto = UpdateArtistDto | UpdateAlbumDto;

@Injectable()
export class InMemoryDB {
    private readonly users: { [key: string]: User } = {};
    private readonly artists: { [key: string]: Artist } = {};
    private readonly albums: { [key: string]: Album } = {};
    private readonly tracks: { [key: string]: Track } = {};

    insert<Type extends EntityUnion>(entity: EntityTypeUnion, row: Type): Type {
        this[entity][row.id] = row;

        return row;
    }

    selectById(entity: EntityTypeUnion, id: string) {
        return this[entity][id];
    }

    selectAll(entity: EntityTypeUnion) {
        return this[entity];
    }

    update(entity: EntityTypeUnion, id: string, payload: any) {
        for (const key in payload) {
            this[entity][id][key] = payload[key];
        }
    }

    delete(entity: EntityTypeUnion, id: string): void {
        delete this[entity][id];
    }
}