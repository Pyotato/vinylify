import { ExternalUrlObject } from './externalUrl';
import { FollowersObject } from './Follower';
import { ImageObject } from './Image';

export interface UserObjectPublic {
  display_name?: string;
  external_urls: ExternalUrlObject;
  followers?: FollowersObject;
  href: string;
  id: string;
  images?: ImageObject[];
  type: 'user';
  uri: string;
}
export interface UserObjectPrivate extends UserObjectPublic {
  birthdate: string;
  country: string;
  email: string;
  product: string;
}
