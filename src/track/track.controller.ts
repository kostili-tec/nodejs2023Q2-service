import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly albumService: TrackService) {}

  @Get()
  getAll() {
    return this.albumService.getAllTracks();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.albumService.getTrackById(id);
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.albumService.createTrack(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateTrackDto) {
    return this.albumService.updateTrack(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.albumService.deleteTrack(id);
  }
}
