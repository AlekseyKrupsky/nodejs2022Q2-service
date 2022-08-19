import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { EntityService } from '../classes/entity.service';
import { EntityTypes } from '../enums/entity-types';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Injectable()
export class TracksService extends EntityService<TrackEntity> {
  private readonly favoritesService: FavoritesService;

  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    favoritesService: FavoritesService,
  ) {
    super(EntityTypes.TRACKS, trackRepository);
    this.favoritesService = favoritesService;
  }

  create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    try {
      const track = this.trackRepository.create(createTrackDto);

      return this.trackRepository.save(track);
    } catch {
      throw new HttpException(
        `Provided entity is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    try {
      const updateResult = await this.trackRepository.update(
        id,
        updateTrackDto,
      );

      if (updateResult.affected === 1) {
        return this.findOne(id);
      }
    } catch {
      throw new HttpException(
        `Provided entity is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);
  }
}
