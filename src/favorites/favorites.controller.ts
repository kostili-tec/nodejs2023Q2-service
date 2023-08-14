import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAllFavorites();
  }
  /* 
  @Post('/artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesAlbum(id);
  } */

  /*   @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  } */

  @Post('/album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.addToFavoritesAlbum(id);
  }

  /* @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }
  @Post('/track/:id')
  createTrack(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  } */
}
