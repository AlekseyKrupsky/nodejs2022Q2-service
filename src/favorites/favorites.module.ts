import {Module} from "@nestjs/common";
import {InMemoryDBModule} from "../database/database.module";
import {FavoritesController} from "./favorites.controller";
import {FavoritesService} from "./favorites.service";

@Module({
    imports: [InMemoryDBModule],
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService]
})
export class FavoritesModule {}