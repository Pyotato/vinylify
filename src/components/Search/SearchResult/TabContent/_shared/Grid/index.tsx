import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import Card from '../Card';
import Style from './grid.module.scss';

const cx = classNames.bind(Style);

const Grid = ({ children }: { children: ReactNode }) => {
  return <ul className={cx('grid')}>{children}</ul>;
};

const GridSkeleton = () => (
  <Grid>
    {Array.from({ length: 20 }, (_, index) => (
      <Card.Skeleton key={index} />
    ))}
  </Grid>
);

Grid.Skeleton = GridSkeleton;

export default Grid;
