import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumModule } from './album.module';
import { AlbumService } from './album.service';

@Module({
  imports: [AlbumModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumHttpModule {}
