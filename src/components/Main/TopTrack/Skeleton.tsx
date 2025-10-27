import { LOADING_IMAGE } from '@/constants/image';
import CoverImage from '@/ui/CoverImage';
import { lazy } from 'react';

const PlayIcon = lazy(() => import('@/ui/Icons/Play'));

export default function Skeleton({ index }: Readonly<{ index: number }>) {
  return (
    <div className={`list-none w-[12rem] inline-flex flex-col gap-2 m-0 p-0`}>
      <CoverImage width={400} imgUrl={LOADING_IMAGE} />
      <div className="inline-flex gap-2 w-full align-middle">
        <span className="h-4">{index + 1}. </span>
        <span className="inline-block w-[75%] h-full animate-pulse bg-(--light-grey-300)"></span>
      </div>
      <div className="inline-flex gap-2 w-full align-middle">
        <PlayIcon />
        <span className="inline-block w-[55%] h-full animate-pulse bg-(--light-grey-300)"></span>
      </div>
    </div>
  );
}
