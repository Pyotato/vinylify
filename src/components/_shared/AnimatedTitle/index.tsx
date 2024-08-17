import classNames from 'classnames/bind';
import Style from './animated-title.module.scss';

const cx = classNames.bind(Style);

export default function AnimatedTitle({
  children,
}: Readonly<{ children: string }>) {
  return <span className={cx('animated-title')}>{children}</span>;
}
