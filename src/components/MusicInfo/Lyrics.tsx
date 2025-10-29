import { useCurrentPlayingTrackLyrics } from '@/hooks/query/track/useCurrentPlayingTrackLyrics';
import { ReactNode, Suspense, useMemo } from 'react';
import AnimatedTitle from '../../ui/AnimatedTitle';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-(--grey-300) max-h-[24vh] overflow-auto  p-4 w-full rounded-[4px] scrollbar-hide shadow-(--shadow-basic) whitespace-break-spaces leading-[2.2rem]">
      {children}
    </div>
  );
};

const Loading = () => {
  const skeletons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      key: `${i}-lyrics-skeleton`,
      length: (30 + Number((Math.random() * 40).toFixed(2))).toFixed(2) + '%',
    }));
  }, []);

  return (
    <Container>
      {skeletons.map(({ key, length }, i) => (
        <div
          style={{
            width: length,
            marginBottom: (i % 3 === 0 ? 1.5 : 2.2) + 'rem',
          }}
          key={key}
          className={`animate-pulse h-4 mb-3  bg-(--grey-100)`}
        />
      ))}
    </Container>
  );
};

function Lyrics({
  songTitle,
  artist,
}: Readonly<{ songTitle: string; artist: string }>) {
  const { isLoading, data, isFetched } = useCurrentPlayingTrackLyrics({
    songTitle,
    artist,
  });

  if (isLoading) {
    return (
      <>
        <AnimatedTitle>Lyrics</AnimatedTitle>
        <section className="pb-3">
          <Loading />
        </section>
      </>
    );
  }

  return (
    <>
      <AnimatedTitle>Lyrics</AnimatedTitle>
      <section className="pb-3">
        <Suspense fallback={<Loading />}>
          <Container>
            {data?.lyrics == null && isFetched ? (
              <div className="py-18 text-center">가사가 없습니다.</div>
            ) : (
              data?.lyrics
            )}
          </Container>
        </Suspense>
      </section>
    </>
  );
}

export default Lyrics;
