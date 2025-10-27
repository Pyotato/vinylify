import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/track/useCurrentPlayingTrack';

import { formatHHMMSS } from '@/utils/string/formatHHMMSS';
import { Suspense, useMemo } from 'react';
import AnimatedTitle from '../../ui/AnimatedTitle';
import PauseButton from '../../ui/Button/PlayPauseButton/PauseButton';
import PlayButton from '../../ui/Button/PlayPauseButton/PlayButton';
import { MemoizedVinyl } from '../../ui/Vinyl/Vinyl';
import ArtistInfo from './ArtistInfo/ArtistInfo';
import ArtistInfoSection from './ArtistInfoSection';
import Empty from './Empty';
import Loading from './Loading';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';

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

  if (!data?.item && !isLoading) {
    return <Empty />;
  }

  if (data?.item == null) {
    return <Loading artistId={artistId} vinylImage={vinylImage} />;
  }

  return (
    <Suspense fallback={<>what's going on??</>}>
      <div
        className={
          'w-full h-full -ms-overflow-style:none scrollbar-hide overflow-scroll text-(--color-white) bg-(--light-grey-400) p-5 inline-flex justify-center-safe'
        }
      >
        <div className="w-full mb-8 h-fit lg:w-[60%] inline-flex flex-col gap-4">
          <AnimatedTitle>{data.item.name}</AnimatedTitle>
          <div className="w-full">
            <div className="inline-flex justify-center align-middle w-full">
              <div className="relative">
                <MemoizedVinyl imgUrl={vinylImage} loading="eager" />
              </div>
            </div>
            <div className="inline-flex w-full relative justify-center-safe align-middle">
              {data?.is_playing ? (
                <PauseButton />
              ) : (
                <PlayButton
                  context={data.item.album.uri}
                  uri={{ uri: data?.item.uri }}
                  position_ms={data?.progress_ms || 0}
                />
              )}
              <ProgressBar
                progress={data?.progress_ms ?? 0}
                duration={data?.item?.duration_ms}
              />
              <div className="ml-2 py-1.5">
                {formatHHMMSS({ utcTime: data?.item?.duration_ms })}
              </div>
            </div>
          </div>

          <Lyrics
            artist={data.item.artists[0].name}
            songTitle={data.item.name}
          />
          <ArtistInfo>
            <ArtistInfoSection artistId={artistId} />
          </ArtistInfo>
        </div>
      </div>
    </Suspense>
  );
}
