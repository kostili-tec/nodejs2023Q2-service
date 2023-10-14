import { Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interfase';
import {
  Favorites,
  FavoritesResponse,
} from '../favorites/interfaces/favorites.interface';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { CreateTrackDto } from '../track/dto/create-track.dto';

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
      this.setTracktArtistIdToNull(id);
      this.setAlbumsArtistIdToNull(id);
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

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id == id);
  }

  updateTrack(id: string, dto: CreateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      const { artistId, name, albumId, duration } = dto;
      const track = this.tracks[trackIndex];
      track.artistId = artistId;
      track.name = name;
      track.albumId = albumId;
      track.duration = duration;
      return track;
    }
  }

  deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      this.tracks.splice(trackIndex, 1);
      return true;
    } else return false;
  }

  getAllFavorites() {
    const fulledFavorites: FavoritesResponse = {
      albums: this.buildFavsAlbums(),
      artists: this.buildFavsArtists(),
      tracks: this.buildFavsTracks(),
    };
    return fulledFavorites;
  }

  buildFavsAlbums() {
    if (this.favorites.albums.length > 0) {
      return this.favorites.albums.map((albumId) => this.getAlbumById(albumId));
    } else return [];
  }

  buildFavsArtists() {
    if (this.favorites.artists.length > 0) {
      return this.favorites.artists.map((artistID) =>
        this.getArtistByID(artistID),
      );
    } else return [];
  }

  buildFavsTracks() {
    if (this.favorites.tracks.length > 0) {
      return this.favorites.tracks.map((trackID) => this.getTrackById(trackID));
    } else return [];
  }

  addFavoriteArtist(artistID: string) {
    const findArtist = this.getArtistByID(artistID);
    if (findArtist) {
      this.favorites.artists.push(findArtist.id);
      return findArtist;
    }
  }

  addFavoriteAlbum(albumID: string) {
    const findAlbum = this.getAlbumById(albumID);
    if (findAlbum) {
      this.favorites.albums.push(findAlbum.id);
      return findAlbum;
    }
  }

  addFavoriteTrack(trackID: string) {
    const findTrack = this.getTrackById(trackID);
    if (findTrack) {
      this.favorites.tracks.push(findTrack.id);
      return findTrack;
    }
  }

  removeFavoriteArtist(artistID: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (value) => value === artistID,
    );
    if (artistIndex >= 0) {
      this.favorites.artists.splice(artistIndex, 1);
      return true;
    }
  }

  removeFavoriteAlbum(albumID: string) {
    const albumIndex = this.favorites.albums.findIndex(
      (value) => value === albumID,
    );
    if (albumIndex >= 0) {
      this.favorites.albums.splice(albumIndex, 1);
      return true;
    }
  }

  removeFavoriteTrack(trackID: string) {
    const trackIndex = this.favorites.tracks.findIndex(
      (value) => value === trackID,
    );
    if (trackIndex >= 0) {
      this.favorites.tracks.splice(trackIndex, 1);
      return true;
    }
  }

  checkFavsAlbum(albumID: string) {
    const isExistAlbum = this.favorites.albums.find(
      (album) => album === albumID,
    );
    if (isExistAlbum) this.removeFavoriteAlbum(albumID);
  }

  checkFavsArtist(artistID: string) {
    const isExistArtist = this.favorites.artists.find(
      (artist) => artist === artistID,
    );
    if (isExistArtist) this.removeFavoriteArtist(artistID);
  }

  checkFavsTrack(trackID: string) {
    const isExistTrack = this.favorites.tracks.find(
      (track) => track === trackID,
    );
    if (isExistTrack) this.removeFavoriteTrack(trackID);
  }

  setTracktArtistIdToNull(artistId: string) {
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
