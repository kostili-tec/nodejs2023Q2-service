import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { validateID } from '../utils/validateID';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    validateID(id);
    const artist = this.artists.find((artist) => artist.id == id);
    if (!artist) throw new NotFoundException('ID doest not exist');
    else return artist;
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist: Artist = {
      ...dto,
      id: uuidv4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, dto: CreateArtistDto) {
    validateID(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      const { grammy, name } = dto;
      const artist = this.artists[artistIndex];
      artist.grammy = grammy;
      artist.name = name;
      return artist;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  deleteArtist(id: string) {
    validateID(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      this.artists.splice(artistIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }
}
