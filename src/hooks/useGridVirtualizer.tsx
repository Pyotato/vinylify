import { SearchResult } from '@/models/Spotify';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import useInfiniteTab from './useInfiniteTab';

import { useThrottledWindowSize } from './useWindowSize';

export type GridVirtualizerProps = {
  throttleSizeMs: number;
  columnWidth?: number;
  columnBreakPoints?: Record<number, number>;
  defaultColumnBreakPoint?: number;
  responsiveGridMap?: Partial<Record<GRID_QUERY_SIZE, number>>;
  // keyword: string;
};
export type GRID_QUERY_SIZE = 'xs' | 'sm' | 'md' | 'lg';

const DEFAULT_THROTTLE_MS = 30;
const DEFAULT_COLUMN_WIDTH = 300;
export const GRID_COLS_PER_BREAKPOINT = {
  xs: 2,
  md: 3,
  lg: 4,
} as const;
export const DEFAULT_COLUMN_BREAKPOINT = 4;
export const DEFAULT_COLUMN_BREAKPOINTS = { 576: 1, 768: 2, 1024: 3 };

function useGridVirtualizer({
  columnWidth = DEFAULT_COLUMN_WIDTH,
  defaultColumnBreakPoint = DEFAULT_COLUMN_BREAKPOINT,
  throttleSizeMs = DEFAULT_THROTTLE_MS,
  columnBreakPoints = DEFAULT_COLUMN_BREAKPOINTS,
  responsiveGridMap = GRID_COLS_PER_BREAKPOINT,
  currentTabPagingInfo,
  currentTab,
  handleSearchParam,
  // keyword, // restore scroll position?
}: Partial<GridVirtualizerProps> & {
  EndComponent?: ReactNode;
  currentTab: keyof SearchResult;
  currentTabPagingInfo?: string;
  handleSearchParam: (
    key: 'total' | 'scope' | 'keyword' | 'offset' | 'limit',
    value: string,
  ) => void;
}) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    infiniteItems,
    isLoading,
  } = useInfiniteTab({
    currentTabPagingInfo,
    currentTab,
    handleSearchParam,
  });

  const { width } = useThrottledWindowSize(throttleSizeMs);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const gridCols = useMemo(() => {
    return Object.entries(responsiveGridMap)
      .map(([key, value]) => `${key}:grid-cols-${value}`)
      .join(' ');
  }, [responsiveGridMap]);

  const columns = useMemo(() => {
    const keys = Object.keys(columnBreakPoints);
    const values = Object.values(columnBreakPoints);
    const filtered = values.filter((_, index) => width < +keys[index]);
    if (filtered.length === 0) {
      return defaultColumnBreakPoint;
    } else {
      return filtered[0];
    }
  }, [width, columnBreakPoints]);

  const rowCountCalculated = Math.ceil(infiniteItems.length / columns);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? rowCountCalculated + 1 : rowCountCalculated,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 600,
    overscan: 2,
    gap: 16,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => columnWidth,
    overscan: 2,
    gap: 16,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  useEffect(() => {
    virtualRows.forEach(vRow => {
      const item = infiniteItems[vRow.index];
      if (item?.images) {
        const img = new Image();
        img.src = item.images?.[0]?.url;
      }
    });
  }, [virtualRows, infiniteItems]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isFetching || isLoading) {
      return;
    }

    const lastRowIndex = virtualRows[virtualRows.length - 1]?.index ?? 0;
    const lastColIndex = virtualColumns[virtualColumns.length - 1]?.index ?? 0;

    // The last visible item index
    const lastVisibleIndex = lastRowIndex * columns + lastColIndex;

    const threshold = columns * 2;

    if (lastVisibleIndex + threshold >= infiniteItems.length) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    virtualRows,
    virtualColumns,
    infiniteItems.length,
    columns,
    fetchNextPage,
  ]);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.setProperty('contain', 'layout paint');
    }
  }, []);

  return {
    gridCols,
    width,
    scrollRef,
    virtualizer,
    rowCountCalculated,
    columns,
    columnVirtualizer,
    virtualRows,
    infiniteItems,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    virtualColumns,
  };
}

export default useGridVirtualizer;
