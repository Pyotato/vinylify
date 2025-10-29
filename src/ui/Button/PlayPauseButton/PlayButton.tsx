import usePlayer from '@/hooks/usePlayer';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import LoadingIcon from '@/ui/Icons/Loading';
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
  deviceId?: string;
  setDeviceId?: Dispatch<SetStateAction<string | null>>;
  title?: string;
}

const PlayButton = ({
  context,
  uri,
  deviceId,
  position_ms = 0,
  setDeviceId,
  title,
  id,
}: PlayButtonProps & { id?: string }) => {
  const [isActive, setIsActive] = useState(false);
  const { handlePlayer, isActiveToast } = usePlayer({
    setDeviceId,
    context,
    uri,
    deviceId,
    position_ms,
    title,
    id,
  });

  useEffect(() => {
    setIsActive(isActiveToast);
  }, [isActiveToast, context]);

  return (
    <Button
      onClick={() => {
        handlePlayer(context);
        setIsActive(true);
      }}
      name={'play track'}
    >
      {isActive ? <LoadingIcon /> : <PlayIcon />}
    </Button>
  );
};
export default PlayButton;
