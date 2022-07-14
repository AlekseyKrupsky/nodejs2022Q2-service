import { IsString } from 'class-validator';
import { UpdateDtoInterface } from '../../interfaces/update-dto-interface';

export class UpdatePasswordDto implements UpdateDtoInterface {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
