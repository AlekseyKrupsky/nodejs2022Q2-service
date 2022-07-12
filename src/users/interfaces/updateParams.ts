import { IsNotEmpty, IsUUID} from 'class-validator';

export class UpdateParams {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
