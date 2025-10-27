import getMyDevices from './getMyDevice';

/**
 *  활성화된 기기 ID 찾기
 */
export function getActiveDevice(): Promise<string | null> {
  return getMyDevices().then(
    res =>
      res.devices.filter(device => {
        return device.is_active;
      })[0]?.id,
  );
}
