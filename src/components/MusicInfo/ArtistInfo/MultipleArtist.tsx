import { useMultipleArtistProfileLink } from '@/hooks/query/artist/useMultipleArtistProfileLink';
import { Fragment } from 'react/jsx-runtime';
import ArtistInfoCard from './Card/ArtistInfoCard';

export default function MultipleArtist({
  artistId,
}: Readonly<{
  artistId: string[];
}>) {
  const { data, pending } = useMultipleArtistProfileLink({
    artistId,
  });

  if (pending) {
    return (
      <div className="profiles-container group inline-flex">loading...</div>
    );
  }

  return (
    <span
      className={`inline-grid pt-4 grid-cols-1 gap-x-4 mx-auto ${data?.length >= 2 ? 'md:grid-cols-2' : 'col-span-full'} gap-4 w-full`}
    >
      {data?.map(artist => (
        <Fragment key={artist?.id ?? 'skeleton'}>
          {artist?.id != null && (
            <ArtistInfoCard key={artist.id} artist={artist} />
          )}
        </Fragment>
      ))}
    </span>
  );
}
