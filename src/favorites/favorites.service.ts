import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { validateID } from '../utils/validateID';
import { SharedService } from '../shared/shared.service';
import { Favorites as FavoritesInterface } from './interfaces/favorites.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { Artist } from '../artist/artist.entity';

@Injectable()
export class FavoritesService {
  private readonly favorites: FavoritesInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    /*     @Inject(SharedService)
    private readonly sharedService: SharedService, */

    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAllFavorites() {
    console.log('get');
    console.log(await this.favoritesRepository.find());
    return await this.favoritesRepository.find();
  }

  /*   async addArtistToFavorites(artistID: string) {
    validateID(artistID);
    
    const artist = this.artistRepository.findOneBy({id: artistID})
    if (artist) {
      this.favorites.artists.push(artist.id);
      return artist;
    } else throw new UnprocessableEntityException();
  } */

  async addToFavoritesAlbum(albumId: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    try {
      const favorites = await this.favoritesRepository.findOneOrFail({});

      if (favorites.albums.includes(albumId)) {
        throw new ConflictException('Album is already in favorites');
      }

      console.log(favorites)

      favorites.albums.push(albumId);
      await this.favoritesRepository.save(favorites);
    } catch (error) {
      const favorites = this.favoritesRepository.create({
        artists: [],
        albums: [albumId],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
      console.log(favorites)
    }    
  }

  /*   addAlbumToFavorites(albumID: string) {
    validateID(albumID);
    const album = this.sharedService.addFavoriteAlbum(albumID);
    if (album) {
      this.favorites.albums.push(album.id);
      return album;
    } else throw new UnprocessableEntityException();
  } */

  /* addTrackToFavorites(trackId: string) {
    validateID(trackId);
    const track = this.sharedService.addFavoriteTrack(trackId);
    if (track) {
      this.favorites.tracks.push(track.id);
      return track;
    } else throw new UnprocessableEntityException();
  }
 */
  /*  removeArtistFromFavorites(artistID: string) {
    validateID(artistID);
    const removedArtist = this.sharedService.removeFavoriteArtist(artistID);
    if (!removedArtist) throw new NotFoundException('ID doest not exist');
  }
 */
  /* removeAlbumFromFavorites(albumID: string) {
    validateID(albumID);
    const removedAlbum = this.sharedService.removeFavoriteAlbum(albumID);
    if (!removedAlbum) throw new NotFoundException('ID doest not exist');
  } */

  /*  removeTrackFromFavorites(trackID: string) {
    validateID(trackID);
    const removedTrack = this.sharedService.removeFavoriteTrack(trackID);
    if (!removedTrack) throw new NotFoundException('ID doest not exist');
  } */

  /*   checkFavsAlbum(albumID: string) {
    const isExistAlbum = this.favorites.albums.find(
      (album) => album === albumID,
    );
    if (isExistAlbum) this.removeAlbumFromFavorites(albumID);
  }

  checkFavsArtist(artistID: string) {
    const isExistArtist = this.favorites.artists.find(
      (artist) => artist === artistID,
    );
    if (isExistArtist) this.removeArtistFromFavorites(artistID);
  }

  checkFavsTrack(trackID: string) {
    const isExistTrack = this.favorites.tracks.find(
      (track) => track === trackID,
    );
    if (isExistTrack) this.removeTrackFromFavorites(trackID);
  } */
}
