import { PagingObject } from '@/models/PagingObject';
import { Artist } from '@/models/Profile';
import { Track } from '@/models/Track';
import api from '../instance';

interface UsersTopArtistsResponse extends PagingObject<Artist> {}
interface UsersTopTracksResponse extends PagingObject<Track> {}

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 * SPOTIFY_WEB_API.getMyTopArtists();
 */
export default function getMyTopItems({
  type = 'artists',
  time_range = 'medium_term',
  limit = 20,
  offset = 0,
}: {
  type?: 'artists' | 'tracks';
  limit?: number;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term'; //long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks)
}): Promise<UsersTopArtistsResponse | UsersTopTracksResponse> {
  return api
    .get(
      `me/top/${type}?time_range=${time_range}&limit=${limit <= 20 ? limit : 20}&offset=${offset}`,
    )
    .json();
}
