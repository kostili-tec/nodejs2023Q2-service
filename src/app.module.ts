import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { Track } from './track/track.entity';
import { TrackModule } from './track/track.module';
import { Favorites } from './favorites/favorites.entity';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  controllers: [AppController],
  providers: [AppService, SharedService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rest-service-db',
      entities: [User, Artist, Album, Track, Favorites],
      synchronize: true,
    }),
    SharedModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
})
export class AppModule {}
