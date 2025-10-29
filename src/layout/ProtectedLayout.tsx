import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';

import useToastFactory from '@/hooks/toasts/useToastFactory';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from './BaseLayout';

export default function ProtectedRoute() {
  const { isLoading, token } = useAuth();
  const { reset } = useQueryErrorResetBoundary();
  const currentPage = useLocation()?.pathname;
  const { dismissAll } = useToastFactory({});

  if (isLoading) {
    return <Navigate to={currentPage} replace={false} />;
  }

  if (!token) {
    dismissAll();
    return <Navigate to={PAGE.MAIN} replace={token == null} />;
  }

  return (
    <ErrorBoundary fallbackRender={FallbackRender} onReset={reset}>
      <Outlet />
    </ErrorBoundary>
  );
}
