import { SearchProps } from '@/components/Search/Search';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from './useDebounce';

/**
 * Custom hook for managing search bar behavior with debounced updates.
 *
 * Handles:
 * - Synchronizing the search keyword with URL parameters.
 * - Updating the placeholder text dynamically from existing search data.
 * - Debouncing user input before triggering search parameter updates.
 * - Handling Enter key events to trigger a manual search.
 *
 * @param urlData - Current URL-related search parameters.
 * @param handleSearchParam - Callback to update search parameters.
 * @param data - Optional Spotify API search response, used to derive placeholder text.
 *
 * @returns Handlers and state for search input management:
 * - `keyword`: Current input value.
 * - `placeHolder`: Dynamic placeholder text.
 * - `debouncedRequest`: Debounced update function.
 * - `onChange`: Input change handler.
 * - `onKeyUp`: Key press handler for triggering search.
 */
function useSearchBar({
  urlData,
  data,

  handleSearchParam,
}: {
  urlData: {
    total: string | null;
    scope: string;
    keyword: string;
    offset: string | number | undefined;
    limit: string | number | undefined;
  };
  handleSearchParam: SearchProps['handleSearchParam'];
  data?: SpotifyApi.SearchResponse;
}) {
  const [keyword, setKeyword] = useState('');
  const [placeHolder, setPlaceHolder] = useState(() => {
    if (urlData.keyword == '') {
      const defaultSearchWord = data?.albums?.href.match(
        /(?<=(query=)).*(?=&type)/,
      );
      return defaultSearchWord
        ? decodeURI(defaultSearchWord[0].replaceAll('+', ' '))
        : '';
    } else {
      return urlData.keyword;
    }
  });

  useEffect(() => {
    if (urlData.keyword == '') {
      const defaultSearchWord = data?.albums?.href.match(
        /(?<=(query=)).*(?=&type)/,
      );
      const placeHolderKeyword = defaultSearchWord
        ? decodeURI(defaultSearchWord[0].replaceAll('+', ' '))
        : '';
      setPlaceHolder(placeHolderKeyword);
    }
  }, [urlData]);

  const debouncedRequest = useDebounce(
    () => {
      setPlaceHolder(keyword);
      if (keyword != '') {
        handleSearchParam('keyword', keyword);
      }
    },
    [keyword],
    1_500,
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
    setPlaceHolder(e.target.value);
    debouncedRequest();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      debouncedRequest();
    }
  };

  return { keyword, placeHolder, debouncedRequest, onChange, onKeyUp };
}

export default useSearchBar;
