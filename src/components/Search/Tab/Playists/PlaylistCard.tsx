import { Playlist } from '@/models/Playlist';
import Card from '../../../../ui/Card';
import PlaylistDescription from './PlaylistDescription';

const PlaylistCard = ({ item }: { item: Playlist }) => {
  return (
    <Card
      id={item.id}
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
