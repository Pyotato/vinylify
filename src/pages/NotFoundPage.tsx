import { PAGE } from '@/constants/url';
import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundIcon = lazy(() => import('@/ui/Icons/NotFound'));
const KeycapButton = lazy(() => import('@/ui/Button/KeycapButton'));

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-(--grey-300) inline-flex justify-center align-middle">
      <div className="md:w-[60%] h-full inline-flex flex-col text-center justify-center align-middle">
        <h1 className="text-6xl font-bold text-(--color-white)">404</h1>
        <NotFoundIcon className="text-(--grey-600) mx-auto w-[30rem] h-[10rem]" />

        <p className="text-(--color-white)">이런! 페이지가 없네요!</p>

        <KeycapButton
          className="bg-(--grey-600) mx-auto my-4 w-[30%]"
          onClick={() => navigate(PAGE.MAIN)}
        >
          홈으로
        </KeycapButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
