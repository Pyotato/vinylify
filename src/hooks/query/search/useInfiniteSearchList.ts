import searchPage from '@/api/spotify/search/searchPage';
import getMyTopItems from '@/api/spotify/user/getMyTopItems';
import { HOUR } from '@/constants/time';
import { API } from '@/constants/url';
import { SearchResult } from '@/models/Spotify';
import { useInfiniteQuery } from '@tanstack/react-query';
import CONFIG from '../CONFIG';
import useUser from '../useUser';

const searchScope = {
  albums: 'album',
  artists: 'artist',
  tracks: 'track',
  playlists: 'playlist',
};

export const useInfiniteSearchList = ({
  url,
  limit = 20,
  offset = 0,
  scope = 'album',

  keyword,
}: {
  url?: string;
  limit?: number;
  offset?: number;
  keyword?: string;
  scope: string;
  total?: number;
}) => {
  const { data } = useUser();
  const defaultUrl = new URL(
    url ??
      `${API.SPOTIFY}search?query=${keyword}&offset=${offset}&limit=${limit}&type=${searchScope?.[scope as keyof typeof searchScope] ?? 'album'}&market=${
        data?.country ?? 'ES'
      }`,
  );

  const query = keyword ?? defaultUrl.searchParams.get('query');

  const defaultRes = useInfiniteQuery({
    queryKey: useInfiniteSearchList.queryKey([
      defaultUrl.href,
      query ?? '',
      '' + (limit ?? ''),
      searchScope?.[scope as keyof typeof searchScope] ?? 'album',
    ]),
    initialPageParam: defaultUrl.href,
    refetchOnWindowFocus: false,
    enabled: keyword == null && url != null,

    queryFn: async ({ pageParam }) => {
      if (!query) {
        const pageParamUrl =
          pageParam == null ? defaultUrl : new URL(pageParam);
        const topArtistName = await getMyTopItems({})?.then(
          res => res.items[0].name,
        );
        let copy = pageParamUrl.href;
        copy = copy.replace('query=', `query=${topArtistName}`);
        return await searchPage(copy);
      }

      const searchResult = await searchPage(pageParam);

      return searchResult;
    },

    getNextPageParam: lastPage => {
      const data = lastPage?.[scope as keyof SearchResult];
      if (!data) {
        return null;
      }

      const { next, offset, limit, total, href } = data;

      if (next) {
        return next;
      }

      const nextOffset = offset + limit;

      if (nextOffset >= total) {
        return null;
      }

      const url = new URL(href);
      url.searchParams.set('offset', String(nextOffset));
      url.searchParams.set('limit', String(limit));
      return url.href;
    },
    getPreviousPageParam: firstPage => {
      return firstPage?.[scope as keyof SearchResult]?.previous;
    },
    placeholderData: prev => prev,
    staleTime: 3 * HOUR,
    ...CONFIG,
  });

  return defaultRes;
};
useInfiniteSearchList.queryKey = (keywordUrl: string[]) => {
  return ['search', 'infinite', ...keywordUrl];
};
