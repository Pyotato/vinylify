import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { SearchResponse } from './Response';
import { SearchResult } from './Spotify';

export type Refetch = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<SearchResponse, Error>>;

export type SearchProps = Readonly<{
  data?: SearchResult;
  refetch: Refetch;
  isLoading: boolean;
  isFetched?: boolean;
  isError: boolean;
  error: Error | null;
  handleSearchParam: (
    key: 'total' | 'scope' | 'keyword' | 'offset' | 'limit',
    value: string,
  ) => void;
}>;
