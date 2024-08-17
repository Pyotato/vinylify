import classNames from 'classnames/bind';
import { FC, HtmlHTMLAttributes } from 'react';
import Style from './album.module.scss';

const cx = classNames.bind(Style);

const Album: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div className={cx('album')}>{children}</div>;
};
export default Album;
