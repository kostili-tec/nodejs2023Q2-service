import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { validateID } from '../utils/validateID';
import { SharedService } from '../shared/shared.service';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(SharedService)
    private readonly sharedService: SharedService,
  ) {}

  getAllArtists() {
    return this.sharedService.getAllArtists();
  }

  getArtistById(id: string) {
    validateID(id);
    const artist = this.sharedService.getArtistByID(id);
    if (!artist) throw new NotFoundException('ID doest not exist');
    else return artist;
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist: Artist = {
      ...dto,
      id: uuidv4(),
    };
    this.sharedService.addArtist(newArtist);
    return newArtist;
  }

  updateArtist(id: string, dto: CreateArtistDto) {
    validateID(id);
    const updatedArtist = this.sharedService.updateArtist(id, dto);
    if (updatedArtist) {
      return updatedArtist;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  deleteArtist(id: string) {
    validateID(id);
    const deleteArtist = this.sharedService.deleteArtist(id);
    if (!deleteArtist) throw new NotFoundException('ID doest not exist');
    else this.sharedService.checkFavsArtist(id);
  }
}
