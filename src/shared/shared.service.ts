import { Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interfase';
import { Favorites } from '../favorites/interfaces/favorites.interface';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { CreateAlbumDto } from '../album/dto/create-album.dto';

@Injectable()
export class SharedService {
  albums: Album[] = [];
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

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id == id);
  }

  updateAlbum(id: string, dto: CreateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      const { artistId, name, year } = dto;
      const album = this.albums[albumIndex];
      album.artistId = artistId;
      album.name = name;
      album.year = year;
      return album;
    }
  }

  deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      this.albums.splice(albumIndex, 1);
      this.setTrackAlbumIdToNull(id);
      return true;
    } else {
      return false;
    }
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

  setAlbumsArtistIdToNull(artistId: string) {
    const artistIndex = this.albums.findIndex(
      (album) => album.artistId === artistId,
    );
    if (artistIndex >= 0) this.albums[artistIndex].artistId = null;
  }
}
