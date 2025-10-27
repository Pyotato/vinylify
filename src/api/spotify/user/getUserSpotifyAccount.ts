import { SPOTIFY_WEB_API } from '@/constants';

export function getUserSpotifyAccount(): string | null {
  return SPOTIFY_WEB_API.getAccessToken();
}
