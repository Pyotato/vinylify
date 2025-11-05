import AccountError from '@/components/Error/AccountError';
import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import KeycapButton from '@/ui/Button/KeycapButton';
import FullBackground from '@/ui/layout/FullBackground';
import { FallbackProps } from 'react-error-boundary';

export default function FallbackRender({
  error,
  resetErrorBoundary,
}: Readonly<FallbackProps>) {
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
