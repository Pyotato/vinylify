import getArtistList from '@/api/spotify/artist/getArtistList';
import { Artist } from '@/models/Profile';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { throwOnError } from '../CONFIG';

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
            const text = await err.response.text().catch(() => '');
            throw new Error(
              `Spotify API error ${err.response.status}: ${text || err.message}`,
            );
          }
          throw new Error((err as Error).message ?? 'Failed to fetch artist');
        }
      },
      staleTime: Infinity,
      throwOnError,
    })),

    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
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
