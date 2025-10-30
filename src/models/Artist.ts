import { ExternalUrlObject } from './externalUrl';
import { FollowersObject } from './Follower';
import { ImageObject } from './Image';

export interface ArtistObjectSimplified {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface ArtistObjectFull extends ArtistObjectSimplified {
  followers: FollowersObject;
  genres: string[];
  images: ImageObject[];
  popularity: number;
}
