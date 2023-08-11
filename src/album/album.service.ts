import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateID } from '../utils/validateID';
import { Album as AlbumInteface } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async getAllAlbums() {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string) {
    validateID(id);
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('ID doest not exist');
    else return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const { artistId } = dto;
    const id = uuidv4();
    const newAlbum: AlbumInteface = {
      ...dto,
      id,
    };
    if (!artistId) {
      newAlbum.artistId = null;
    }
    await this.albumRepository.insert(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, dto: CreateAlbumDto) {
    validateID(id);
    const updatedAlbum = await this.albumRepository.findOneBy({ id });
    if (updatedAlbum) {
      const { artistId, name, year } = dto;
      updatedAlbum.artistId = artistId;
      updatedAlbum.name = name;
      updatedAlbum.year = year;
      await this.albumRepository.save(updatedAlbum);
      return updatedAlbum;
    } else throw new NotFoundException('ID doest not exist');
  }

  async deleteAlbum(id: string) {
    validateID(id);
    const deleteAlbum = await this.albumRepository.findOneBy({ id });
    if (!deleteAlbum) throw new NotFoundException('ID doest not exist');
    else await this.albumRepository.delete({ id });
  }

  /*   setArtistIdToNull(artistId: string) {
    const artistIndex = this.albums.findIndex(
      (album) => album.artistId === artistId,
    );
    if (artistIndex >= 0) this.albums[artistIndex].artistId = null;
  } */
}
