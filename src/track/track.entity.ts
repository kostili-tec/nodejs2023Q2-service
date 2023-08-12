import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;
}
