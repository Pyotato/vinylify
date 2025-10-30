import { AlbumObjectSimplified } from './Album';
import { ArtistObjectFull } from './Artist';
import { PagingObject } from './PagingObject';
import { PlaylistObjectFull } from './Playlist';
import { TrackObjectFull } from './Track';
import { UserObjectPrivate } from './User';

export interface MultipleTracksResponse {
  tracks: TrackObjectFull[];
}

export interface CurrentUsersProfileResponse extends UserObjectPrivate {}

export interface ArtistSearchResponse {
  artists: PagingObject<ArtistObjectFull>;
}

export interface PlaylistSearchResponse {
  playlists: PagingObject<PlaylistObjectFull>;
}

export interface TrackSearchResponse {
  tracks: PagingObject<TrackObjectFull>;
}

export interface AlbumSearchResponse {
  albums: PagingObject<AlbumObjectSimplified>;
}

export interface SearchResponse
  extends Partial<ArtistSearchResponse>,
    Partial<AlbumSearchResponse>,
    Partial<TrackSearchResponse>,
    Partial<PlaylistSearchResponse> {}
