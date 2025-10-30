import { AlbumObjectFull } from '@/models/Album';
import { ArtistObjectFull } from '@/models/Artist';
import { PlaylistObjectFull } from '@/models/Playlist';
import { TrackObjectFull } from '@/models/Track';
import { Tabs } from '@/services/tabs';
import { memo } from 'react';

const GridItems = memo(
  ({
    item,
    tab,
  }: {
    item: AlbumObjectFull &
      ArtistObjectFull &
      TrackObjectFull &
      PlaylistObjectFull;
    tab: keyof typeof Tabs;
  }) => {
    const Component = Tabs[tab].component;

    return Component ? <Component item={item} /> : null;
  },
);
export default GridItems;
