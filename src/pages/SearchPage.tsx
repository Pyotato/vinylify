import { lazy } from 'react';

const Search = lazy(() => import('@/components/Search/Search'));

export default function SearchPage() {
  return <Search />;
}
