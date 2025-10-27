import getTopTracks from '@/api/spotify/user/getTopTracks';
import { useQuery } from '@tanstack/react-query';
import { throwOnError } from '../CONFIG';

export const useTopTracks = (limit?: number) => {
  const res = useQuery({
    queryKey: useTopTracks.queryKey,
    queryFn: () => getTopTracks(limit),
    throwOnError,
  });

  return res;
};

useTopTracks.queryKey = ['topTracks'];
