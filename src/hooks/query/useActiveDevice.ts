import getMyDevices, {
  UserDevicesResponse,
} from '@/api/spotify/device/getMyDevice';
import { VINYLIFY_TOKEN } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { retry, throwOnError } from './CONFIG';
import { useSpotifyAuth } from './useSpotifyAuth';

const useActiveDevice = () => {
  // const accessToken = SPOTIFY_WEB_API.getAccessToken();
  const { data: authData } = useSpotifyAuth(
    localStorage.getItem(VINYLIFY_TOKEN),
  );
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(
    useActiveDevice.queryKey(authData?.token ?? null),
  );

  const query = useQuery({
    queryKey: useActiveDevice.queryKey(authData?.token ?? null),
    queryFn: async () => {
      if (data != null) {
        return data as UserDevicesResponse;
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
