import { useSearchKeyword } from '@/hooks/query/search/useSearchKeyword';
import useSearchTab from '@/hooks/useSearchTab';
import { SearchResult } from '@/models/Spotify';
import PlayerList from '@/ui/PlayerList/Player';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { lazy, Suspense, useMemo } from 'react';
import TabSelection from './Tab/TabSelection';
import GridSkeleton from './_shared/GridSkeleton';

const SearchBar = lazy(() => import('./SearchBar'));
const TabSearchList = lazy(() => import('./Tab/TabSearchList'));

type Refetch = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<SpotifyApi.SearchResponse, Error>>;

export type SearchProps = Readonly<{
  data?: SearchResult;
  refetch: Refetch;
  isLoading: boolean;
  isFetched?: boolean;
  isError: boolean;
  error: Error | null;
  handleSearchParam: (
    key: 'total' | 'scope' | 'keyword' | 'offset' | 'limit',
    value: string,
  ) => void;
}>;

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
