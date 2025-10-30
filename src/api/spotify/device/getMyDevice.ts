import { UserDevice } from '@/models/UserDevice';
import api from '../instance';

export interface UserDevicesResponse {
  devices: UserDevice[];
}

// 재생가능한 디바이스들 리스트
export default function getMyDevices(): Promise<UserDevicesResponse> {
  return api.get(`me/player/devices`).json();
}
