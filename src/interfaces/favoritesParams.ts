import { IsString, IsUUID } from 'class-validator';

export class favoritesParams {
    @IsUUID()
    id: string;

    @IsString()
    type: string;
}
