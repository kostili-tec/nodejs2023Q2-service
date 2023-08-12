import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Track } from '../track/track.entity';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([Album, Track]), TrackModule],
})
export class AlbumModule {}
