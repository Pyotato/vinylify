import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';
import { ImgUrlProps } from '../Cover/Cover';
import Style from './vinyl-body.module.scss';

interface ContainerProps extends ImgUrlProps {
  children: ReactNode;
}

const cx = classNames.bind(Style);

const VinylBody: FC<ContainerProps> = ({ children, imgUrl }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={cx('vinyl-body')}
    >
      {children}
    </div>
  );
};
export default VinylBody;
