import AnimatedTitle from '@/ui/AnimatedTitle';

import { MemoizedVinyl } from '@/ui/Vinyl/Vinyl';
import { formatHHMMSS } from '@/utils/string/formatHHMMSS';
import { lazy } from 'react';
import ArtistInfo from './ArtistInfo/ArtistInfo';
import ArtistInfoSection from './ArtistInfoSection';
import ProgressBar from './ProgressBar';

const PlayIcon = lazy(() => import('@/ui/Icons/Play'));

function Loading({
  vinylImage,
  artistId,
}: Readonly<{
  vinylImage: string;
  artistId?: string[];
}>) {
  return (
    <div
      className={
        'w-full h-full -ms-overflow-style:none scrollbar-hide overflow-scroll text-(--color-white) bg-(--light-grey-400) p-5 inline-flex justify-center-safe'
      }
    >
      <div className="w-full mb-8 h-fit lg:w-[60%] inline-flex flex-col gap-4">
        <AnimatedTitle>Loading...</AnimatedTitle>
        <div className="w-full">
          <div className="inline-flex justify-center align-middle w-full">
            <div className="relative">
              <MemoizedVinyl imgUrl={vinylImage} loading="eager" />
            </div>
          </div>
          <div className="inline-flex w-full relative justify-center-safe align-middle">
            <PlayIcon />
            <ProgressBar progress={0} duration={3} />
            <div className="ml-2 py-1.5">{formatHHMMSS({ utcTime: 3 })}</div>
          </div>
        </div>

        <ArtistInfo>
          <ArtistInfoSection artistId={artistId} />
        </ArtistInfo>
      </div>
    </div>
  );
}

export default Loading;
