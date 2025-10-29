import { PAGE } from '@/constants/url';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const BaseLayout = lazy(() => import('@/layout/BaseLayout'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const MusicInfoPage = lazy(() => import('@/pages/MusicInfoPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const ProtectedRoute = lazy(() => import('@/layout/ProtectedLayout'));

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PAGE.MAIN,
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: PAGE.LOGGED_IN,
            element: <MainPage />,
            children: [{ path: PAGE.LOGGED_IN, element: <MainPage /> }],
          },
          {
            path: PAGE.MUSIC_INFO,
            element: <MusicInfoPage />,
          },
          {
            path: PAGE.SEARCH,
            element: <SearchPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
