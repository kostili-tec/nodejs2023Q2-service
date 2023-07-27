import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { AlbumController } from './album/album.controller';

@Module({
  controllers: [
    AppController,
    UsersController,
    ArtistController,
    AlbumController,
  ],
  providers: [AppService, UsersService, ArtistService, AlbumService],
  imports: [],
})
export class AppModule {}
