import { useTopTracks } from '@/hooks/query/track/useTopTracks';

import Carousel from '@/ui/Carousel';
import CoverImage from '@/ui/CoverImage';
import PlayIcon from '@/ui/Icons/Play';
import TopTrackCard from './TopTrackCard';

export default function TopTrack() {
  const { data, isLoading } = useTopTracks(20);

  return (
    <Carousel>
      {isLoading ? (
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i + '-skeleton'}
              className="text-(length:--text-fluid-s) flex-col inline-flex w-full align-middle gap-2"
            >
              <div className="w-44">
                <CoverImage.Skeleton />
              </div>
              <div className="inline-flex align-middle gap-2 w-full">
                <PlayIcon />
                <span className="animate-pulse w-full inline-block h-(length:--text-fluid-s) bg-(--grey-600)" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {data?.items.map((item, index) => (
            <TopTrackCard key={item.id} item={item} index={index} />
          ))}
        </>
      )}
    </Carousel>
  );
}
