import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistModule } from './artist.module';
import { ArtistService } from './artist.service';

@Module({
  imports: [ArtistModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistHttpModule {}
