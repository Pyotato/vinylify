import playTrack from '@/api/spotify/player/playTrack';
import { SECOND } from '@/constants/time';
import { PlayButtonProps } from '@/ui/Button/PlayPauseButton/PlayButton';
import PlayerToast from '@/ui/PlayerToast';
import { Dispatch, SetStateAction } from 'react';
import useActiveDevice from './query/useActiveDevice';
import { useToast } from './toasts/useToast';
import { useDebounce } from './useDebounce';

function usePlayer({
  title,
  id,
  setDeviceId,
  position_ms,
  context,
  uri,
}: {
  id?: string;
  setDeviceId?: Dispatch<SetStateAction<string | null>>;
} & PlayButtonProps) {
  const { data } = useActiveDevice();
  const onPlayDebounceHandler = useDebounce(
    async () => {
      playTrack({
        offset: uri,
        position_ms,
        context_uris: context,
        active_device: data?.devices[0].id!,
      });
    },
    [],
    2 * SECOND,
  );

  const { showToast, isActiveToast } = useToast({
    msg: PlayerToast({
      title,
      context,
      setDeviceId,
      position_ms,
      uri,
      id,
    }),
    factoryId: id,
    isError: false,
    icon: false,
    stack: false,
    toastId: `select-player-${context}`,
  });

  const handlePlayer = (currentUri: string) => {
    if (currentUri && title != null) {
      showToast();
    } else {
      onPlayDebounceHandler();
    }
  };

  return {
    handlePlayer,
    isActiveToast,
  };
}

export default usePlayer;
