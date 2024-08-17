import { PLACEHOLDER_IMAGE } from '@/constants/image';
import classNames from 'classnames/bind';
import { SVGProps } from 'react';
import Logo from '../Logo';
import Style from './cover-image.module.scss';
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  url?: string;
}

const cx = classNames.bind(Style);

const CoverImage = ({ imgUrl, url }: ImgUrlProps) => {
  return (
    <>
      <img
        src={imgUrl ?? PLACEHOLDER_IMAGE}
        alt={imgUrl}
        loading="lazy"
        className={cx('cover-image')}
      />
      <Logo
        url={url ?? '#'}
        className={cx({ 'logo-skeleton': url == null ? 'skeleton' : '' })}
      />
    </>
  );
};

const CoverImageSkeleton = () => {
  return <span className={cx('cover-image', 'skeleton')} />;
};

CoverImage.Skeleton = CoverImageSkeleton;

export default CoverImage;
