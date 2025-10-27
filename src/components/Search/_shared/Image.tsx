import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { Suspense } from 'react';

const DEFAULT_SIZE = 42;

export default function Image({
  url,
}: Readonly<{
  url?: string;
}>) {
  return (
    <Suspense fallback={<img alt={url} src={LOADING_IMAGE} />}>
      <img
        src={url ?? PLACEHOLDER_IMAGE}
        loading="lazy"
        key={url}
        width={DEFAULT_SIZE}
        height={DEFAULT_SIZE}
        alt={PLACEHOLDER_IMAGE}
      />
    </Suspense>
  );
}
