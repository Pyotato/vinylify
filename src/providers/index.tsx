import { Suspense } from 'react';
import Router from './router';
import TanstackQuery from './tanstackQuery';

const Providers = () => {
  return (
    <TanstackQuery>
      <Suspense>
        <Router />
      </Suspense>
    </TanstackQuery>
  );
};

export default Providers;
