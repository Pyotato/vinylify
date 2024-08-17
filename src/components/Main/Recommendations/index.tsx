import { PAGE } from '@/constants/url';
import { useRecommendations } from '@/hooks/query/useRecommendations';

import AnimatedTitle from '@/components/_shared/AnimatedTitle';
import NothingToShow from '../_shared/NothingToShow/NothingToShow';
import Table from './Table';

export default function Recommendations() {
  const { data, isLoading } = useRecommendations();

  if (isLoading) {
    return (
      <>
        <AnimatedTitle>Recommendations</AnimatedTitle>
        <Table.Skeleton />
      </>
    );
  }
  if (data?.tracks == null) {
    return (
      <>
        <AnimatedTitle>Recommendations</AnimatedTitle>
        <NothingToShow
          message={'추천 트랙이 없습니다😢'}
          redirect={{ text: '검색하러 가기', path: PAGE.SEARCH }}
        />
      </>
    );
  }
  return (
    <>
      <AnimatedTitle>Recommendations</AnimatedTitle>
      <Table items={data.tracks} />
    </>
  );
}
