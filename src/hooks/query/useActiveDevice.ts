import getMyDevices from '@/api/spotify/device/getMyDevice';
import { SPOTIFY_WEB_API } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { retry, throwOnError } from './CONFIG';

const useActiveDevice = () => {
  const accessToken = SPOTIFY_WEB_API.getAccessToken();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(
    useActiveDevice.queryKey(accessToken ?? null),
  );

  const query = useQuery({
    queryKey: useActiveDevice.queryKey(accessToken ?? null),
    queryFn: async () => {
      if (data != null) {
        return data as SpotifyApi.UserDevicesResponse;
      }
      const devices = await getMyDevices();
      return devices;
    },
    throwOnError,
    retry,
    notifyOnChangeProps: ['data'],
  });

  return query;
};

useActiveDevice.queryKey = (accessToken: string | null) => {
  return ['active', 'devices', accessToken];
};

export default useActiveDevice;
