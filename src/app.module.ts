import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  imports: [],
})
export class AppModule {}
