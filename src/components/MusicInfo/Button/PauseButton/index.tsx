import { pauseTrack } from '@/api/spotify';
import PauseIcon from '@/assets/pauseIcon.svg';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames/bind';
import Style from '../button.module.scss';

const cx = classNames.bind(Style);

const PauseButton = () => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <button className={cx('button')} onClick={onPauseDebounceHandler}>
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
