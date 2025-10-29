import { Track } from '@/models/Track';
import { formatHHMMSS } from '@/utils/string/formatHHMMSS';
import { lazy, useMemo } from 'react';

const Card = lazy(() => import('@/ui/Card'));
const ArtistProfile = lazy(() => import('../../_shared/Profile/ArtistProfile'));

export const TrackCard = ({ item }: { item: Track }) => {
  const artists = useMemo(() => {
    return [...new Set(item.artists.map(artist => artist.id))];
  }, [item]);
  const trackDurationHHMMSS = useMemo(
    () => formatHHMMSS({ utcTime: item.duration_ms }),
    [item],
  );

  return (
    <Card
      tab={item.type!}
      id={item.id}
      variant="grey"
      title={item.name}
      offset={{ uri: item.uri }}
      contextUri={item.album.uri}
      titleTag={`${item.album.name} #${item.track_number}`}
      coverImage={item.album.images?.[0]?.url}
      imgHeight={item?.album?.images?.[0]?.height}
      imgWidth={item?.album?.images?.[0]?.width}
      externalUrls={item.external_urls?.spotify}
      isPlayable={item.is_playable}
    >
      <li>재생 시간: {trackDurationHHMMSS}</li>
      <ArtistProfile artists={artists} />
    </Card>
  );
};

export default TrackCard;
