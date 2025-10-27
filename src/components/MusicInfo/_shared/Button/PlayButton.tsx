import playTrack from '@/api/spotify/player/playTrack';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import PlayIcon from '@/ui/Icons/Play';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import { VARIANTS } from './VARIANTS';

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  // imgUrl?: string;
  context: MetaInfo['uri'];
  uri?: CurrentlyPlayingTrack['item']['uri'];
  position_ms: CurrentlyPlayingTrack['progress_ms'];
  variant?: 'white' | 'grey';
}

const PlayButton = ({
  context,
  uri,
  position_ms,
  variant = 'white',
}: PlayButtonProps) => {
  const onPlayDebounceHandler = useDebounce(() => {
    playTrack({
      offset: { uri },
      position_ms,
      context_uris: context,
    });
  });

  return (
    <button
      className={classNames(
        `border-none hover:cursor-pointer ${VARIANTS[variant]} p-0 w-4 mr-1`,
      )}
      onClick={onPlayDebounceHandler}
    >
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
