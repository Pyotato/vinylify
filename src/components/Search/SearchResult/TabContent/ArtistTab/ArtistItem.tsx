import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Artist } from '@/models/Profile';
import Card from '../_shared/Card';

import compactNumberFormat from '@/utils/string';
import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import GenreList from './GenreList';

const ArtistItem = ({ item }: { item: Artist }) => {
  return (
    <Card
      title={item?.name}
      contextUri={item?.uri}
      title_tag={
        item?.followers?.total == null
          ? null
          : `followers : ${compactNumberFormat(item?.followers?.total)}`
      }
      topContent={
        item?.images ? (
          <CoverImage
            url={item?.external_urls?.spotify}
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
          />
        ) : (
          <CoverImageSkeleton />
        )
      }
    >
      {item?.genres && item.genres?.length > 0 ? (
        <GenreList genres={item?.genres} />
      ) : null}
    </Card>
  );
};

export default ArtistItem;
