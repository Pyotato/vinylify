import getPlayQueue from '@/api/spotify/player/getPlayQueue';
import { SPOTIFY_WEB_API } from '@/constants';
import { SECOND } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import CONFIG from './CONFIG';

const useUserPlayQueue = () => {
  const accessToken = SPOTIFY_WEB_API.getAccessToken();
  const query = useQuery({
    queryKey: useUserPlayQueue.queryKey(accessToken ?? null),
    queryFn: () => getPlayQueue(),
    refetchInterval: 3 * SECOND,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    ...CONFIG,
  });

  return query;
};

useUserPlayQueue.queryKey = (accessToken: string | null) => {
  return ['user', 'player', 'queue', accessToken];
};

export default useUserPlayQueue;
