import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { EntityTypes } from '../enums/entity-types';
import { EntityService } from '../classes/entity.service';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { HttpStatusMessages } from '../enums/http-status-messages';

@Injectable()
export class ArtistsService extends EntityService<ArtistEntity> {
  private readonly favoritesService: FavoritesService;

  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    favoritesService: FavoritesService,
  ) {
    super(EntityTypes.ARTISTS, artistRepository);
    this.favoritesService = favoritesService;
  }

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.create(createArtistDto);

    return this.artistRepository.save(artist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const updateResult = await this.artistRepository.update(
      id,
      updateArtistDto,
    );

    if (updateResult.affected === 1) {
      return this.findOne(id);
    }

    throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);
  }
}
