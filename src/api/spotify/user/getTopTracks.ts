import { TrackSearchResult } from '@/models/Spotify';
import api from '../instance';

/**
 * top5 청취기록
 */
export default function getTopTracks(limit = 5): Promise<TrackSearchResult> {
  return api.get(`me/top/tracks?time_range=short_term&limit=${limit}`).json();
}
