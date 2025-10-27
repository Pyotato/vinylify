import AlbumCard from '@/components/Search/Tab/Albums/AlbumCard';
import ArtistCard from '@/components/Search/Tab/Artists/ArtistsCard';
import PlaylistCard from '@/components/Search/Tab/Playists/PlaylistCard';
import TrackCard from '@/components/Search/Tab/Tracks/TrackCard';
import { PAGE } from '@/constants/url';
import HomeIcon from '@/ui/Icons/Home';
import MusicIcon from '@/ui/Icons/Music';
import SearchIcon from '@/ui/Icons/Search';

export const NavigationMenu = [
  { url: PAGE.MAIN, Icon: <HomeIcon />, protected: false },
  { url: PAGE.SEARCH, Icon: <SearchIcon />, protected: true },
  {
    url: PAGE.MUSIC_INFO,
    Icon: <MusicIcon />,
    protected: true,
  },
] as const;

export const Tabs = {
  albums: { component: AlbumCard, label: '앨범' },
  artists: { component: ArtistCard, label: '아티스트' },
  tracks: { component: TrackCard, label: '트랙' },
  playlists: { component: PlaylistCard, label: '플레이리스트' },
} as const;

export const DEFAULT_TAB = 'albums' as const;
