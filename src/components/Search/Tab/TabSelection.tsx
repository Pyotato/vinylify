import { DEFAULT_TAB } from '@/constants/tab';
import { SearchProps } from '@/models/Search';
import { Tabs, type TabKey } from '@/services/tabs';

export const DEFAULT_GRID_ID = 'vinylify';

type TabSelectionProps = Pick<SearchProps, 'handleSearchParam'> & {
  currentTab?: TabKey;
};

export default function TabSelection({
  currentTab = DEFAULT_TAB,
  handleSearchParam,
}: TabSelectionProps) {
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
