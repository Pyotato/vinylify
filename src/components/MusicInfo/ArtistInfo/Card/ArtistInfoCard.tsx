import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { useArtistTopTracks } from '@/hooks/query/track/useArtistTopTracks';
import { useToast } from '@/hooks/toasts/useToast';
import { Artist } from '@/models/Profile';
import { MeasuredImage } from '@/ui/CoverImage/MeasuredImage';
import { lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';

const SpotifyIcon = lazy(() => import('@/ui/Icons/Spotify'));
const ArtistName = lazy(() => import('./ArtistName'));
const Followers = lazy(() => import('./Followers'));
const GenreList = lazy(() => import('./GenreList'));
const TopTrackList = lazy(() => import('./TopTrackList'));

export default function ArtistInfoCard({
  artist,
}: Readonly<{
  artist: Artist;
}>) {
  const { data, isError, error, isLoading } = useArtistTopTracks({
    artistId: artist.id,
  });
  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.name,
  });

  const coverImageImgUrl = useMemo(() => {
    if (isLoading) {
      return { url: LOADING_IMAGE, width: 400, height: 400 };
    }
    if (artist?.images?.[0]?.url == null) {
      return { url: PLACEHOLDER_IMAGE, width: 400, height: 400 };
    }
    return {
      url: artist?.images?.[0]?.url,
      width: artist?.images?.[0]?.width ?? 400,
      height: artist?.images?.[0]?.height ?? 400,
    };
  }, [artist, isLoading]);

  if (isError) {
    showToast();
  }

  return (
    <li className="bg-(--grey-300) p-4 w-full inline-flex flex-col rounded-[4px] shadow-(--shadow-basic)">
      <span className="inline-flex gap-4 w-full mb-4 h-40">
        <Suspense fallback={<img src={PLACEHOLDER_IMAGE} alt="loading" />}>
          <Link
            to={artist.external_urls?.spotify ?? '#'}
            className="relative inline-block w-40! h-40!"
            aria-disabled={artist.external_urls?.spotify == null}
          >
            <MeasuredImage
              src={coverImageImgUrl.url}
              alt={coverImageImgUrl.url}
              width={coverImageImgUrl.width}
              className="w-40! h-40!"
              height={coverImageImgUrl.height}
            />
            <span className="absolute bottom-1 right-1 inline-block text-(length:--text-fluid-s)">
              <SpotifyIcon />
            </span>
          </Link>
        </Suspense>
        <span className="inline-flex flex-col w-full">
          <Suspense>
            <span className="inline-block w-full pb-3">
              <ArtistName artistName={artist?.name} />
              <Followers followers={artist?.followers?.total} />
            </span>
            {artist?.genres && artist?.genres?.length > 0 ? (
              <GenreList genres={artist.genres} />
            ) : null}
          </Suspense>
        </span>
      </span>
      <Suspense>
        <TopTrackList topTracks={data?.tracks} />
      </Suspense>
    </li>
  );
}
