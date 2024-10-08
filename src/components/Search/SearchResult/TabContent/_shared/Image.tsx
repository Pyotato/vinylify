import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import '@/utils/style/skeleton.scss';
import classNames from 'classnames';
import { Suspense } from 'react';

export default function Image({ url }: { url?: string }) {
  return (
    <Suspense
      fallback={
        <img alt={url} src={LOADING_IMAGE} className={classNames('skeleton')} />
      }
    >
      <img
        src={url ?? PLACEHOLDER_IMAGE}
        loading="lazy"
        alt={PLACEHOLDER_IMAGE}
      />
    </Suspense>
  );
}
