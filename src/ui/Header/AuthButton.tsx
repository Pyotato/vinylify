import { useAuth } from '@/hooks/useAuth';
import KeycapButton from '@/ui/Button/KeycapButton';
import { startTransition } from 'react';

const AuthButton = ({ action }: { action: 'LOGIN' | 'LOGOUT' }) => {
  const { logOut, logIn } = useAuth();

  const handleLogin = () => {
    startTransition(() => {
      logIn();
    });
  };

  const handleLogout = () => {
    startTransition(() => {
      logOut();
    });
  };

  return (
    <KeycapButton
      name={'auth button'}
      onClick={action === 'LOGIN' ? () => handleLogin : handleLogout}
    >
      <span className="pl-0.5 pr-0.5 inline-block">
        {action === 'LOGIN' ? '로그인' : '로그아웃'}
      </span>
    </KeycapButton>
  );
};

export default AuthButton;
