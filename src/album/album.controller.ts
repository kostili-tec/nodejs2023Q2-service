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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
