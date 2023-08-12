import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
