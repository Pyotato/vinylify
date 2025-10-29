import { useMyTopArtists } from '@/hooks/query/artist/useMyTopArtists';
import { VARIANTS } from '@/ui/Badge';
import { lazy } from 'react';

const Card = lazy(() => import('@/ui/Card'));
const Grid = lazy(() => import('@/ui/Grid'));
const Badge = lazy(() => import('@/ui/Badge'));

function SearchReccomendations() {
  const { data: myTopArtists, isFetched } = useMyTopArtists();
  return (
    isFetched && (
      <Grid className="mb-9">
        {(myTopArtists as SpotifyApi.UsersTopArtistsResponse)?.items.map(
          item => (
            <Card
              tab={item.type}
              variant="grey"
              className="bg-(--light-grey-200) rounded-[4px] p-4 mb-4 m-1 shadow-(--shadow-basic)"
              titleTag={`팔로워 : ${item?.followers.total}`}
              key={item.id}
              contextUri={item.uri}
              title={item.name}
              coverImage={item.images[0]?.url}
            >
              <div className="inline-flex gap-4 pb-4">
                {item.genres.map((genre, index) => (
                  <Badge
                    disabled={true}
                    key={genre}
                    className="w-fit"
                    variant={
                      Object.keys(VARIANTS)[
                        index % Object.keys(VARIANTS).length
                      ] as keyof typeof VARIANTS
                    }
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </Card>
          ),
        )}
      </Grid>
    )
  );
}

export default SearchReccomendations;
