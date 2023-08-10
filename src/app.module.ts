import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { AlbumController } from './album/album.controller';
import { TrackService } from './track/track.service';
import { TrackController } from './track/track.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { SharedService } from './shared/shared.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [
    AppController,
    ArtistController,
    AlbumController,
    TrackController,
    FavoritesController,
  ],
  providers: [
    AppService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
    SharedService,
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rest-service-db',
      entities: [User],
      synchronize: true,
    }),
    SharedModule,
    UsersModule,
  ],
})
export class AppModule {}
