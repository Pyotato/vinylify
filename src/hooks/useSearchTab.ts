import { SearchResult } from '@/models/Spotify';
import { DEFAULT_TAB, Tabs } from '@/services/options';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// scope param이 "albums" | "artists" | "tracks" | "playlists" 타입인지 체크
const isValidScope = (value: any): value is keyof typeof Tabs => {
  return Object.keys(Tabs).includes(value);
};

export const SCOPE = 'scope';

function useSearchTab({ offset, limit }: { offset?: number; limit?: number }) {
  const [searchParam, setSearchParams] = useSearchParams();

  const handleSearchParam = (
    key: 'total' | 'scope' | 'keyword' | 'offset' | 'limit',
    value: string,
  ) => {
    searchParam.set(key, value);
    setSearchParams(searchParam);
  };

  const urlData = useMemo(
    () => ({
      total: searchParam.get('total'),
      scope: searchParam.get(SCOPE) ?? DEFAULT_TAB,
      keyword: searchParam.get('keyword') ?? '',
      offset: searchParam.get('offset') ?? offset,
      limit: searchParam.get('limit') ?? limit,
    }),
    [searchParam, offset],
  );

  const currentTab = useMemo(() => {
    const scope = searchParam.get(SCOPE);
    if (isValidScope(scope)) {
      return scope;
    }
    return DEFAULT_TAB;
  }, [searchParam, setSearchParams]) as keyof SearchResult;

  return { urlData, handleSearchParam, currentTab };
}

export default useSearchTab;
