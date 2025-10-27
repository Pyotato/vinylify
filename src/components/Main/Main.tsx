import TopTrack from '@/components/Main/TopTrack/TopTrack';
import AnimatedTitle from '@/ui/AnimatedTitle';

import { MainLayout } from '@/ui/Layout';
import Recommendations from './Reccomendations/Recommendations';

export default function Main() {
  return (
    <MainLayout>
      <AnimatedTitle>My top 20</AnimatedTitle>
      <TopTrack />
      <AnimatedTitle className="pt-3">Recommendations</AnimatedTitle>
      <Recommendations />
    </MainLayout>
  );
}
