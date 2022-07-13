import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InMemoryDB } from "../database/in-memory-db";
import { Favorites } from "./interfaces/favorites.interface";
import { EntityTypes } from "../enums/entity-types";
import {HttpStatusMessages} from "../enums/http-status-messages";

@Injectable()
export class FavoritesService {
    constructor(private readonly inMemoryDB: InMemoryDB) {}

    private readonly favorites: Favorites = {
        artists: [],
        albums: [],
        tracks: [],
    };

    findAll() {
        return this.favorites;
    }

    add(type: `${EntityTypes}`, id: string): void {
        if (this.inMemoryDB.selectById(type, id) === undefined) {
            throw new HttpException(HttpStatusMessages.UNPROCESSABLE_ENTITY, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        this.favorites[type].push(id);
    }

    remove(type: `${EntityTypes}`, id: string): void {
        const index: number = this.favorites[type].indexOf(id);

        if (index === -1) {
            throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        delete this.favorites[type][index];
    }
}