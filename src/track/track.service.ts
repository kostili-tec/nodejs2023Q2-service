import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SharedService } from '../shared/shared.service';

import { validateID } from '../utils/validateID';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './interfaces/track.interfase';

@Injectable()
export class TrackService {
  constructor(
    @Inject(SharedService)
    private readonly sharedService: SharedService,
  ) {}

  getAllTracks() {
    return this.sharedService.getAllTracks();
  }

  getTrackById(id: string) {
    validateID(id);
    const track = this.sharedService.getTrackById(id);
    if (!track) throw new NotFoundException('ID doest not exist');
    else return track;
  }

  createTrack(dto: CreateTrackDto) {
    const { artistId, albumId } = dto;
    const id = uuidv4();
    const newTrack: Track = {
      ...dto,
      id,
    };
    if (!artistId) {
      newTrack.artistId = null;
    }
    if (!albumId) {
      newTrack.albumId = null;
    }
    this.sharedService.addTrack(newTrack);
    return newTrack;
  }

  updateTrack(id: string, dto: CreateTrackDto) {
    validateID(id);
    const updatedTrack = this.sharedService.updateTrack(id, dto);
    if (updatedTrack) return updatedTrack;
    else throw new NotFoundException('ID doest not exist');
  }

  deleteTrack(id: string) {
    validateID(id);
    const deleteTrack = this.sharedService.deleteTrack(id);
    if (!deleteTrack) throw new NotFoundException('ID doest not exist');
    else this.sharedService.checkFavsTrack(id);
  }
}
