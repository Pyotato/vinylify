import KeycapButton from '@/ui/Button/KeycapButton';

import AccountError from '@/components/Error/AccountError';
import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../ui/Header/Header';
import { FullBackground } from '../ui/Layout';

export function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  if (
    error?.message === ERROR_MESSAGES['401'] ||
    error?.message === ERROR_MESSAGES['403']
  ) {
    return <AccountError />;
  }
  return (
    <FullBackground className="px-8">
      <h1 className="text-2xl font-bold">
        이런! 예기치 못한 오류가 발생했어요. 😖
      </h1>
      <h2>{JSON.stringify(error?.message)}</h2>
      <div className="inline-flex gap-4 w-full align-middle flex-wrap justify-center">
        <KeycapButton onClick={resetErrorBoundary} className="w-50">
          새로고침
        </KeycapButton>
      </div>
    </FullBackground>
  );
}

export const BaseLayout = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
      <div className="w-full h-[100vh] overflow-hidden">
        <Header />
        <Outlet />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};
