import api from '../instance';

export default function getMyDevices(): Promise<SpotifyApi.UserDevicesResponse> {
  return api.get(`me/player/devices`).json();
}
