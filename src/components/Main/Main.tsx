import AnimatedTitle from '@/ui/AnimatedTitle';

import { MainLayout } from '@/ui/Layout';

import { lazy, Suspense } from 'react';
import Skeleton from './Reccomendations/Skeleton';

const TopTrack = lazy(() => import('@/components/Main/TopTrack/TopTrack'));
const Recommendations = lazy(() => import('./Reccomendations/Recommendations'));

export default function Main() {
  return (
    <MainLayout>
      <AnimatedTitle>My top 20</AnimatedTitle>
      <Suspense>
        <TopTrack />
      </Suspense>
      <AnimatedTitle className="pt-3">Recommendations</AnimatedTitle>
      <div className="h-[45vh] overflow-auto scrollbar-hide">
        <Suspense fallback={<Skeleton />}>
          <Recommendations />
        </Suspense>
      </div>
    </MainLayout>
  );
}
