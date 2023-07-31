import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { AlbumController } from './album/album.controller';
import { TrackService } from './track/track.service';
import { TrackController } from './track/track.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { TrackModule } from './track/track.module';
import { SharedService } from './shared/shared.service';
import { SharedModule } from './shared/shared.module';

@Module({
  controllers: [
    AppController,
    UsersController,
    ArtistController,
    AlbumController,
    TrackController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
    SharedService,
  ],
  imports: [TrackModule, SharedModule],
})
export class AppModule {}
