import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  readonly artistId: string;
}
