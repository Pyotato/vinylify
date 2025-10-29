import { LOADING_IMAGE } from '@/constants/image';
import { useArtistProfileLink } from '@/hooks/query/artist/useArtistProfileLink';
import Profile from './Profile';

const SingleArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data, isSuccess, isLoading } = useArtistProfileLink({
    artistId,
  });

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
