import { LOADING_IMAGE } from '@/constants/image';
import Badge, { VARIANTS } from '@/ui/Badge';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';

const SkeletonItem = ({ index }: { index: number }) => {
  return (
    <Card
      tab={'skeleton-' + index}
      variant="grey"
      className="bg-(--light-grey-200) rounded-[4px] p-4 mb-4 m-1 shadow-(--shadow-basic)"
      titleTag={`loading...`}
      key={'search-skeleton-' + index}
      title={`loading...`}
      contextUri={''}
      coverImage={LOADING_IMAGE}
    >
      <div className="inline-flex gap-4 pb-4">
        <Badge
          disabled={true}
          className="w-fit"
          variant={
            Object.keys(VARIANTS)[
              index % Object.keys(VARIANTS).length
            ] as keyof typeof VARIANTS
          }
        >
          loading...
        </Badge>
      </div>
    </Card>
  );
};
function Skeleton() {
  return (
    <Grid className="mb-9">
      {Array.from({ length: 24 }, (_, i) => (
        <SkeletonItem index={i} key={'search-skeleton-' + i} />
      ))}
    </Grid>
  );
}

export default Skeleton;
