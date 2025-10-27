import KeycapButton from '@/ui/Button/KeycapButton';

import { useNavigate } from 'react-router-dom';

import { ReactNode } from 'react';

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
  return (
    <KeycapButton
      onClick={handleNavigation}
      className={isCurrentPage ? 'bg-(--grey-900)! text-(--grey-100)!' : ''}
    >
      {icon}
    </KeycapButton>
  );
};

export default NavigationButton;
