import { Module } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [SharedService],
})
export class FavoritesModule {}
