import { getArtistTopTracks } from '@/api/spotify/track/getArtistTopTracks';
import { Artist } from '@/models/Profile';
import { useQuery } from '@tanstack/react-query';
import { throwOnError } from '../CONFIG';

export const useArtistTopTracks = ({
  artistId,
}: {
  artistId: Artist['id'];
}) => {
  return useQuery({
    queryKey: useArtistTopTracks.queryKey(artistId),
    queryFn: () => getArtistTopTracks({ id: artistId }),
    ...throwOnError,
  });
};

useArtistTopTracks.queryKey = (artistId: Artist['id']) => [
  'current',
  'playing',
  'artistTopTracks',
  artistId,
];
