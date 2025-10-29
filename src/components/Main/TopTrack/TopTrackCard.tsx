import { Track } from '@/models/Track';
import { splitLengthyText } from '@/utils/string/splitLengthyText';
import { lazy } from 'react';

const Card = lazy(() => import('@/ui/Card'));

const TopTrackCard = ({ item, index }: { item: Track; index: number }) => {
  return (
    <Card
      tab={''}
      id={item?.id}
      variant="grey"
      key={item?.id}
      coverImage={item?.album?.images?.[0]?.url ?? '#'}
      contextUri={item.album.uri}
      isPlayable={true}
      externalUrls={item?.external_urls?.spotify}
      cardStyle={{ width: '12rem' }}
      offset={{ position: item.track_number - 1 }}
      title={`${index + 1}. ${splitLengthyText(item?.name ?? 'No title ', 20)}`}
      titleTag={`#${item.track_number} ${item.album.name ?? 'No name'}`}
    />
  );
};

export default TopTrackCard;
