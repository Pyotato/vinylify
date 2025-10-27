import CoverImage from '@/ui/CoverImage';
import Grid from '@/ui/Grid';

function GridSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 20 }, (_, index) => (
        <li
          className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
          key={index + '-skeleton'}
        >
          <CoverImage.Skeleton />
          <ul>
            <li className="wrap">
              <span className={`inline-block w-full h-4 animate-pulse`} />
            </li>
            <span className={`inline-block w-full h-8  animate-pulse`} />
          </ul>
        </li>
      ))}
    </Grid>
  );
}

export default GridSkeleton;
