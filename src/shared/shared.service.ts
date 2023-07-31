import { Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interfase';
import { Favorites } from '../favorites/interfaces/favorites.interface';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';

@Injectable()
export class SharedService {
  albumss: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  getAllArtists() {
    return this.artists;
  }

  getArtistByID(id: string) {
    return this.artists.find((artist) => artist.id == id);
  }

  updateArtist(id: string, dto: CreateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      const { grammy, name } = dto;
      this.artists[artistIndex].grammy = grammy;
      this.artists[artistIndex].name = name;
      return this.artists[artistIndex];
    } else return null;
  }

  deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      this.artists.splice(artistIndex, 1);
      this.seTracktArtistIdToNull(id);
      this.setTrackAlbumIdToNull(id);
      return true;
    } else return false;
  }

  seTracktArtistIdToNull(artistId: string) {
    const artistIndex = this.tracks.findIndex(
      (track) => track.artistId === artistId,
    );
    if (artistIndex >= 0) this.tracks[artistIndex].artistId = null;
  }

  setTrackAlbumIdToNull(albumID: string) {
    const trackIndex = this.tracks.findIndex(
      (track) => track.albumId === albumID,
    );
    if (trackIndex >= 0) this.tracks[trackIndex].albumId = null;
  }
}
