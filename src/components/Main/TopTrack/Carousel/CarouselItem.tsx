import classNames from 'classnames/bind';

import CoverImage from '@/components/Search/SearchResult/TabContent/_shared/CoverImage';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { TrackSearchResult } from '@/models/Spotify';

import PauseButton from '@/components/_shared/Button/PauseButton';
import PlayButton from '@/components/_shared/Button/PlayButton';
import Style from './carousel.module.scss';

const cx = classNames.bind(Style);

const CarouselItem = ({
  item,
  index,
}: {
  item: TrackSearchResult['items'][0];
  index: number;
}) => {
  const { data } = useCurrentPlayingTrack();
  return (
    <div className={cx('carousel-item')} key={item?.id}>
      <div key={item?.uri} className={cx('top-track')}>
        <CoverImage
          imgUrl={item?.album?.images && item?.album?.images[0]?.url}
          url={item?.external_urls?.spotify}
        />
        <div className={cx('top-track-name')}>
          {item.id === data?.item?.id ? (
            <PauseButton name={item?.name} />
          ) : (
            <PlayButton
              id={item?.id}
              name={item?.name}
              uri={item.uri}
              _tag="track"
            />
          )}
          {index + 1}. {item?.name}
        </div>
      </div>
    </div>
  );
};

const CarouselItemSkelton = () => {
  return (
    <div className={cx('carousel-item')}>
      <div className={cx('top-track')}>
        <CoverImage.Skeleton />

        <div className={cx('top-track-name')}>
          <PlayButton aria-disabled={true} context={''} uri={''} />
          <div className={cx('skeleton', 'title')}></div>
        </div>
      </div>
    </div>
  );
};

CarouselItem.Skeleton = CarouselItemSkelton;

export default CarouselItem;
