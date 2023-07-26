import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';

@Module({
  controllers: [AppController, UsersController, ArtistController],
  providers: [AppService, UsersService, ArtistService],
  imports: [],
})
export class AppModule {}
