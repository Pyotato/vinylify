import { PLACEHOLDER_IMAGE } from '@/constants/image';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import CoverImage from '../CoverImage';
import Logo from '../Logo';
import PlayButton from '../PlayButton';
import Style from './card.module.scss';

const cx = classNames.bind(Style);

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  titleTag?: string | null;
  coverImage?: string;
  isPlayable?: boolean;
  contextUri: string;
  externalUrls?: string;
}

const CardSkeleton = () => {
  return (
    <li className={cx('card')}>
      <CoverImage.Skeleton />
      <Logo url="" className={cx('loading-logo')} fill="skeleton" />
      <ul>
        <li className="wrap">
          <span className={cx('title-tag', 'skeleton')} />
        </li>
        <span className={cx('content', 'skeleton')} />
      </ul>
    </li>
  );
};

const Card = ({
  titleTag,
  center,
  children,
  title,
  isPlayable,
  coverImage,
  contextUri,
  externalUrls,
}: CardProps) => {
  return (
    <li className={cx('card', { center })}>
      <CoverImage
        imgUrl={coverImage === undefined ? PLACEHOLDER_IMAGE : coverImage}
        url={externalUrls}
      />
      <ul>
        <li>
          <span className={cx('title')}>{title}</span>
        </li>

        <li className={cx('wrap')}>
          {isPlayable ? <PlayButton context_uris={contextUri} /> : null}

          <span className={cx('title-tag')}>{titleTag}</span>
        </li>
        {children}
      </ul>
    </li>
  );
};

Card.Skeleton = CardSkeleton;

export default Card;
