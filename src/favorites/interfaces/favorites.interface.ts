import { Album } from '../../album/interfaces/album.interface';
import { Artist } from '../../artist/interfaces/artist.interface';
import { Track } from '../../track/interfaces/track.interfase';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
