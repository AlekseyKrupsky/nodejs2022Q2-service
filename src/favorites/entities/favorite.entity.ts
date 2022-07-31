import { Column, Entity } from "typeorm";

@Entity('favorites')
export class FavoriteEntity {
    @Column({ primary: true })
    favoriteItemId: string;

    @Column({ primary: true })
    favoriteType: string;
}