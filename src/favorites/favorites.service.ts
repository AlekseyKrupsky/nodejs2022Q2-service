import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InMemoryDB } from "../database/in-memory-db";
import { EntityTypes } from "../enums/entity-types";
import {HttpStatusMessages} from "../enums/http-status-messages";

@Injectable()
export class FavoritesService {
    constructor(private readonly inMemoryDB: InMemoryDB) {}

    private readonly favorites = {
        artists: [],
        albums: [],
        tracks: [],
    };

    findAll() {
        return this.favorites;
    }

    add(type: `${EntityTypes}`, id: string): void {
        const item = this.inMemoryDB.selectById(type, id);

        if (item === undefined) {
            throw new HttpException(HttpStatusMessages.UNPROCESSABLE_ENTITY, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        this.favorites[type].push(item);
    }

    remove(type: `${EntityTypes}`, id: string): boolean {
        let deleted = false;

        this.favorites[type] = this.favorites[type].filter((item) => {
            if (item.id !== id) {
                return item;
            }

            deleted = true;
        });

        return deleted;
    }
}