import { Artist } from '@/api/reccoBeats/getRecommendations';
import { Album } from '@/models/Album';
import { Playlist } from '@/models/Playlist';
import { Track } from '@/models/Track';
import { lazy } from 'react';

export const Tabs = {
  albums: {
    component: lazy(() => import('@/components/Search/Tab/Albums/AlbumCard')),
    label: '앨범',
  },
  artists: {
    component: lazy(
      () => import('@/components/Search/Tab/Artists/ArtistsCard'),
    ),
    label: '아티스트',
  },
  tracks: {
    component: lazy(() => import('@/components/Search/Tab/Tracks/TrackCard')),
    label: '트랙',
  },
  playlists: {
    component: lazy(
      () => import('@/components/Search/Tab/Playists/PlaylistCard'),
    ),
    label: '플레이리스트',
  },
} as const;

export type TabKey = keyof typeof Tabs;

export type TabItem = Album[] | Artist[] | Track[] | Playlist[];
