import playTrack from '@/api/spotify/player/playTrack';
import { SECOND } from '@/constants/time';
import useActiveDevice from '@/hooks/query/useActiveDevice';
import { useToast } from '@/hooks/toasts/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import LoadingIcon from '@/ui/Icons/Loading';
import PlayerToast from '@/ui/PlayerToast';
import {
  Dispatch,
  HtmlHTMLAttributes,
  lazy,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Button from '../Button';

const PlayIcon = lazy(() => import('../../Icons/Play'));

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  context: MetaInfo['uri'];
  uri?: { position: number } | { uri: string };
  position_ms?: CurrentlyPlayingTrack['progress_ms'];
  setDeviceId?: Dispatch<SetStateAction<string | null>>;
  title?: string;
}

const PlayButton = ({
  context,
  uri,
  position_ms = 0,
  setDeviceId,
  title,
}: PlayButtonProps) => {
  const [isActive, setIsActive] = useState(false);

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
    }),
    factoryId: PlayerToast.factoryId,
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

  useEffect(() => {
    setIsActive(isActiveToast);
  }, [isActiveToast, context]);

  return (
    <Button
      onClick={() => {
        handlePlayer(context);
      }}
      name={'play track'}
    >
      {isActive ? <LoadingIcon /> : <PlayIcon />}
    </Button>
  );
};
export default PlayButton;
