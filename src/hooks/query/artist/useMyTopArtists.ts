import getMyTopItems from '@/api/spotify/user/getMyTopItems';
import { useQuery } from '@tanstack/react-query';
import CONFIG from '../CONFIG';

export const useMyTopArtists = () => {
  const res = useQuery({
    queryKey: useMyTopArtists.queryKey,
    queryFn: () => getMyTopItems({}),
    ...CONFIG,
  });

  return res;
};

useMyTopArtists.queryKey = ['topArtists'];
