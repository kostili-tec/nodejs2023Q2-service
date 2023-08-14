import { Module } from '@nestjs/common';
import { TrackModule } from './track.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [TrackModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackHttpModule {}
