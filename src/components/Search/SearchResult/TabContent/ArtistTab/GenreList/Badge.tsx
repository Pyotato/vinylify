import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import { useSearchParams } from 'react-router-dom';
import Style from './badge.module.scss';
export interface BadgeProps extends HtmlHTMLAttributes<HTMLLIElement> {
  badgeTag: string;
  badgeNumber: number;
}

const cx = classNames.bind(Style);

const Badge = ({ badgeTag, badgeNumber }: BadgeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refetch } = useSearchKeyword();

  const debouncedRequest = useDebounce(() => {
    if (badgeTag) {
      searchParams.set('keyword', badgeTag);
      setSearchParams(searchParams);
    }
    refetch();
  });

  return (
    <li className={cx('badge', `badge-${badgeNumber % 5}`)}>
      <button className={cx('badge-button')} onClick={debouncedRequest}>
        {badgeTag}
      </button>
    </li>
  );
};

export default Badge;
