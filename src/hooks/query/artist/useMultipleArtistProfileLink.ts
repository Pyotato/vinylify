import getArtistList from '@/api/spotify/artist/getArtistList';
import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { Artist } from '@/models/Profile';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { retry, throwOnError } from '../CONFIG';

export const useMultipleArtistProfileLink = ({
  artistId,
}: {
  artistId: string[];
}) => {
  const queryClient = useQueryClient();
  const combinedQueries = useQueries({
    queries: artistId.map(id => ({
      queryKey: useMultipleArtistProfileLink.queryKey(id),
      queryFn: async (): Promise<Artist | undefined> => {
        try {
          const cached = queryClient.getQueryData<Artist[]>(
            useMultipleArtistProfileLink.queryKey(id),
          );
          if (cached?.[0]) {
            return cached?.[0];
          }

          const res = await getArtistList([id]);

          if (res.length > 0) {
            if (res) {
              const artist = res[0] as Artist;
              queryClient.setQueryData(
                ['artist', 'profile', 'link', artist?.id],
                artist,
              );
              return artist;
            }
          }
          return undefined;
        } catch (err: unknown) {
          if (err instanceof HTTPError) {
            throw new Error(ERROR_MESSAGES['429']);
          }
          throw new Error((err as Error).message ?? ERROR_MESSAGES['429']);
        }
      },
      staleTime: Infinity,
      throwOnError,
      retry,
    })),

    combine: results => {
      const isLoading = results.some(r => r.isLoading);
      const isFetching = results.some(r => r.isFetching);
      const isError = results.some(r => r.isError);
      const isSuccess = results.every(r => r.isSuccess);
      const error = results.find(r => r.error)?.error;
      const data = results.map(r => r.data);
      const pending = results.some(result => result.isPending);
      return {
        data,
        pending: pending,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
      };
    },
  });
  return combinedQueries;
};

useMultipleArtistProfileLink.queryKey = (artistId: string) => [
  'artist',
  'profile',
  'link',
  artistId,
];
