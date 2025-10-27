import api from '../instance';

export default function getUserInfo(): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  return api.get(`me`).json();
}
