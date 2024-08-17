import classNames from 'classnames/bind';
import { FC, SVGProps } from 'react';
import Style from './cover.module.scss';

export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
}

const cx = classNames.bind(Style);

const Cover: FC<ImgUrlProps> = ({ imgUrl }) => {
  return <img src={imgUrl} alt={imgUrl} className={cx('cover', imgUrl)} />;
};
export default Cover;
