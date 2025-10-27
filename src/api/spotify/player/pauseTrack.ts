import { getActiveDevice } from '../device/getActiveDevice';
import api from '../instance';

/**
 * 트랙 중지하기
 */
export default async function pauseTrack({
  active_device,
}: {
  active_device?: string | null;
}) {
  return api
    .put(`me/player/pause`, {
      json: {
        device_id: active_device ?? (await getActiveDevice()),
      },
    })
    .json();
}
