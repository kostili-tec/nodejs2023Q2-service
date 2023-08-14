import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validateID } from '../utils/validateID';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track as TrackInterface } from './interfaces/track.interfase';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllTracks() {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string) {
    validateID(id);
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('ID doest not exist');
    else return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const { artistId, albumId } = dto;
    const id = uuidv4();
    const newTrack: TrackInterface = {
      ...dto,
      id,
    };
    if (!artistId) {
      newTrack.artistId = null;
    }
    if (!albumId) {
      newTrack.albumId = null;
    }
    await this.trackRepository.insert(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, dto: CreateTrackDto) {
    validateID(id);
    const updatedTrack = await this.trackRepository.findOneBy({ id });
    if (updatedTrack) {
      const { albumId, artistId, duration, name } = dto;
      updatedTrack.albumId = albumId;
      updatedTrack.artistId = artistId;
      updatedTrack.duration = duration;
      updatedTrack.name = name;
      await this.trackRepository.save(updatedTrack);
      return updatedTrack;
    } else throw new NotFoundException('ID doest not exist');
  }

  async deleteTrack(id: string) {
    validateID(id);
    const deleteTrack = await this.trackRepository.findOneBy({ id });
    if (!deleteTrack) throw new NotFoundException('ID doest not exist');
    else await this.trackRepository.remove(deleteTrack);
  }
}
