import { SearchProps } from '@/components/Search/Search';

import { DEFAULT_TAB, type TabItem, type TabKey } from '@/services/options';
import { useEffect, useMemo } from 'react';
import { useInfiniteSearchList } from './query/search/useInfiniteSearchList';

export type UseInfiniteTabProps = Pick<SearchProps, 'handleSearchParam'> & {
  currentTab?: TabKey;
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
    return (infiniteData?.pages.flatMap(page =>
      (page?.[currentTab]?.items ?? []).filter(Boolean),
    ) ?? []) as TabItem;
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
