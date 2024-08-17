import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import classNames from 'classnames/bind';
import Style from './button.module.scss';
import { PlayButtonProps } from './PlayButton';

const cx = classNames.bind(Style);

const PauseButton = ({
  name,
  variant = 'default',
}: Partial<PlayButtonProps>) => {
  const handlePause = () => pauseTrack({});

  return (
    <button
      className={cx('button', variant)}
      onClick={handlePause}
      aria-label={`pause music name ${name}`}
    >
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
