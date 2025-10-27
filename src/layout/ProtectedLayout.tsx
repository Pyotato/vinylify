import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackRender } from './BaseLayout';

export default function ProtectedRoute() {
  const { isLoading, token } = useAuth();
  const { reset } = useQueryErrorResetBoundary();
  const currentPage = useLocation()?.pathname;

  if (isLoading) {
    return <Navigate to={currentPage} replace={false} />;
  }

  if (!token) {
    return <Navigate to={PAGE.MAIN} replace={token == null} />;
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
      <Outlet />
    </ErrorBoundary>
  );
}
