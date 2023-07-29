import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { validateID } from '../utils/validateID';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './interfaces/track.interfase';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    validateID(id);
    const track = this.tracks.find((track) => track.id == id);
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
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, dto: CreateTrackDto) {
    validateID(id);
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      const { artistId, name, albumId, duration } = dto;
      const track = this.tracks[trackIndex];
      track.artistId = artistId;
      track.name = name;
      track.albumId = albumId;
      track.duration = duration;
      return track;
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  deleteTrack(id: string) {
    validateID(id);
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex >= 0) {
      this.tracks.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('ID doest not exist');
    }
  }

  setAlbumIdToNull(albumID: string) {
    const trackIndex = this.tracks.findIndex(
      (track) => track.albumId === albumID,
    );
    if (trackIndex >= 0) this.tracks[trackIndex].albumId = null;
  }

  setArtistIdToNull(artistId: string) {
    const artistIndex = this.tracks.findIndex(
      (track) => track.artistId === artistId,
    );
    if (artistIndex >= 0) this.tracks[artistIndex].artistId = null;
  }
}
