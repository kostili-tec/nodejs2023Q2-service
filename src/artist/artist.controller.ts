import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
