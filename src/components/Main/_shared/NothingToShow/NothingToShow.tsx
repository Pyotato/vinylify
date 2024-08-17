import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Style from './nothing-to-show.module.scss';

const cx = classNames.bind(Style);

interface NothingToShowProps {
  message: string;
  redirect?: { text: string; path: string };
}

export default function NothingToShow({
  message,
  redirect,
}: Readonly<NothingToShowProps>) {
  return (
    <div className={cx('content-body')}>
      <div className={cx('content-wrap')}>
        <span className={cx('message')}>{message}</span>
        {redirect?.path ? (
          <Link className={cx('link')} to={redirect.path}>
            {redirect.text}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
