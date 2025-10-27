import { TrackSearchResult } from '@/models/Spotify';

import Card from '@/ui/Card';
import { splitLengthyText } from '@/utils/string/splitLengthyText';

const TopTrackCard = ({
  item,
  index,
}: {
  item: TrackSearchResult['items'][0];
  index: number;
}) => {
  return (
    <Card
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
      titleTag={`#${item.track_number} ${splitLengthyText(item.album.name ?? 'No name')}`}
    />
  );
};

export default TopTrackCard;
