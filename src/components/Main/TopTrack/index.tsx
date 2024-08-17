import AnimatedTitle from '@/components/_shared/AnimatedTitle';
import { PAGE } from '@/constants/url';
import { useTopTracks } from '@/hooks/query/useTopTracks';
import NothingToShow from '../_shared/NothingToShow/NothingToShow';
import Carousel from './Carousel';

export default function TopTrack() {
  const { data, isLoading } = useTopTracks(20);

  if (isLoading) {
    return (
      <>
        <AnimatedTitle>My top 20</AnimatedTitle>
        <Carousel.Skeleton />
      </>
    );
  } else if (data?.items == null) {
    return (
      <>
        <AnimatedTitle>Recommendations</AnimatedTitle>
        <NothingToShow
          message={'Top20 트랙이 없습니다😢'}
          redirect={{ text: '검색하러 가기', path: PAGE.SEARCH }}
        />
      </>
    );
  }

  return (
    <>
      <AnimatedTitle>My top 20</AnimatedTitle>
      <Carousel items={data.items} />
    </>
  );
}
