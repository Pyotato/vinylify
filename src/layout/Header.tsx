import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';

import HomeIcon from '@/assets/homeIcon.svg';
import MusicIcon from '@/assets/musicIcon.svg';
import SearchIcon from '@/assets/searchIcon.svg';
import Icon from './Icon';

import classNames from 'classnames/bind';
import AuthButton from './AuthButton';
import Style from './header.module.scss';
import VinylifyIcon from './VInylifyIcon';

const cx = classNames.bind(Style);

const Header = () => {
  const { data } = useAuth();

  return (
    <header className={cx('header')}>
      <VinylifyIcon />
      <Icon svg={<HomeIcon />} url={PAGE.MAIN} />

      {!data ? (
        <AuthButton action="LOGIN" />
      ) : (
        <>
          <Icon svg={<SearchIcon />} url={PAGE.SEARCH} />
          <Icon svg={<MusicIcon />} url={PAGE.MUSIC_INFO} />
          <AuthButton action="LOGOUT" />
        </>
      )}
    </header>
  );
};

export default Header;
