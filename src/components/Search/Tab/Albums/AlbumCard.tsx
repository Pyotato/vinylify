import { Album } from '@/models/Album';
import Card from '@/ui/Card';
import { CSSProperties, useMemo } from 'react';
import ArtistProfile from '../../_shared/Profile/ArtistProfile';

const AlbumCard = ({ item, style }: { item: Album; style?: CSSProperties }) => {
  const artists = useMemo(() => {
    return [...new Set(item.artists.map(artist => artist.id))];
  }, [item]);

  return (
    <Card
      id={item.id}
      variant="grey"
      cardStyle={{ ...style }}
      title={item.name}
      offset={{ position: 0 }}
      contextUri={item.uri}
      titleTag={[item.album_type, item.release_date].join(' ')}
      coverImage={item?.images?.[0]?.url}
      imgHeight={item?.images?.[0]?.height}
      imgWidth={item?.images?.[0]?.width}
      isPlayable={item.is_playable}
      externalUrls={item.external_urls?.spotify}
    >
      <ArtistProfile artists={artists} />
    </Card>
  );
};

export default AlbumCard;
