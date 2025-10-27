import api from '../instance';

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 */
export default function getTracks({
  tracks,
}: {
  tracks: string[];
}): Promise<SpotifyApi.MultipleTracksResponse> {
  return api.get(`tracks?ids=${tracks.join(',')}`, {}).json();
}
