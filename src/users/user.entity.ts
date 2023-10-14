import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column('int')
  version: number; // integer number, increments on update

  @Column('bigint')
  createdAt: number | Date; // timestamp of creation

  @Column('bigint')
  updatedAt: number | Date; // timestamp of last update
}
