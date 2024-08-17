import { LOADING_IMAGE } from '@/constants/image';
import { ExternalUrls } from '@/models/MetaInfo';
import { Artist } from '@/models/Profile';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../Image';
import Style from './ellipses.module.scss';

const cx = classNames.bind(Style);

export interface ProfileInfo {
  img: string;
  key?: string;
  link?: Artist['external_urls'];
}

const ProfileSkeleton = () => {
  return (
    <div className={cx('profile-container')}>
      <div className={cx('single')} data-collaborators="2">
        <Link className={cx('account-photo', 'skeleton')} to={'#'}>
          <div className={cx('mask')}>
            <img className={cx('photo')} src={LOADING_IMAGE} alt="loading" />
          </div>
        </Link>
      </div>
    </div>
  );
};

const Profile = ({ profile }: { profile: ProfileInfo }) => {
  const link = (profile?.link ?? '#') as unknown as ExternalUrls['spotify'];

  return (
    <div className={cx('profile')}>
      <Link
        className={cx('account-photo')}
        to={link}
        aria-disabled={profile?.link == null}
      >
        <div className={cx('mask')}>
          <Image url={profile.img} classNameArr={[]} />
        </div>
      </Link>
    </div>
  );
};

Profile.Skeleton = ProfileSkeleton;

export default Profile;
