import KeycapButton from '@/ui/Button/KeycapButton';

import { useNavigate } from 'react-router-dom';

import { ReactNode, useMemo } from 'react';

const NavigationButton = ({
  url,
  icon,
  isCurrentPage,
}: {
  url: string;

  isCurrentPage: boolean;
  icon: ReactNode;
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (isCurrentPage) {
      return;
    }
    navigate(url);
  };

  const buttonName = useMemo(() => {
    return url.replace('/', '') + 'navigation button';
  }, [url]);

  const ariaLabel = useMemo(() => {
    const page = url.replace('/', '') || 'home';
    return isCurrentPage ? `${page} 페이지 (현재 페이지)` : `${page} 페이지로 이동`;
  }, [url, isCurrentPage]);

  return (
    <KeycapButton
      onClick={handleNavigation}
      name={buttonName}
      aria-label={ariaLabel}
      aria-current={isCurrentPage ? 'page' : undefined}
      className={isCurrentPage ? 'bg-(--grey-900)! text-(--grey-100)!' : ''}
    >
      {icon}
    </KeycapButton>
  );
};

export default NavigationButton;
