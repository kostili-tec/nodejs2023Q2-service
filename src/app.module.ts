import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { Album } from './album/album.entity';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [AppController, TrackController, FavoritesController],
  providers: [AppService, TrackService, FavoritesService, SharedService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rest-service-db',
      entities: [User, Artist, Album],
      synchronize: true,
    }),
    SharedModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
  ],
})
export class AppModule {}
