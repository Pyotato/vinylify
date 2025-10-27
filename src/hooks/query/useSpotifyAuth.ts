import { SPOTIFY_WEB_API } from '@/constants';
import { HOUR } from '@/constants/time';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSpotifyAuth = (storageToken?: string | null) => {
  return useSuspenseQuery({
    queryKey: useSpotifyAuth.queryKey(storageToken != null),
    queryFn: async () => {
      return { token: SPOTIFY_WEB_API.getAccessToken() };
    },
    staleTime: 1 * HOUR,
  });
};

useSpotifyAuth.queryKey = (valid?: boolean) => [
  `auth ${valid ? ' ' : 'not '}valid`,
];
