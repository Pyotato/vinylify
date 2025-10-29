import useGridVirtualizer from '@/hooks/useGridVirtualizer';
import { TabKey } from '@/services/tabs';
import { lazy } from 'react';

import { DEFAULT_TAB } from '@/constants/tab';
import { useToast } from '@/hooks/toasts/useToast';
import { SearchProps } from '../Search';

export const DEFAULT_GRID_ID = 'vinylify';

const VirtualGrid = lazy(() => import('../_shared/VirtualGrid'));

export type TabSEarchListProps = Omit<SearchProps, 'refetch'> & {
  currentTab?: TabKey;
  currentTabPagingInfo?: string;
};

export default function TabSearchList({
  currentTabPagingInfo,
  currentTab = DEFAULT_TAB,
  handleSearchParam,
  isError,
  error,
}: TabSEarchListProps) {
  const {
    gridCols,
    scrollRef,
    virtualizer,
    columns,
    columnVirtualizer,
    virtualRows,
    virtualColumns,
    infiniteItems,
    hasNextPage,
    isFetchingNextPage,
  } = useGridVirtualizer({
    currentTabPagingInfo,
    currentTab,
    handleSearchParam,
  });
  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.name,
  });

  if (isError) {
    showToast();
  }

  return (
    <VirtualGrid
      id={DEFAULT_GRID_ID}
      gridCols={gridCols}
      scrollRef={scrollRef}
      columns={columns}
      columnVirtualizer={columnVirtualizer}
      virtualColumns={virtualColumns}
      currentTab={currentTab}
      virtualizer={virtualizer}
      virtualRows={virtualRows}
      infiniteItems={infiniteItems}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
