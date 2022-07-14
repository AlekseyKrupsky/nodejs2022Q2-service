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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindOneParams } from '../classes/params/findOneParams';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Artist {
    return this.artistsService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistsService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams): void {
    return this.artistsService.remove(params.id);
  }
}
