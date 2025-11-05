import { AlbumObjectFull } from '@/models/Album';
import { ArtistObjectFull } from '@/models/Artist';
import { PlaylistObjectFull } from '@/models/Playlist';
import { SearchResult } from '@/models/Spotify';
import { TrackObjectFull } from '@/models/Track';
import CoverImageSkeleton from '@/ui/CoverImage/Skeleton';
import Grid from '@/ui/Grid';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import GridItems from '../Tab/GridItems';

export type GRID_QUERY_SIZE = 'xs' | 'sm' | 'md' | 'lg';

export const GRID_COLS_PER_BREAKPOINT = {
  xs: 2,
  md: 3,
  lg: 4,
} as const;

export interface VirtualGridProps {
  hasNextPage: boolean;
  infiniteItems: any[];
  isFetchingNextPage?: boolean;
  id: string;
  currentTab: keyof SearchResult;
}

const VirtualGrid = ({
  gridCols,
  scrollRef,
  virtualizer,
  columns,
  columnVirtualizer,
  currentTab,
  virtualRows,
  virtualColumns,
  id,
  infiniteItems,
  isFetchingNextPage,
  hasNextPage,
}: VirtualGridProps & {
  gridCols: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  columns: number;
  columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
  virtualRows: VirtualItem[];
  virtualColumns: VirtualItem[];
}) => {
  return (
    <div
      ref={scrollRef}
      className="relative overflow-auto m-3 h-full scrollbar-hide"
    >
      <div
        className="relative w-full"
        style={{
          height: virtualizer.getTotalSize() + 250,
        }}
      >
        {infiniteItems.length == 0 && (
          <Grid className="relative m-0! p-0!">
            {Array.from({ length: 20 }, (_, index) => (
              <li
                className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
                key={index + '-skeleton'}
              >
                <CoverImageSkeleton />
                <ul>
                  <li className="wrap">
                    <span
                      className={`inline-block w-full h-4 animate-pulse bg-(--grey-600)`}
                    />
                  </li>
                  <span
                    className={`inline-block w-full h-8  animate-pulse bg-(--grey-600)`}
                  />
                </ul>
              </li>
            ))}
          </Grid>
        )}
        {virtualRows.map(vRow => {
          const startIndex = vRow.index * columns;
          const hasItem = startIndex < infiniteItems.length;

          if (hasItem) {
            return (
              <div
                key={`row-${id}-${vRow.index}`}
                ref={virtualizer.measureElement}
                data-index={vRow.index}
                className={`inline-grid absolute top-0 left-0 w-full gap-x-4 ${gridCols}`}
                style={{
                  transform: `translateY(${vRow.start}px)`,
                }}
              >
                {virtualColumns.map(vCol => {
                  const itemIndex = startIndex + vCol.index;
                  const item = infiniteItems[itemIndex];
                  if (!item) {
                    return null;
                  }
                  return (
                    <div
                      ref={columnVirtualizer.measureElement}
                      data-index={itemIndex}
                      key={item.id}
                    >
                      <GridItems
                        item={
                          item as AlbumObjectFull &
                            ArtistObjectFull &
                            TrackObjectFull &
                            PlaylistObjectFull
                        }
                        tab={currentTab}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }
          if (isFetchingNextPage) {
            return (
              <div
                key={`loader-row-${id}`}
                data-index={vRow.index}
                ref={virtualizer.measureElement}
                className="absolute top-0 left-0 w-full text-center py-8 text-gray-500"
                style={{
                  transform: `translateY(${vRow.start}px)`,
                }}
              >
                <span className="animate-pulse">Loading more…</span>
              </div>
            );
          }
          return null;
        })}
      </div>
      {infiniteItems.length != 0 && !hasNextPage && (
        <div
          key={`last-row-${id}`}
          ref={virtualizer.measureElement}
          className="absolute top-0 left-0 w-full text-center my-4 text-gray-500"
          style={{
            transform: `translateY(${virtualizer.getTotalSize()}px)`,
          }}
        >
          <span>– The End 🎧 –</span>
        </div>
      )}
    </div>
  );
};

export default VirtualGrid;
