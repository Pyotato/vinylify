import { playTrack } from '@/api/spotify';
import PlayIcon from '@/assets/playIcon.svg';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { MetaInfo } from '@/models/MetaInfo';
import { CurrentlyPlayingTrack } from '@/models/Track';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import Style from './button.module.scss';
import PauseButton from './PauseButton';

const cx = classNames.bind(Style);

export interface PlayButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  context?: MetaInfo['uri'];
  uri?: CurrentlyPlayingTrack['item']['uri'];
  name?: MetaInfo['name'];
  variant?: 'default' | 'simple';
  _tag?: 'track';
  id?: string;
  position?: number;
}

const PlayButton = ({
  name,
  context,
  uri,
  variant = 'default',
  _tag,
  id,
}: PlayButtonProps) => {
  const { data } = useCurrentPlayingTrack();
  const handlePlayCurrent = () => {
    if (_tag == 'track') {
      playTrack({ uri });
      return;
    }
    playTrack({
      context_uris: context,
    });
  };

  if (id === data?.item?.id) {
    return <PauseButton name={name} variant={variant} />;
  }
  return (
    <button
      className={cx('button', variant)}
      onClick={handlePlayCurrent}
      aria-label={`play music name ${name}`}
    >
      <PlayIcon />
    </button>
  );
};
export default PlayButton;
