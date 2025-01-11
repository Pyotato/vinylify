import { useRecommendations } from '@/hooks/query/useRecommendations';

import AnimatedTitle from '@/components/_shared/AnimatedTitle';
import { PAGE } from '@/constants/url';
import NothingToShow from '../_shared/NothingToShow/NothingToShow';
import Table from './Table';

export default function Recommendations() {
  const { data, isLoading } = useRecommendations();

  return (
    <>
      <AnimatedTitle>Recommendations</AnimatedTitle>
      {isLoading ? (
        <Table.Skeleton />
      ) : data?.tracks == null ? (
        <NothingToShow
          message={'추천 트랙이 없습니다😢'}
          redirect={{ text: '검색하러 가기', path: PAGE.SEARCH }}
        />
      ) : (
        <Table items={data.tracks} />
      )}
    </>
  );
}
