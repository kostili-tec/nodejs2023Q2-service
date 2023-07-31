import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { SharedService } from '../shared/shared.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [TrackService, AlbumService, SharedService],
})
export class ArtistModule {}
