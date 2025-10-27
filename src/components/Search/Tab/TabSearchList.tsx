import { useErrorNotifications } from '@/hooks/toasts/useErrorNotifications';
import useGridVirtualizer from '@/hooks/useGridVirtualizer';
import { Album } from '@/models/Album';
import { Playlist } from '@/models/Playlist';
import { Artist } from '@/models/Profile';
import { SearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import { DEFAULT_TAB } from '@/services/options';
import { lazy, ReactNode } from 'react';
import { SearchProps } from '../Search';

export const DEFAULT_GRID_ID = 'vinylify';

const VirtualGrid = lazy(() => import('../_shared/VirtualGrid'));

export type TabItem = Album[] | Artist[] | Track[] | Playlist[];
export type TabList = ({ tabItem }: { tabItem: TabItem }) => ReactNode[];

export default function TabSearchList({
  currentTabPagingInfo,
  currentTab = DEFAULT_TAB,
  handleSearchParam,
  isError,
  error,
}: Omit<SearchProps, 'refetch'> & {
  currentTab?: keyof SearchResult;
  currentTabPagingInfo?: string;
  // keyword: string;
}) {
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
    // keyword,
  });
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.message,
    toastId: error?.name,
  });

  if (isError) {
    showErrorToast();
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
