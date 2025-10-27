import playTrack from '@/api/spotify/player/playTrack';
import { SECOND } from '@/constants/time';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import { HtmlHTMLAttributes, lazy } from 'react';
import Button from '../Button';

const PlayIcon = lazy(() => import('../../Icons/Play'));

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  context: MetaInfo['uri'];
  uri?: { position: number } | { uri: string };
  position_ms?: CurrentlyPlayingTrack['progress_ms'];
}

const PlayButton = ({ context, uri, position_ms = 0 }: PlayButtonProps) => {
  const onPlayDebounceHandler = useDebounce(
    () => {
      playTrack({
        offset: uri,
        position_ms,
        context_uris: context,
      });
    },
    [],
    3 * SECOND,
  );

  return (
    <Button onClick={onPlayDebounceHandler} name={'play track'}>
      <PlayIcon />
    </Button>
  );
};
export default PlayButton;
