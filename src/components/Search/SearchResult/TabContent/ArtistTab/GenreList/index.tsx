import { Artist } from '@/models/Profile';
import classNames from 'classnames/bind';
import Badge from './Badge';
import Style from './genre-list.module.scss';

const cx = classNames.bind(Style);

const GenreList = ({ genres }: { genres: Artist['genres'] }) => {
  return (
    <ul className={cx('genre-list')}>
      {genres?.map((genre, i) => (
        <Badge key={genre} badgeNumber={i + 1} badgeTag={genre} />
      ))}
    </ul>
  );
};
export default GenreList;
