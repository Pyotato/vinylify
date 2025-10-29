import api from '../instance';
// 재생가능한 디바이스들 리스트
export default function getMyDevices(): Promise<SpotifyApi.UserDevicesResponse> {
  return api.get(`me/player/devices`).json();
}
