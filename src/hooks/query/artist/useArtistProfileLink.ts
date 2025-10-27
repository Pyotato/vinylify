import getArtistList from '@/api/spotify/artist/getArtistList';
import { MINUTE } from '@/constants/time';
import { Artist } from '@/models/Profile';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { throwOnError } from '../CONFIG';

export const useArtistProfileLink = ({ artistId }: { artistId: string }) => {
  const queryClient = useQueryClient();

  return useQuery<Artist | undefined>({
    queryKey: useArtistProfileLink.queryKey(artistId),
    queryFn: async (): Promise<Artist | undefined> => {
      try {
        const cached = queryClient.getQueryData<Artist>(
          useArtistProfileLink.queryKey(artistId),
        );
        if (cached) {
          return cached;
        }

        const res = await getArtistList([artistId]);

        if (Array.isArray(res)) {
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
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to fetch artist list');
      }
    },
    initialData: () =>
      queryClient.getQueryData<Artist>(useArtistProfileLink.queryKey(artistId)),
    staleTime: MINUTE * 10,
    placeholderData: (prev, _) => prev ?? undefined,
    throwOnError,
  });
};

useArtistProfileLink.queryKey = (artistId: string) => [
  'artist',
  'profile',
  'link',
  artistId,
];
