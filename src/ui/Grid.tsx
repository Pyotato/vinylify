import CoverImageSkeleton from './CoverImage/Skeleton';

const Grid = ({
  children,
  style,
  className,
  ...args
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      className={`inline-grid pt-4
      grid-cols-1
      gap-x-4 px-4 mx-auto
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      w-full ${className}`}
      style={style}
      {...args}
    >
      {children}
    </ul>
  );
};

const GridSkeleton = () => (
  <Grid>
    {Array.from({ length: 20 }, (_, index) => (
      <li
        className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}
        key={index + '-skeleton'}
      >
        <CoverImageSkeleton />
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

Grid.Skeleton = GridSkeleton;

export default Grid;
