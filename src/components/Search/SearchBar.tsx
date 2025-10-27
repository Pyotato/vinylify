import { useSearchKeyword } from '@/hooks/query/search/useSearchKeyword';
import { useErrorNotifications } from '@/hooks/toasts/useErrorNotifications';
import useSearchBar from '@/hooks/useSearchBar';

import { lazy } from 'react';
import { SearchProps } from './Search';

const LoadingIcon = lazy(() => import('@/ui/Icons/Loading'));

export default function SearchBar({
  urlData,
  handleSearchParam,
}: Readonly<{
  handleSearchParam: SearchProps['handleSearchParam'];
  urlData: {
    total: string | null;
    scope: string;
    keyword: string;
    offset: string | number | undefined;
    limit: string | number | undefined;
  };
}>) {
  const { data, isError, isLoading, error } = useSearchKeyword(urlData.keyword);

  const { keyword, placeHolder, onKeyUp, onChange } = useSearchBar({
    urlData,
    handleSearchParam,
    data,
  });

  const { showErrorToast } = useErrorNotifications({
    errorMsg: error?.message,
    isError,
    toastId: error?.name,
  });
  if (isError) {
    showErrorToast();
  }

  return (
    <div className="w-full inline-flex justify-center bg-(--light-grey-100) pt-6 pb-6 pr-4 pl-4">
      <div
        className={`w-full inline-flex justify-center rounded-[4px] ${isLoading ? 'bg-(--grey-600)' : 'bg-(--color-white)'}`}
      >
        <input
          name="song-search-bar"
          className="w-full inline-block p-1.5 disabled:bg-(--grey-600) disabled:text-(--grey-100)"
          value={keyword || ''}
          placeholder={placeHolder}
          onChange={onChange}
          disabled={isLoading}
          onKeyUp={onKeyUp}
        />
        {isLoading && <LoadingIcon />}
      </div>
    </div>
  );
}
