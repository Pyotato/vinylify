import { useLocation } from 'react-router-dom';

import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';
import { NavigationMenu } from '@/services/options';
import { lazy } from 'react';

const VinylifyIcon = lazy(() => import('../Icons/Vinylify'));
const AuthButton = lazy(() => import('./AuthButton'));
const NavigationButton = lazy(() => import('./NavigationButton'));

const Header = () => {
  const currentPage = useLocation();
  const { token } = useAuth();

  return (
    <header className="w-full inline-flex pl-3 pr-3 pt-1">
      <NavigationButton
        url={PAGE.MAIN}
        icon={<VinylifyIcon />}
        isCurrentPage={currentPage.pathname === PAGE.MAIN}
      />

      <div className="w-full items-center gap-1.5 inline-flex justify-end-safe">
        {NavigationMenu.map(path =>
          !path.protected || token ? (
            <NavigationButton
              url={path.url}
              key={path.url}
              icon={path.Icon}
              isCurrentPage={currentPage.pathname === path.url}
            />
          ) : null,
        )}
        <AuthButton action={!token ? 'LOGIN' : 'LOGOUT'} />
      </div>
    </header>
  );
};

export default Header;
