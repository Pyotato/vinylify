import { PLACEHOLDER_IMAGE, SKELETON_PROFILE } from '@/constants/image';
import { useMultipleArtistProfileLink } from '@/hooks/query/artist/useMultipleArtistProfileLink';
import { useToast } from '@/hooks/toasts/useToast';
import Profile from './Profile';

const MultipleArtistProfile = ({ artistId }: { artistId: string[] }) => {
  const { data, pending, error, isLoading, isSuccess, isError } =
    useMultipleArtistProfileLink({
      artistId,
    });

  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.name,
  });

  if (isError) {
    showToast();
  }

  if (pending || isLoading) {
    return (
      <div className="profiles-container group inline-flex justify-start">
        <Profile
          key={SKELETON_PROFILE.id}
          profile={{
            imgUrl: SKELETON_PROFILE.imgUrl,
          }}
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="profiles-container group inline-flex justify-start">
        <Profile
          key={PLACEHOLDER_IMAGE}
          profile={{
            imgUrl: PLACEHOLDER_IMAGE,
          }}
        />
      </div>
    );
  }
  if (isSuccess && data == null) {
    return null;
  }

  return (
    <div className="profiles-container group inline-flex ">
      {data?.slice(0, 4).map((profile, index) => (
        <Profile
          key={`${artistId.join('-')}-${profile?.id ?? SKELETON_PROFILE.id + '-' + index}`}
          profile={{
            externalUrl: profile?.external_urls?.spotify,
            imgUrl:
              profile?.id == null
                ? SKELETON_PROFILE.imgUrl
                : profile?.images?.[profile?.images?.length - 1]?.url,
          }}
        />
      ))}
      {data?.length < 4 ? null : (
        <span className="inline-flex justify-center pl-1 align-middle text-[length:2rem] animate-slide-ellipses translate-y-[-20%]">
          ...
        </span>
      )}
    </div>
  );
};

export default MultipleArtistProfile;
