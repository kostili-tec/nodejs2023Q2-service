import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { validateID } from '../utils/validateID';
import { SharedService } from '../shared/shared.service';
import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(SharedService)
    private readonly sharedService: SharedService,
  ) {}

  getAllFavorites() {
    return this.sharedService.getAllFavorites();
  }

  addArtistToFavorites(artistID: string) {
    validateID(artistID);
    const artist = this.sharedService.addFavoriteArtist(artistID);
    if (artist) {
      this.favorites.artists.push(artist.id);
      return artist;
    } else throw new UnprocessableEntityException();
  }

  addAlbumToFavorites(albumID: string) {
    validateID(albumID);
    const album = this.sharedService.addFavoriteAlbum(albumID);
    if (album) {
      this.favorites.albums.push(album.id);
      return album;
    } else throw new UnprocessableEntityException();
  }

  addTrackToFavorites(trackId: string) {
    validateID(trackId);
    const track = this.sharedService.addFavoriteTrack(trackId);
    if (track) {
      this.favorites.tracks.push(track.id);
      return track;
    } else throw new UnprocessableEntityException();
  }

  removeArtistFromFavorites(artistID: string) {
    validateID(artistID);
    const removedArtist = this.sharedService.removeFavoriteArtist(artistID);
    if (!removedArtist) throw new NotFoundException('ID doest not exist');
  }

  removeAlbumFromFavorites(albumID: string) {
    validateID(albumID);
    const removedAlbum = this.sharedService.removeFavoriteAlbum(albumID);
    if (!removedAlbum) throw new NotFoundException('ID doest not exist');
  }

  removeTrackFromFavorites(trackID: string) {
    validateID(trackID);
    const removedTrack = this.sharedService.removeFavoriteTrack(trackID);
    if (!removedTrack) throw new NotFoundException('ID doest not exist');
  }

  checkFavsAlbum(albumID: string) {
    const isExistAlbum = this.favorites.albums.find(
      (album) => album === albumID,
    );
    if (isExistAlbum) this.removeAlbumFromFavorites(albumID);
  }

  checkFavsArtist(artistID: string) {
    const isExistArtist = this.favorites.artists.find(
      (artist) => artist === artistID,
    );
    if (isExistArtist) this.removeArtistFromFavorites(artistID);
  }

  checkFavsTrack(trackID: string) {
    const isExistTrack = this.favorites.tracks.find(
      (track) => track === trackID,
    );
    if (isExistTrack) this.removeTrackFromFavorites(trackID);
  }
}
