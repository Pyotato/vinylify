import { useArtistProfileLink } from '@/hooks/query/artist/useArtistProfileLink';
import ArtistInfoCard from './Card/ArtistInfoCard';
import NoArtistToDisplay from './NoArtistToDisplay';

export default function SingleArtist({
  artistId,
}: Readonly<{
  artistId: string;
}>) {
  const { data, isSuccess, isLoading } = useArtistProfileLink({
    artistId,
  });

  if (isLoading) {
    return <>loading...</>;
  }
  if (isSuccess && data == null) {
    return null;
  }

  return (
    <span
      className={`inline-grid grid-cols-1 gap-x-4 mx-auto col-span-full gap-4  w-full`}
    >
      {data?.id == null ? (
        <NoArtistToDisplay />
      ) : (
        <ArtistInfoCard artist={data} />
      )}
    </span>
  );
}
