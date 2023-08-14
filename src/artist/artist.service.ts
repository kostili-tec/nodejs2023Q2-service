import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { validateID } from '../utils/validateID';
import { Artist } from './artist.entity';
import { Artist as ArtistInterface } from './interfaces/artist.interface';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllArtists() {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    validateID(id);
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('ID doest not exist');
    else return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const newArtist: ArtistInterface = {
      ...dto,
      id: uuidv4(),
    };
    await this.artistRepository.insert(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, dto: CreateArtistDto) {
    validateID(id);
    const findArtist = await this.artistRepository.findOneBy({ id });
    if (findArtist) {
      const { grammy, name } = dto;
      findArtist.grammy = grammy;
      findArtist.name = name;
      await this.artistRepository.save(findArtist);
      return findArtist;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  async deleteArtist(id: string) {
    validateID(id);

    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const albumsToUpdate = await this.albumRepository.find({
      where: { artistId: id },
    });

    if (albumsToUpdate.length > 0) {
      await Promise.all(
        albumsToUpdate.map((album) => {
          album.artistId = null;
          return this.albumRepository.save(album);
        }),
      );
    }

    const trackToUpdate = await this.trackRepository.find({
      where: { artistId: id },
    });

    if (trackToUpdate.length > 0) {
      await Promise.all(
        trackToUpdate.map((track) => {
          track.artistId = null;
          return this.trackRepository.save(track);
        }),
      );
    }

    await this.artistRepository.remove(artist);
  }
}
