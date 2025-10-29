import searchKeyword from '@/api/spotify/search/searchKeyword';
import searchFromMyTopOne from '@/api/spotify/user/searchFromMyTopOne';
import { MINUTE } from '@/constants/time';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import CONFIG from '../CONFIG';

const useSearchKeyword = (keyword?: string) => {
  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(keyword),
    queryFn: async ({ signal }) => {
      if (!keyword) {
        const res = await searchFromMyTopOne({ signal });
        return searchKeyword(res.keyword, signal);
      }

      return searchKeyword(keyword, signal);
    },
    notifyOnChangeProps: ['data'],
    staleTime: 15 * MINUTE,
    placeholderData: keepPreviousData,
    ...CONFIG,
  });

  return res;
};

useSearchKeyword.queryKey = (keyword?: string | null) => {
  const default_querykeys = ['search', 'list'];
  if (!keyword) {
    return default_querykeys;
  }
  return [...default_querykeys, keyword];
};

export default useSearchKeyword;
