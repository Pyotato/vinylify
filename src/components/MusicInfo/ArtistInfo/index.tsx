import { useArtist } from '@/hooks/query/useArtist';
import { Artist } from '@/models/Profile';
import classNames from 'classnames/bind';
import ArtistInfoCard from './ArtistInfoCard';
import Style from './artist-info.module.scss';

const cx = classNames.bind(Style);

export default function ArtistInfo({
  artists,
}: Readonly<{
  artists: Artist[];
}>) {
  const { data } = useArtist({ artists });

  return (
    <ul className={cx('artist-info')}>
      <section className={cx('artist-info-card')}>
        <h1 className={cx('about-the-artist')}>About the artist</h1>
        {data?.map(artist => (
          <ArtistInfoCard artist={artist} key={artist.id} />
        ))}
      </section>
    </ul>
  );
}
