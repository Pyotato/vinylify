import { useTopTracks } from '@/hooks/query/track/useTopTracks';

import Carousel from '@/ui/Carousel';
import { ErrorBoundary } from '@sentry/react';
import Skeleton from './Skeleton';
import TopTrackCard from './TopTrackCard';

export default function TopTrack() {
  const { data, isLoading } = useTopTracks(20);

  return (
    <Carousel>
      {isLoading ? (
        Array.from({ length: 20 }, (_, i) => (
          <Skeleton index={i} key={i + '-skeleton-top-track'} />
        ))
      ) : (
        <ErrorBoundary>
          {data?.items.map((item, index) => (
            <TopTrackCard key={item.id} item={item} index={index} />
          ))}
        </ErrorBoundary>
      )}
    </Carousel>
  );
}
