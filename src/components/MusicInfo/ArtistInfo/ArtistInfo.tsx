import AnimatedTitle from '@/ui/AnimatedTitle';
import { ReactNode } from 'react';

export default function ArtistInfo({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AnimatedTitle>Artists</AnimatedTitle>
      <ul className={'p-0 mb-10'}>{children}</ul>
    </>
  );
}
