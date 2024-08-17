import { playTrack } from '@/api/spotify';
import PlayIcon from '@/assets/playIcon.svg';
import { MetaInfo } from '@/models/MetaInfo';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import Style from './play-button.module.scss';

export interface PlayableProps extends HtmlHTMLAttributes<HTMLDivElement> {
  context_uris: MetaInfo['uri'];
}

const cx = classNames.bind(Style);

const PlayButton = ({ context_uris }: PlayableProps) => {
  const handlePlayCurrent = () => {
    playTrack({ context_uris });
  };
  return (
    <button className={cx('play-button')} onClick={handlePlayCurrent}>
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
