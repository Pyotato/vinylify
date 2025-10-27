import { Image } from '@/models/MetaInfo';
import { memo } from 'react';
import Album from './Album';
import Cover from './Cover';
import FixedWrap from './FixedWrap';
import Print from './Print';
import VinylBody from './VinylBody';

export default function Vinyl({
  imgUrl,
  loading,
}: Readonly<{ imgUrl: Image['url']; loading?: 'eager' | 'lazy' }>) {
  return (
    <FixedWrap>
      <Album>
        <Cover imgUrl={imgUrl} loading={loading} />
        <VinylBody imgUrl={imgUrl}>
          <Print />
        </VinylBody>
      </Album>
    </FixedWrap>
  );
}

export const MemoizedVinyl = memo(Vinyl);
