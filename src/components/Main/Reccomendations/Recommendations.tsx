import { useRecommendations } from '@/hooks/query/useRecommendations';
import { useToast } from '@/hooks/toasts/useToast';
import { lazy, Suspense } from 'react';
import Empty from './Empty';
import Skeleton from './Skeleton';

const RecommendationList = lazy(() => import('./RecommendationList'));

function Recommendations() {
  const { data, isError, isLoading, error } = useRecommendations();

  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.name,
    hideProgressBar: false,
    factoryId: error?.message!,
  });

  if (isError) {
    showToast();
  }

  if (!isLoading && data?.tracks == null) {
    return (
      <div className="h-[45vh] overflow-auto scrollbar-hide">
        <Empty />
      </div>
    );
  }

  return (
    <Suspense>
      <div className="h-[45vh] overflow-auto scrollbar-hide">
        {isLoading ? (
          <Skeleton />
        ) : (
          <RecommendationList tracks={data!.tracks} />
        )}
      </div>
    </Suspense>
  );
}

export default Recommendations;
