import { playTrack } from '@/api/spotify';
import PlayIcon from '@/assets/playIcon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import Style from '../button.module.scss';

const cx = classNames.bind(Style);

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  context: MetaInfo['uri'];
  uri?: CurrentlyPlayingTrack['item']['uri'];
  position_ms: CurrentlyPlayingTrack['progress_ms'];
}

const PlayButton = ({ context, uri, position_ms }: PlayButtonProps) => {
  const onPlayDebounceHandler = useDebounce(() => {
    playTrack({
      offset: { uri },
      position_ms,
      context_uris: context,
    });
  });

  return (
    <button
      className={cx('play-button', 'button')}
      onClick={onPlayDebounceHandler}
    >
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
