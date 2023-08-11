import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist/artist.entity';

@Module({
  controllers: [
    AppController,

    AlbumController,
    TrackController,
    FavoritesController,
  ],
  providers: [
    AppService,

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
      entities: [User, Artist],
      synchronize: true,
    }),
    SharedModule,
    UsersModule,
    ArtistModule,
  ],
})
export class AppModule {}
