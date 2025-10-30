import getPlayQueue from '@/api/spotify/player/getPlayQueue';
// import { SPOTIFY_WEB_API } from '@/constants';
import { VINYLIFY_TOKEN } from '@/constants';
import { SECOND } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import CONFIG from './CONFIG';
import { useSpotifyAuth } from './useSpotifyAuth';

const useUserPlayQueue = () => {
  const { data } = useSpotifyAuth(localStorage.getItem(VINYLIFY_TOKEN));
  // const accessToken = SPOTIFY_WEB_API.getAccessToken();
  const query = useQuery({
    queryKey: useUserPlayQueue.queryKey(data?.token ?? null),
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
