// import MusicInfo from '@/components/MusicInfo/MusicInfo';

import { lazy } from 'react';

const MusicInfo = lazy(() => import('@/components/MusicInfo/MusicInfo'));

export default function MusicInfoPage() {
  return <MusicInfo />;
}
