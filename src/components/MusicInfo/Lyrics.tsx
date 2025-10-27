import { useCurrentPlayingTrackLyrics } from '@/hooks/query/track/useCurrentPlayingTrackLyrics';
import { useMemo } from 'react';
import AnimatedTitle from '../../ui/AnimatedTitle';

function Lyrics({
  songTitle,
  artist,
}: Readonly<{ songTitle: string; artist: string }>) {
  const { isLoading, data, isFetched } = useCurrentPlayingTrackLyrics({
    songTitle,
    artist,
  });

  const skeletons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      key: `${i}-lyrics-skeleton`,
      length: (Math.random() * 40).toFixed(2) + 'rem',
    }));
  }, [isLoading, data]);

  return (
    <>
      <AnimatedTitle>Lyrics</AnimatedTitle>
      <section className="pb-3">
        <div className="bg-(--grey-300) max-h-[24vh] overflow-auto  p-4 w-full rounded-[4px] scrollbar-hide shadow-(--shadow-basic) whitespace-break-spaces">
          {data?.lyrics == null && isFetched && (
            <div className="py-18 text-center">가사가 없습니다.</div>
          )}
          {isLoading
            ? skeletons.map(({ key, length }, i) => (
                <div
                  key={key}
                  className={`animate-pulse h-4 mb-3 w-[${length}] bg-(--grey-100) mb-${i % 3 === 0 ? 6 : 3}`}
                />
              ))
            : data?.lyrics}
        </div>
      </section>
    </>
  );
}

export default Lyrics;
