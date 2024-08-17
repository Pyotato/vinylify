import { Image } from '@/models/MetaInfo';
import classNames from 'classnames/bind';
import Album from '../Album/Album';
import VinylBody from '../Body/VinylBody';
import Cover from '../Cover/Cover';
import Print from '../Print/Print';
import Style from './vinyl.module.scss';

const cx = classNames.bind(Style);

export default function Vinyl({ imgUrl }: Readonly<{ imgUrl: Image['url'] }>) {
  return (
    <div className={cx('fixed-wrap')}>
      <div className={cx('wrap')}>
        <Album>
          <Cover imgUrl={imgUrl} />
          <VinylBody imgUrl={imgUrl}>
            <Print />
          </VinylBody>
        </Album>
      </div>
    </div>
  );
}
