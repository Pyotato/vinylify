import { lazy, Suspense } from 'react';

const TopTrack = lazy(() => import('@/components/Main/TopTrack/TopTrack'));
const Recommendations = lazy(() => import('./Reccomendations/Recommendations'));
const MainLayout = lazy(() => import('@/ui/layout/MainLayout'));
const AnimatedTitle = lazy(() => import('@/ui/AnimatedTitle'));
const PlayerList = lazy(() => import('@/ui/PlayerList/Player'));
const Skeleton = lazy(() => import('./Reccomendations/Skeleton'));

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
      <Suspense>
        <PlayerList />
      </Suspense>
    </MainLayout>
  );
}
