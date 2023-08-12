import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateID } from '../utils/validateID';
import { Album as AlbumInteface } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { Track } from '../track/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
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

    const trackToUpdate = await this.trackRepository.find({
      where: { albumId: id },
    });
    if (trackToUpdate.length > 0) {
      await Promise.all(
        trackToUpdate.map((track) => {
          track.albumId = null;
          return this.trackRepository.save(track);
        }),
      );
    }

    await this.albumRepository.delete({ id });
  }
}
