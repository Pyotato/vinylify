import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/track/useCurrentPlayingTrack';

import PlayerList from '@/ui/PlayerList/Player';
import { lazy, Suspense, useMemo } from 'react';
import AnimatedTitle from '../../ui/AnimatedTitle';
import { MemoizedVinyl } from '../../ui/Vinyl/Vinyl';
import Empty from './Empty';
import Loading from './Loading';

const MusicPlayer = lazy(() => import('./MusicPlayer'));
const Lyrics = lazy(() => import('./Lyrics'));
const ArtistInfo = lazy(() => import('./ArtistInfo/ArtistInfo'));
const ArtistInfoSection = lazy(() => import('./ArtistInfoSection'));

export default function MusicInfo() {
  const { data, isLoading } = useCurrentPlayingTrack({
    enabled: true,
  });

  const artistId = useMemo(() => {
    return data?.item?.artists.map(artist => artist?.id);
  }, [data]);

  const vinylImage = useMemo(() => {
    if (isLoading) {
      return LOADING_IMAGE;
    }
    if (data?.item?.album?.images?.[0]?.url == null) {
      return PLACEHOLDER_IMAGE;
    }
    return data.item?.album?.images[0].url;
  }, [isLoading, data]);

  if (data?.item?.id == null && !isLoading) {
    return <Empty />;
  }

  if (data?.item == null) {
    return <Loading artistId={artistId} vinylImage={vinylImage} />;
  }

  return (
    <div
      className={
        'w-full h-full -ms-overflow-style:none scrollbar-hide overflow-scroll text-(--color-white) bg-(--light-grey-400) p-5 inline-flex justify-center-safe'
      }
    >
      <div className="w-full mb-18 h-fit lg:w-[60%] inline-flex flex-col gap-4">
        <Suspense>
          <AnimatedTitle>{data.item.name!}</AnimatedTitle>
        </Suspense>
        <div className="w-full">
          <div className="inline-flex justify-center align-middle w-full">
            <div className="relative">
              <Suspense>
                <MemoizedVinyl imgUrl={vinylImage} loading="eager" />
              </Suspense>
            </div>
          </div>
          <Suspense>
            <MusicPlayer
              isPlaying={data?.is_playing}
              uri={data.item.uri}
              contextUri={data.item.album.uri}
              progressMs={data?.progress_ms || 0}
              durationMs={data?.item?.duration_ms}
            />
          </Suspense>
        </div>
        <Suspense>
          <Lyrics
            artist={data.item.artists[0].name!}
            songTitle={data.item.name!}
          />
        </Suspense>
        <Suspense>
          <ArtistInfo>
            <ArtistInfoSection artistId={artistId} />
          </ArtistInfo>
        </Suspense>
        <Suspense>
          <PlayerList />
        </Suspense>
      </div>
    </div>
  );
}
