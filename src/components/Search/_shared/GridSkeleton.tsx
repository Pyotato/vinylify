import CoverImageSkeleton from '@/ui/CoverImage/Skeleton';
import Grid from '@/ui/Grid';

function GridSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 20 }, (_, index) => (
        <li
          className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
          key={index + '-skeleton'}
        >
          <CoverImageSkeleton />
          <span
            className={`inline-block w-16 h-4 animate-pulse bg-(--grey-600)`}
          />
          <span
            className={`inline-block w-full h-8 bg-(--grey-600) animate-pulse`}
          />
        </li>
      ))}
    </Grid>
  );
}

export default GridSkeleton;
