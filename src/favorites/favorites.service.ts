import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favorites, FavoritesResponse } from './interfaces/favorites.interface';
import { validateID } from '../utils/validateID';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(ArtistService)
    private readonly artistService: ArtistService,

    @Inject(AlbumService)
    private readonly albumService: AlbumService,

    @Inject(TrackService)
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    const fulledFavorites: FavoritesResponse = {
      albums: this.favorites.albums.map((albumId) =>
        this.albumService.getAlbumById(albumId),
      ),
      artists: this.favorites.artists.map((artistID) =>
        this.artistService.getArtistById(artistID),
      ),
      tracks: this.favorites.tracks.map((trackID) =>
        this.trackService.getTrackById(trackID),
      ),
    };
    return fulledFavorites;
  }

  addArtistToFavorites(artistID: string) {
    validateID(artistID);
    const artist = this.artistService.getArtistById(artistID);
    if (artist) this.favorites.artists.push(artist.id);
    return artist;
  }

  addAlbumToFavorites(albumID: string) {
    validateID(albumID);
    const album = this.albumService.getAlbumById(albumID);
    if (album) {
      this.favorites.albums.push(album.id);
      return album;
    }
  }

  addTrackToFavorites(trackId: string) {
    // validateID(trackId);
    const track = this.trackService.getTrackById(trackId);
    if (track) {
      this.favorites.tracks.push(track.id);
      return track;
    }
  }

  removeArtistFromFavorites(artistID: string) {
    validateID(artistID);
    const artistIndex = this.favorites.artists.findIndex(
      (value) => value === artistID,
    );
    if (artistIndex >= 0) {
      this.favorites.artists.splice(artistIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  removeAlbumFromFavorites(albumID: string) {
    validateID(albumID);
    const albumIndex = this.favorites.albums.findIndex(
      (value) => value === albumID,
    );
    if (albumIndex >= 0) {
      this.favorites.artists.splice(albumIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  removeTrackFromFavorites(trackID: string) {
    validateID(trackID);
    const trackIndex = this.favorites.tracks.findIndex(
      (value) => value === trackID,
    );
    if (trackIndex >= 0) {
      this.favorites.artists.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }
}
