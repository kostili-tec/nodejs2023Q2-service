import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToMany(() => Artist)
  @JoinTable()
  artists: string[];

  @ManyToMany(() => Album)
  @JoinTable()
  albums: string[];

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: string[];
}
