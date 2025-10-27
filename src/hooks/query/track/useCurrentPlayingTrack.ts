import getPlayingTrack from '@/api/spotify/track/getPlayingTrack';
import { SECOND } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';
import CONFIG from '../CONFIG';

// 현재 재생 중인 플레이리스트 3초 간격으로 refetch 해오기
export const useCurrentPlayingTrack = ({
  enabled = false,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: useCurrentPlayingTrack.queryKey(),
    queryFn: () => getPlayingTrack(),
    refetchInterval: 3 * SECOND,
    enabled,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    ...CONFIG,
  });
};

useCurrentPlayingTrack.queryKey = () => ['current', 'playing', 'track'];
