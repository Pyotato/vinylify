import { Track } from '@/models/Track';
import api from '../instance';

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 */
export function getArtistTopTracks({ id }: { id: string }) {
  return api.get(`artists/${id}/top-tracks`, {}).json<{
    tracks: Track[];
  }>();
}
