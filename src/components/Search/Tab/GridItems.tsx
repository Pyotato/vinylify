import { Tabs } from '@/services/tabs';
import { memo } from 'react';

const GridItems = memo(
  ({ item, tab }: { item: any; tab: keyof typeof Tabs }) => {
    const Component = Tabs[tab].component;

    return Component ? <Component item={item} /> : null;
  },
);
export default GridItems;
