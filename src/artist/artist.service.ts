import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { validateID } from '../utils/validateID';
import { Artist } from './artist.entity';
import { Artist as ArtistInterface } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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
    const findArtist = await this.artistRepository.findOneBy({ id });

    if (findArtist) {
      await this.artistRepository.delete({ id });
    } else throw new NotFoundException('ID doest not exist');
  }
}
