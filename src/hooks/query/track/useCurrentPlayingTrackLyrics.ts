import getLyrics from '@/api/ovh/getLyrics';
import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { useQuery } from '@tanstack/react-query';
import CONFIG from '../CONFIG';
export interface CurrentlyPlayingTrackLyrics {
  songTitle: string;
  artist: string;
}

export interface CurrentTrackSearchParam extends CurrentlyPlayingTrackLyrics {
  search_artist_term: string;
}

export const useCurrentPlayingTrackLyrics = ({
  songTitle,
  artist,
}: CurrentlyPlayingTrackLyrics) => {
  const authRes = useQuery({
    queryKey: useCurrentPlayingTrackLyrics.queryKey({ songTitle, artist }),
    queryFn: () => getLyrics({ artist, songTitle }),
    ...CONFIG,
    retry: (failureCount: number, error: Error) => {
      if (error?.message == ERROR_MESSAGES['404']) {
        return false;
      }
      if (failureCount < 3 || error?.message == ERROR_MESSAGES['408']) {
        return true;
      } else return false;
    },
  });

  return authRes;
};

useCurrentPlayingTrackLyrics.queryKey = ({
  songTitle,
  artist,
}: CurrentlyPlayingTrackLyrics) => ['lyrics', songTitle, artist];
