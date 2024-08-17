import Spotify from '@/assets/spotifyLogo.svg';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Style from './logo.module.scss';

export interface LogoProps extends HtmlHTMLAttributes<HTMLDivElement> {
  url: string;
  fill?: string;
}

const cx = classNames.bind(Style);

const Logo = ({ url, fill }: LogoProps) => {
  return (
    <Link
      to={url}
      aria-disabled={url == null}
      className={cx('logo', { 'logo-skeleton': fill === 'skeleton' })}
    >
      <Spotify />
    </Link>
  );
};
export default Logo;
