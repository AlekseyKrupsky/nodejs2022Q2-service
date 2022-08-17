import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FindOneParams } from '../classes/params/findOneParams';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll(): TrackEntity[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<TrackEntity> {
    return this.tracksService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams): Promise<void> {
    return this.tracksService.remove(params.id);
  }
}
