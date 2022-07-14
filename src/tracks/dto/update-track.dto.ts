import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { UpdateDtoInterface } from '../../interfaces/update-dto-interface';

export class UpdateTrackDto
  extends PartialType(CreateTrackDto)
  implements UpdateDtoInterface {}
