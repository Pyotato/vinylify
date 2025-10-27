import { useRecommendations } from '@/hooks/query/useRecommendations';
import { useErrorNotifications } from '@/hooks/toasts/useErrorNotifications';
import { lazy } from 'react';
import Empty from './Empty';
import Skeleton from './Skeleton';

const RecommendationList = lazy(() => import('./RecommendationList'));

function Recommendations() {
  const { data, isError, isLoading, error } = useRecommendations();

  const { showErrorToast } = useErrorNotifications({
    errorMsg: error?.message,
    isError,
    toastId: error?.name,
  });
  if (isError) {
    showErrorToast();
  }

  if (!isLoading && data?.tracks == null) {
    return (
      <div className="h-[45vh] overflow-auto scrollbar-hide">
        <Empty />
      </div>
    );
  }

  return (
    <div className="h-[45vh] overflow-auto scrollbar-hide">
      {isLoading ? <Skeleton /> : <RecommendationList tracks={data!.tracks} />}
    </div>
  );
}

export default Recommendations;
