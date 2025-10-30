import useSearchKeyword from '@/hooks/query/search/useSearchKeyword';
import useSearchTab from '@/hooks/useSearchTab';
import PlayerList from '@/ui/PlayerList/Player';
import { lazy, Suspense, useMemo } from 'react';
import TabSelection from './Tab/TabSelection';

const SearchBar = lazy(() => import('./SearchBar'));
const TabSearchList = lazy(() => import('./Tab/TabSearchList'));
const GridSkeleton = lazy(() => import('./_shared/GridSkeleton'));

const SEARCH_LIMIT_COUNT = 4 * 2 * 2;

export default function Search() {
  const { urlData, currentTab, handleSearchParam } = useSearchTab({
    limit: SEARCH_LIMIT_COUNT,
  });

  const { data, isLoading, isError, error, isFetched } = useSearchKeyword(
    urlData.keyword,
  );

  const currentTabPagingInfo = useMemo(() => {
    if (data != null && currentTab in data) {
      return data?.[currentTab]?.href;
    }
  }, [data, currentTab]);

  return (
    <>
      <Suspense>
        <SearchBar handleSearchParam={handleSearchParam} urlData={urlData} />
      </Suspense>
      <div className="h-full w-full inline-flex flex-col">
        <TabSelection
          currentTab={currentTab}
          handleSearchParam={handleSearchParam}
        />
        <Suspense fallback={<GridSkeleton />}>
          <TabSearchList
            isFetched={isFetched}
            currentTab={currentTab}
            currentTabPagingInfo={currentTabPagingInfo}
            isLoading={isLoading}
            isError={isError}
            error={error}
            handleSearchParam={handleSearchParam}
          />
        </Suspense>
      </div>
      <Suspense>
        <PlayerList />
      </Suspense>
    </>
  );
}
