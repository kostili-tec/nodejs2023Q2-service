import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string;

  readonly albumId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;
}
