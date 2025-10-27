import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { useArtistTopTracks } from '@/hooks/query/track/useArtistTopTracks';
import { useErrorNotifications } from '@/hooks/toasts/useErrorNotifications';
import { Artist } from '@/models/Profile';
import { MeasuredImageProps } from '@/ui/CoverImage/MeasuredImage';
import SpotifyIcon from '@/ui/Icons/Spotify';
import { memo, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ArtistName from './ArtistName';
import Followers from './Followers';
import GenreList from './GentreList';
import TopTrackList from './TopTrackList';

export const MeasuredImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: Readonly<MeasuredImageProps>) => {
  if (src == LOADING_IMAGE) {
    return (
      <div
        className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) `}
      >
        <div
          className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500`}
        />

        <img
          src={src}
          width={width ?? 30}
          height={height ?? 30}
          alt={alt || src}
          loading="eager"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 animate-pulse`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) ${className}`}
    >
      <div
        className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500
        `}
      />

      <img
        src={src}
        alt={alt || src}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500
  `}
        {...props}
      />
    </div>
  );
};

const MemoizedMeasuredImage = memo(MeasuredImage);

export default function ArtistInfoCard({
  artist,
}: Readonly<{
  artist: Artist;
}>) {
  const { data, isError, error, isLoading } = useArtistTopTracks({
    artistId: artist.id,
  });
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.message,
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
    showErrorToast();
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
            <MemoizedMeasuredImage
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
          <span className="inline-block w-full pb-3">
            <ArtistName artistName={artist?.name} />
            <Followers followers={artist?.followers?.total} />
          </span>
          {artist?.genres && artist?.genres?.length > 0 ? (
            <GenreList genres={artist.genres} />
          ) : null}
        </span>
      </span>
      <TopTrackList topTracks={data?.tracks} />
    </li>
  );
}
