import getUserInfo from '@/api/spotify/user/getUserInfo';
import { SPOTIFY_WEB_API } from '@/constants';
import { HOUR } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import { throwOnError } from './CONFIG';

const useUser = () => {
  const accessToken = SPOTIFY_WEB_API.getAccessToken();

  const query = useQuery({
    queryKey: useUser.queryKey(accessToken ?? null),
    queryFn: async () => {
      const myInfo = await getUserInfo();
      return {
        ...myInfo,

        accessToken,
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
