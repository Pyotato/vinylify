import { lazy } from 'react';

const Main = lazy(() => import('@/components/Main/Main'));

export default function MainPage() {
  return <Main />;
}
