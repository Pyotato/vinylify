import classNames from 'classnames/bind';
import { FC, HtmlHTMLAttributes } from 'react';
import Style from './print.module.scss';

const cx = classNames.bind(Style);

const Print: FC<HtmlHTMLAttributes<HTMLDivElement>> = () => {
  return <div className={cx('print')} />;
};
export default Print;
