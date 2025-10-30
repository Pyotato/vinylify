import { LOADING_IMAGE } from '@/constants/image';
import { useArtistProfileLink } from '@/hooks/query/artist/useArtistProfileLink';
import { useToast } from '@/hooks/toasts/useToast';
import Profile from './Profile';

const SingleArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data, isSuccess, isLoading, isError, error } = useArtistProfileLink({
    artistId,
  });

  const { showToast } = useToast({
    isError,
    msg: error?.message,
    toastId: error?.message,
  });

  if (isError) {
    showToast();
    return null;
  }

  if (isLoading) {
    return <Profile profile={{ imgUrl: LOADING_IMAGE }} />;
  }
  if (isSuccess && data == null) {
    return null;
  }

  return (
    <div>
      <Profile
        profile={{
          externalUrl: data?.external_urls?.spotify,
          imgUrl: data?.images?.[data?.images?.length - 1]?.url,
        }}
      />
    </div>
  );
};

export default SingleArtistProfile;
