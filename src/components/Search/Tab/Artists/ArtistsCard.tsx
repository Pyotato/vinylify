import { Artist } from '@/models/Profile';

import compactNumberFormat from '@/utils/string/compactNumberFormat';
import Card from '../../../../ui/Card';
import GenreList from './GenreList';

const ArtistCard = ({ item }: { item: Artist }) => {
  return (
    <Card
      id={item.id}
      variant="grey"
      title={item.name}
      contextUri={item.uri}
      titleTag={
        item?.followers?.total == null
          ? null
          : `followers : ${compactNumberFormat(item?.followers?.total)}`
      }
      coverImage={item?.images?.[0]?.url}
      imgHeight={item?.images?.[0]?.height}
      imgWidth={item?.images?.[0]?.width}
      externalUrls={item?.external_urls?.spotify}
    >
      {item?.genres == null || item?.genres?.length === 0 ? null : (
        <GenreList genres={item.genres} />
      )}
    </Card>
  );
};

export default ArtistCard;
