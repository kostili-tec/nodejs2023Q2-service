import { Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    return this.favorites;
  }

  addArtistToFavorits(artistId: string) {
    const artist = this.artistService.getArtistById(artistId);
    if (artist) this.favorites.artists.push(artist.id);
  }
}
