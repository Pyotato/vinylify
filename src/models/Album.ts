import { ArtistObjectSimplified } from './Artist';
import { CopyrightObject } from './CopyrightObject';
import { ExternalIdObject } from './ExternalId';
import { ExternalUrlObject } from './externalUrl';
import { ImageObject } from './Image';
import { PagingObject } from './PagingObject';
import { TrackObjectSimplified } from './Track';

export interface AlbumObjectSimplified {
  album_type: string;
  available_markets?: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  type: 'album';
  uri: string;
  is_playable?: boolean;
}
export interface AlbumObjectFull extends AlbumObjectSimplified {
  artists: ArtistObjectSimplified[];
  copyrights: CopyrightObject[];
  external_ids: ExternalIdObject;
  genres: string[];
  popularity: number;
  release_date: string;
  release_date_precision: string;
  tracks: PagingObject<TrackObjectSimplified>;
}
