import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import classNames from 'classnames/bind';
import Style from './button.module.scss';

const cx = classNames.bind(Style);

const PauseButton = () => {
  const handlePause = () => pauseTrack({});

  return (
    <button className={cx('button')} onClick={handlePause}>
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
