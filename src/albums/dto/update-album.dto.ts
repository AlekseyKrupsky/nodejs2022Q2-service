import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateDtoInterface } from '../../interfaces/update-dto-interface';

export class UpdateAlbumDto
  extends PartialType(CreateAlbumDto)
  implements UpdateDtoInterface {}
