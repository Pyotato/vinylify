import { PAGE } from '@/constants/url';
import { useNavigate } from 'react-router-dom';

import { Tabs } from '@/services/tabs';
import KeycapButton from '../../../ui/Button/KeycapButton';

export default function NavigateSearch() {
  const navigate = useNavigate();

  return (
    <div className="inline-flex gap-4 w-full px-4">
      {Object.entries(Tabs).map(([key, val]) => (
        <KeycapButton
          className="w-full"
          key={val.label}
          onClick={() => navigate(`${PAGE.SEARCH}?scope=${key}`)}
        >
          {val.label} 검색
        </KeycapButton>
      ))}
    </div>
  );
}
