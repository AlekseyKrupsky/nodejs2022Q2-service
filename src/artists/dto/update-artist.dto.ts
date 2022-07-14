import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { UpdateDtoInterface } from '../../interfaces/update-dto-interface';

export class UpdateArtistDto
  extends PartialType(CreateArtistDto)
  implements UpdateDtoInterface {}
