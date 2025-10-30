import { ExternalUrlObject } from './externalUrl';
import { FollowersObject } from './Follower';
import { ImageObject } from './Image';
import { PagingObject } from './PagingObject';
import { TrackObjectFull } from './Track';
import { UserObjectPublic } from './User';

interface PlaylistTrackObject {
  added_at: string;
  added_by: UserObjectPublic;
  is_local: boolean;
  track: TrackObjectFull;
}

export interface PlaylistBaseObject {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: UserObjectPublic;
  public: boolean;
  snapshot_id: string;
  type: 'playlist';
  uri: string;
}
export interface PlaylistObjectFull extends PlaylistBaseObject {
  followers: FollowersObject;
  tracks: PagingObject<PlaylistTrackObject>;
}
