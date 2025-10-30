import addToPlayQueue from '@/api/spotify/player/addToPlayQueue';
// import { SPOTIFY_WEB_API } from '@/constants';
import { VINYLIFY_TOKEN } from '@/constants';
import { SECOND } from '@/constants/time';
import { useSpotifyAuth } from '@/hooks/query/useSpotifyAuth';
import useUserPlayQueue from '@/hooks/query/useUserPlayQueue';
import { PLAYER_LIST_TOAST_ID } from '@/hooks/toasts/CONFIG';
import { useToast } from '@/hooks/toasts/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryClient } from '@tanstack/react-query';
import { lazy, useEffect, useState } from 'react';
import PlayQueue from './PlayerList/PlayerQueue';

const AddIcon = lazy(() => import('./Icons/Add'));
const LoadingIcon = lazy(() => import('./Icons/Loading'));

const Notification = ({ title }: { title: string }) => {
  return <>{title}를 다음 재생할 곡으로 추가했습니다.</>;
};

function AddToQueueButton({
  uri,
  tab,
  title,
}: Readonly<{
  tab: string;
  title: string;
  uri?: string;
}>) {
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();
  const { showToast, isActiveToast } = useToast({
    msg: <Notification title={title} />,
    toastId: `add-${tab}-${title}`,
    isError: false,
    factoryId: tab,
    autoClose: 2 * SECOND,
    stack: true,
  });
  const { data: authData } = useSpotifyAuth(
    localStorage.getItem(VINYLIFY_TOKEN),
  );
  const { data, refetch, isFetchedAfterMount } = useUserPlayQueue();

  const { updateToast } = useToast({
    msg: PlayQueue({ queue: data?.queue }),
    isError: false,
    icon: false,
    autoClose: false,
    toastId: PLAYER_LIST_TOAST_ID,
    stack: false,
    factoryId: PLAYER_LIST_TOAST_ID,
  });

  useEffect(() => {
    setIsActive(isActiveToast);
  }, [isActiveToast, uri]);

  const handleAddToQueue = useDebounce(
    () => {
      if (uri != null) {
        addToPlayQueue({ uri });
        setIsActive(false);
        const queryKey = useUserPlayQueue.queryKey(
          // SPOTIFY_WEB_API.getAccessToken(),
          authData?.token,
        );
        const res = refetch();
        queryClient.setQueryData(queryKey, res);
      }
    },
    [uri],
    3 * SECOND,
  );

  if (isFetchedAfterMount) {
    updateToast(PLAYER_LIST_TOAST_ID, PlayQueue({ queue: data?.queue }));
  }

  return (
    <button
      className={`hover:cursor-pointer pr-1`}
      onClick={() => {
        handleAddToQueue();
        setIsActive(true);
        showToast();
      }}
    >
      {isActive ? <LoadingIcon /> : <AddIcon />}
    </button>
  );
}

export default AddToQueueButton;
