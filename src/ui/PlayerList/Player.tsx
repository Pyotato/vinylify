import ProgressBar from '@/components/MusicInfo/ProgressBar';
import { LOADING_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/track/useCurrentPlayingTrack';
import useUserPlayQueue from '@/hooks/query/useUserPlayQueue';
import { PLAYER_LIST_TOAST_ID } from '@/hooks/toasts/CONFIG';
import { useToast } from '@/hooks/toasts/useToast';
import { useEffect, useState } from 'react';
import KeycapButton from '../Button/KeycapButton';
import QueueIcon from '../Icons/Queue';
import PlayQueue from './PlayerQueue';

function PlayerList() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useUserPlayQueue();

  const {
    data: currentlyPlayingdata,
    isLoading: isLoadingCurrentPlayingData,
    isFetched,
  } = useCurrentPlayingTrack({ enabled: true });

  const { showToast, dismissToast } = useToast({
    msg: PlayQueue({ queue: data?.queue }),
    isError: false,
    icon: false,
    autoClose: false,
    persist: true,
    toastId: PLAYER_LIST_TOAST_ID,
    stack: false,
    factoryId: PLAYER_LIST_TOAST_ID,
  });

  const openQueue = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (open && isFetched) {
      showToast();
    } else {
      dismissToast(PLAYER_LIST_TOAST_ID);
    }
  }, [open, isFetched]);

  if (isLoadingCurrentPlayingData) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-13 w-full bg-(--grey-400) p-2 text-white z-300">
        loading...
      </div>
    );
  }

  if (!currentlyPlayingdata?.is_playing) {
    dismissToast(PLAYER_LIST_TOAST_ID);
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-13 w-full bg-(--grey-400) p-2 text-white z-300">
      {data?.currently_playing && (
        <div className="inline-flex w-full">
          <div className="inline-flex w-full gap-2">
            <img
              src={data?.currently_playing?.album?.images?.at(-1)?.url}
              alt={LOADING_IMAGE}
              width={
                data?.currently_playing?.album?.images?.at(-1)?.width ?? 16
              }
              height={
                data?.currently_playing?.album?.images?.at(-1)?.height ?? 16
              }
              className="w-8 h-8"
            />
            <div className="w-[80%] inline-flex flex-col gap-1 overflow-hidden">
              <div
                className={`text-sm ${!currentlyPlayingdata?.is_playing ? '' : 'animate-carousel animation-timing-function:linear'} hover:animate-none [animation-duration:5s] w-[50%]`}
              >
                <span>{data?.currently_playing.name}</span>
                <span className="pl-1 text-xs  text-(--light-grey-300)">
                  {data.currently_playing?.artists?.map((artist, index) => (
                    <span key={artist?.id}>
                      {artist?.name}{' '}
                      {index != data.currently_playing?.artists.length - 1 &&
                        ', '}
                    </span>
                  ))}
                </span>
              </div>
              <ProgressBar
                className={'mt-0 mb-0'}
                progress={currentlyPlayingdata?.progress_ms ?? 0}
                duration={data?.currently_playing?.duration_ms}
              />
            </div>
          </div>
          <div>
            <KeycapButton
              className="bg-(--light-grey-300) hover:bg-(--light-grey-500) mr-3"
              onClick={openQueue}
              disabled={isLoading}
            >
              <QueueIcon />
            </KeycapButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerList;
