import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { AlbumModule } from '../album/album.module';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    TypeOrmModule.forFeature([Artist, Album, Track]),
    AlbumModule,
    TrackModule,
  ],
})
export class ArtistModule {}
