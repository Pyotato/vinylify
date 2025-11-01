import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const FallbackRender = lazy(() => import('./FallbackRender'));
const Header = lazy(() => import('../ui/Header/Header'));

const BaseLayout = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary fallbackRender={FallbackRender} onReset={reset}>
      <div className="w-full h-[100vh] overflow-hidden">
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};

export default BaseLayout;
