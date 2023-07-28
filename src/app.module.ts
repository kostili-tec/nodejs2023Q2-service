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
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';

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
  ],
  imports: [FavoritesModule, TrackModule, AlbumModule, ArtistModule],
})
export class AppModule {}
