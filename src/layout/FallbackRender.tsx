import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
// import useToastFactory from '@/hooks/toasts/useToastFactory';
import { lazy, Suspense } from 'react';
import { FallbackProps } from 'react-error-boundary';

const AccountError = lazy(() => import('@/components/Error/AccountError'));
const FullBackground = lazy(() => import('../ui/layout/FullBackground'));
const KeycapButton = lazy(() => import('@/ui/Button/KeycapButton'));

export default function FallbackRender({
  error,
  resetErrorBoundary,
}: Readonly<FallbackProps>) {
  // const { dismissAll } = useToastFactory({});
  if (
    error?.message === ERROR_MESSAGES['401'] ||
    error?.message === ERROR_MESSAGES['403']
  ) {
    // dismissAll();
    return (
      <Suspense>
        <AccountError />
      </Suspense>
    );
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
