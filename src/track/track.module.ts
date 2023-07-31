import { Module } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [SharedService],
})
export class TrackModule {}
