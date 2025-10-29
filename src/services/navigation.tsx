import { PAGE } from '@/constants/url';
import { lazy } from 'react';

const HomeIcon = lazy(() => import('@/ui/Icons/Home'));
const MusicIcon = lazy(() => import('@/ui/Icons/Music'));
const SearchIcon = lazy(() => import('@/ui/Icons/Search'));

const NavigationMenu = [
  { url: PAGE.MAIN, Icon: <HomeIcon />, protected: false },
  { url: PAGE.SEARCH, Icon: <SearchIcon />, protected: true },
  {
    url: PAGE.MUSIC_INFO,
    Icon: <MusicIcon />,
    protected: true,
  },
] as const;

export default NavigationMenu;
