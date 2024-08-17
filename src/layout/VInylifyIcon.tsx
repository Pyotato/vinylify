import VinylifyLogo from '@/assets/vinylifyLogo.svg';

import classNames from 'classnames/bind';
import Style from './vinylify-icon.module.scss';

const cx = classNames.bind(Style);

const VinylifyIcon = () => {
  return (
    <div className={cx('vinylify-icon')}>
      <VinylifyLogo />
    </div>
  );
};

export default VinylifyIcon;
