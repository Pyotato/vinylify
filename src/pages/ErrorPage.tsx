import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { BLACK_TEXTURE } from '@/constants/image';
import { lazy } from 'react';
import { useRouteError } from 'react-router-dom';

const AccountError = lazy(() => import('@/components/Error/AccountError'));
const Vinyl = lazy(() => import('@/ui/Vinyl/Vinyl'));

export default function ErrorPage() {
  const { message } = useRouteError() as Error;

  if (message === ERROR_MESSAGES['401'] || message === ERROR_MESSAGES['403']) {
    return <AccountError />;
  }
  return (
    <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
      <div className="text-center align-middle inline-flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold">{message}</h1>
        <div className="inline-flex justify-center relative">
          <Vinyl imgUrl={BLACK_TEXTURE} />
        </div>
      </div>
    </div>
  );
}
