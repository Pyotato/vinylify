import { BLACK_TEXTURE } from '@/constants/image';
import { useAuth } from '@/hooks/useAuth';
import KeycapButton from '@/ui/Button/KeycapButton';

import { lazy, startTransition } from 'react';

const Vinyl = lazy(() => import('@/ui/Vinyl/Vinyl'));

function AccountError() {
  const { logIn, signUp } = useAuth();

  const handleLogin = () =>
    startTransition(() => {
      logIn();
    });
  const handleSignUp = () =>
    startTransition(() => {
      signUp();
    });

  return (
    <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
      <div className="text-center align-middle inline-flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold">
          서비스 사용을 위해 로그인해 주세요 🙂
        </h1>
        <div className="inline-flex justify-center relative">
          <Vinyl imgUrl={BLACK_TEXTURE} />
        </div>
        <KeycapButton onClick={handleLogin}>로그인</KeycapButton>
        <KeycapButton onClick={handleSignUp}>
          스포티파이 계정 만들기
        </KeycapButton>
      </div>
    </div>
  );
}

export default AccountError;
