import { LOADING_IMAGE } from '@/constants/image';
import classNames from 'classnames/bind';
import Style from './multi-profile.module.scss';
import Profile, { ProfileInfo } from './Profile';
import ProfileGroup from './ProfileGroup';

const cx = classNames.bind(Style);

const MultiProfile = ({ artist }: { artist: Omit<ProfileInfo, 'link'>[] }) => {
  if (artist?.length === 0) return null;
  return (
    <div className={cx('profile-container')}>
      <div className={cx('profiles-container')} data-collaborators="2">
        {artist == null ? (
          <Profile profile={{ img: LOADING_IMAGE }} />
        ) : (
          <ProfileGroup profile={artist} />
        )}
      </div>
    </div>
  );
};

export default MultiProfile;
