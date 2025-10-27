import { SearchProps } from '@/components/Search/Search';
import { TabItem } from '@/components/Search/Tab/TabSelection';
import { SearchResult } from '@/models/Spotify';
import { DEFAULT_TAB } from '@/services/options';
import { useEffect, useMemo } from 'react';
import { useInfiniteSearchList } from './query/search/useInfiniteSearchList';

export type UseInfiniteTabProps = Pick<SearchProps, 'handleSearchParam'> & {
  currentTab?: keyof SearchResult;
  currentTabPagingInfo?: string;
};

function useInfiniteTab({
  currentTabPagingInfo,
  currentTab = DEFAULT_TAB,
  handleSearchParam,
}: UseInfiniteTabProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSearchList({
    url: currentTabPagingInfo,
    scope: currentTab,
  });

  const total = useMemo(() => {
    return infiniteData?.pages[infiniteData?.pages.length - 1]?.[currentTab]
      ?.total;
  }, [infiniteData, currentTab]);

  useEffect(() => {
    if (total != null) {
      handleSearchParam('total', '' + total);
    }
  }, [total]);

  const infiniteItems = useMemo(() => {
    return (
      infiniteData?.pages.reduce((acc, page) => {
        return [...acc, ...(page?.[currentTab]?.items ?? [])].filter(v => v);
      }, [] as TabItem) ?? []
    );
  }, [infiniteData, currentTab]);

  const rowCount = useMemo(() => {
    return infiniteData?.pages?.[0]?.[currentTab]?.total ?? 0;
  }, [infiniteData, currentTab]);

  return {
    infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    total,
    infiniteItems,
    rowCount,
    isLoading,
  };
}

export default useInfiniteTab;
