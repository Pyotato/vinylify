import { PAGE } from '@/constants/url';
import KeycapButton from '@/ui/Button/KeycapButton';
import { useNavigate } from 'react-router-dom';

function Empty() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(PAGE.SEARCH);
  };
  return (
    <div className="w-full h-full inline-flex flex-col justify-center text-center">
      추천 트랙이 없습니다. 🫤
      <KeycapButton
        onClick={handleNavigation}
        className="w-[20vw] align-middle justify-center self-center-safe mt-3"
      >
        검색하러가기
      </KeycapButton>
    </div>
  );
}

export default Empty;
