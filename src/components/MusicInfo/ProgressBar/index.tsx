import classNames from 'classnames/bind';
import Style from './progress-bar.module.scss';

const cx = classNames.bind(Style);

const ProgressBar = ({
  progress,
  duration,
}: {
  progress: number;
  duration: number;
}) => {
  return (
    <progress
      max={100}
      className={cx('progress-bar')}
      value={Math.round((progress / duration) * 100)}
    ></progress>
  );
};

export default ProgressBar;
