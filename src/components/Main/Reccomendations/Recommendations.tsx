import { useRecommendations } from '@/hooks/query/useRecommendations';
import { useErrorNotifications } from '@/hooks/toasts/useErrorNotifications';
import { Link } from 'react-router-dom';
import Empty from './Empty';
import Skeleton from './Skeleton';

function Recommendations() {
  const { data, isLoading, isError, error } = useRecommendations();

  const { showErrorToast } = useErrorNotifications({
    errorMsg: error?.message,
    isError,
    toastId: error?.name,
  });
  if (isError) {
    showErrorToast();
  }

  return (
    <div className="h-[45vh] overflow-auto scrollbar-hide">
      {isLoading && <Skeleton />}

      {!data && !isLoading ? (
        <Empty />
      ) : (
        <div
          className={`inline-grid grid-cols-1 gap-x-4 mx-auto lg:grid-cols-2 w-full px-0 pt-0 gap-3 h-full`}
        >
          {data?.tracks.map(track => (
            <Link
              to={track.href}
              key={track.id}
              className="inline-flex rounded-lg gap-2 h-full bg-(--grey-100) shadow-2xl"
            >
              <img
                className="rounded-tl-lg rounded-bl-lg aspect-auto"
                src={track.album.images.at(-1)?.url}
                alt={track.album.images.at(-1)?.url}
                width={track.album.images.at(-1)?.width ?? 60}
                height={track.album.images.at(-1)?.height}
              />
              <span className="p-1 inline-flex flex-col">
                <span>{track.name}</span>
                <span className="text-(--light-grey-300)">
                  {track.artists.map(artist => artist.name).join(', ')}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
