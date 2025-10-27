import { Album } from '@/models/Album';
import { Playlist } from '@/models/Playlist';
import { Artist } from '@/models/Profile';
import { SearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import { DEFAULT_TAB, Tabs } from '@/services/options';
import { ReactNode } from 'react';
import { SearchProps } from '../Search';

export const DEFAULT_GRID_ID = 'vinylify';

export type TabItem = Album[] | Artist[] | Track[] | Playlist[];
export type TabList = ({ tabItem }: { tabItem: TabItem }) => ReactNode[];

export default function TabSelection({
  currentTab = DEFAULT_TAB,
  handleSearchParam,
}: Pick<SearchProps, 'handleSearchParam'> & {
  currentTab?: keyof SearchResult;
}) {
  return (
    <ul className="bg-(--light-grey-100) inline-flex flex-row align-middle list-none w-full h-12">
      {Object.entries(Tabs).map(([key]) => {
        return (
          <li
            key={key}
            className={`h-full inline-flex w-[25%] p-(--p-fluid-s) first:ml-4 last:mr-4 ${key === currentTab ? 'shadow-(--shadow-tab-focused) rounded-tl-(--rounded-fluid-s) rounded-tr-(--rounded-fluid-s) bg-(--color-white) text-(--grey-400)' : 'text-(--light-grey-100)'}`}
          >
            <button
              className="border-none w-full text-(length:--text-fluid-xs) text-(--grey-300) hover:cursor-pointer hover:text-(--light-grey-400) p-0 uppercase text-center"
              onClick={() => {
                handleSearchParam('scope', key);
              }}
            >
              {key}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
