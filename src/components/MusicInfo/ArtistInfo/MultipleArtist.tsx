import { useMultipleArtistProfileLink } from '@/hooks/query/artist/useMultipleArtistProfileLink';
import { useToast } from '@/hooks/toasts/useToast';
import { Fragment } from 'react/jsx-runtime';
import ArtistInfoCard from './Card/ArtistInfoCard';
import NoArtistToDisplay from './NoArtistToDisplay';

export default function MultipleArtist({
  artistId,
}: Readonly<{
  artistId: string[];
}>) {
  const { data, error, isError, isLoading } = useMultipleArtistProfileLink({
    artistId,
  });

  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.message,
    stack: false,
    factoryId: error?.message!,
  });
  if (error) {
    showToast();
  }

  if (isLoading) {
    return (
      <div className="pt-3 inline-flex bg-(--grey-300) p-4 w-full rounded-[4px] shadow-(--shadow-basic) h-27 justify-center align-middle flex-col items-center">
        loading...
      </div>
    );
  }

  if (data.filter(item => item).length == 0) {
    return <NoArtistToDisplay />;
  }

  return (
    <span
      className={`inline-grid pt-4 grid-cols-1 gap-x-4 mx-auto ${data?.length >= 2 ? 'md:grid-cols-2' : 'col-span-full'} gap-4 w-full`}
    >
      {data?.map((artist, index) => (
        <Fragment key={artist?.id ?? `artist-skeleton-${index}`}>
          {artist?.id != null ? (
            <ArtistInfoCard key={artist.id} artist={artist} />
          ) : null}
        </Fragment>
      ))}
    </span>
  );
}
