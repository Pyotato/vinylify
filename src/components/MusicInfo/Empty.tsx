import Grid from '@/ui/Grid';
import FullBackground from '@/ui/layout/FullBackground';
import { lazy, Suspense } from 'react';
import NavigateSearch from './_shared/NavigateSearch';

const SearchReccomendations = lazy(() => import('./SearchReccomendations'));

function Empty() {
  return (
    <FullBackground className="p-8">
      <h1 className="text-(length:--text-fluid-lg) text-(--light-grey-100)">
        재생중인 음악이 없네요 😑
      </h1>
      <h2 className="text-(length:--text-fluid-md) text-(--light-grey-300)">
        최근에 들은 아티스트들이에요. 듣고 싶은 노래를 검색해 보세요!
      </h2>

      <NavigateSearch />
      <div className="w-full h-[80vh] overflow-scroll scrollbar-hide">
        <Suspense fallback={<Grid className="mb-9">?</Grid>}>
          <SearchReccomendations />
        </Suspense>
      </div>
    </FullBackground>
  );
}

export default Empty;
