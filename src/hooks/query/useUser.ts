import getUserInfo from '@/api/spotify/user/getUserInfo';
import { VINYLIFY_TOKEN } from '@/constants';
import { HOUR } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import { throwOnError } from './CONFIG';
import { useSpotifyAuth } from './useSpotifyAuth';

const useUser = () => {
  const { data } = useSpotifyAuth(localStorage.getItem(VINYLIFY_TOKEN));
  // const accessToken = SPOTIFY_WEB_API.getAccessToken();

  const query = useQuery({
    queryKey: useUser.queryKey(data?.token ?? null),
    queryFn: async () => {
      const myInfo = await getUserInfo();
      return {
        ...myInfo,
        accessToken: data?.token ?? null,
      };
    },
    staleTime: 1 * HOUR,
    throwOnError,
  });

  return query;
};

useUser.queryKey = (accessToken: string | null) => {
  return ['user', accessToken];
};

export default useUser;
