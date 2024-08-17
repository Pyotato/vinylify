import classNames from 'classnames/bind';

import PauseButton from '@/components/_shared/Button/PauseButton';
import PlayButton from '@/components/_shared/Button/PlayButton';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { TrackSearchResult } from '@/models/Spotify';
import { HHMMSSFormat } from '@/utils/time';
import { Link } from 'react-router-dom';
import Style from './table.module.scss';

const cx = classNames.bind(Style);

const Table = ({
  items,
}: Readonly<{
  items: TrackSearchResult['items'];
}>) => {
  const { data } = useCurrentPlayingTrack();
  return (
    <ul className={cx('table')}>
      {items.map(item => (
        <li className={cx('table-item')} key={item.id}>
          <div>
            <img
              src={
                item?.album?.images == null
                  ? PLACEHOLDER_IMAGE
                  : item?.album?.images[0]?.url
              }
              alt={`${item?.album.name} 앨범 커버 이미지`}
            />
          </div>

          <div className={cx('table-item-description')}>
            <div className={cx('top-track-name')}>{item?.name} </div>
            <div>
              {item?.artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link
                    to={artist.external_urls?.spotify ?? '#'}
                    className={cx('artist-name', 'description', 'link')}
                  >
                    {artist.name}
                  </Link>
                  {index <= item?.artists.length - 2 ? ', ' : null}
                </span>
              ))}
            </div>

            <div className={cx('bottom-content')}>
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

              <div className={cx('description')}>
                {HHMMSSFormat({ utcTime: item.duration_ms })}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const TableSkeleton = () => {
  return (
    <div className={cx('table')}>
      {Array.from({ length: 20 }).map((_, index) => (
        <div className={cx('table-item')} key={`skeleton-${index + 1}`}>
          <div className={cx('skeleton-image', 'skeleton')}></div>

          <div className={cx('table-item-description')}>
            <span className={cx('skeleton', 'track-name')}></span>
            <span className={cx('skeleton', 'artist-name-skeleton')} />
            <div className={cx('bottom-content')}>
              <PlayButton context="" aria-disabled={true} />
              <span className={cx('skeleton', 'description-skeleton')} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Table.Skeleton = TableSkeleton;

export default Table;
