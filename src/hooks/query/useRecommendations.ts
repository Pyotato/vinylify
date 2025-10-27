import getRecommendations from '@/api/reccoBeats/getRecommendations';
import { HOUR } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import { throwOnError } from './CONFIG';

export const useRecommendations = (size: number = 20) => {
  return useQuery({
    queryKey: useRecommendations.queryKey(size),
    queryFn: () => {
      return getRecommendations(size);
    },
    throwOnError,
    refetchInterval: 1 * HOUR,
    retry: false,
  });
};

useRecommendations.queryKey = (size?: number) => ['recommendations', size];
