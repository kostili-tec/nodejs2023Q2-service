import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateID } from '../utils/validateID';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  constructor(
    @Inject(SharedService)
    private readonly sharedService: SharedService,
  ) {}

  getAllAlbums() {
    return this.sharedService.getAllAlbums();
  }

  getAlbumById(id: string) {
    validateID(id);
    const album = this.sharedService.getAlbumById(id);
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
    this.sharedService.addAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, dto: CreateAlbumDto) {
    validateID(id);
    const updatedAlbum = this.sharedService.updateAlbum(id, dto);
    if (updatedAlbum) return updatedAlbum;
    else throw new NotFoundException('ID doest not exist');
  }

  deleteAlbum(id: string) {
    validateID(id);
    const deleteAlbum = this.sharedService.deleteAlbum(id);
    if (!deleteAlbum) throw new NotFoundException('ID doest not exist');
    else this.sharedService.checkFavsAlbum(id);
  }

  setArtistIdToNull(artistId: string) {
    const artistIndex = this.albums.findIndex(
      (album) => album.artistId === artistId,
    );
    if (artistIndex >= 0) this.albums[artistIndex].artistId = null;
  }
}
