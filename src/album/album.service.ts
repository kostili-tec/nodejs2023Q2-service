import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateID } from '../utils/validateID';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  constructor(
    @Inject(TrackService)
    private readonly trackService: TrackService,
  ) {}

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    validateID(id);
    const album = this.albums.find((album) => album.id == id);
    if (!album) throw new NotFoundException('ID doest not exist');
    else return album;
  }

  createAlbum(dto: CreateAlbumDto) {
    const { artistId } = dto;
    const id = uuidv4();
    const newAlbum: Album = {
      ...dto,
      id,
    };
    if (!artistId) {
      newAlbum.artistId = null;
    }
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, dto: CreateAlbumDto) {
    validateID(id);
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      const { artistId, name, year } = dto;
      const album = this.albums[albumIndex];
      album.artistId = artistId;
      album.name = name;
      album.year = year;
      return album;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  deleteAlbum(id: string) {
    validateID(id);
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex >= 0) {
      this.albums.splice(albumIndex, 1);
      this.trackService.setAlbumIdToNull(id);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  setArtistIdToNull(artistId: string) {
    const artistIndex = this.albums.findIndex(
      (album) => album.artistId === artistId,
    );
    if (artistIndex >= 0) this.albums[artistIndex].artistId = null;
  }
}
