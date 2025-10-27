import api from '../instance';

/**
 * 현제 제셍 노래 정보 : SPOTIFY_WEB_API.getMyCurrentPlayingTrack()
 */
export default function getPlayingTrack(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
  return api.get('me/player/currently-playing').json();
}
