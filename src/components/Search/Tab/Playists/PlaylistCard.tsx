import { Playlist } from '@/models/Playlist';
import { lazy } from 'react';

const Card = lazy(() => import('@/ui/Card'));
const PlaylistDescription = lazy(() => import('./PlaylistDescription'));

const PlaylistCard = ({ item }: { item: Playlist }) => {
  return (
    <Card
      id={item.id}
      tab={item.type!}
      variant="grey"
      title={item.name}
      titleTag={`by. ${item.owner.display_name}`}
      coverImage={item.images?.[0].url}
      imgHeight={item?.images?.[0]?.height}
      imgWidth={item?.images?.[0]?.width}
      contextUri={item.uri}
      offset={{ position: 0 }}
      externalUrls={item.external_urls?.spotify}
      isPlayable={true}
    >
      <li>total tracks : {item.tracks.total}</li>
      {item?.description ? (
        <PlaylistDescription description={item?.description} />
      ) : null}
    </Card>
  );
};

export default PlaylistCard;
