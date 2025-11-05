import { useMyTopArtists } from '@/hooks/query/artist/useMyTopArtists';
import { ArtistObjectFull } from '@/models/Artist';
import { PagingObject } from '@/models/PagingObject';
import { VARIANTS } from '@/ui/Badge';
import { lazy } from 'react';
import Skeleton from './Skeleton';

const Card = lazy(() => import('@/ui/Card'));
const Grid = lazy(() => import('@/ui/Grid'));
const Badge = lazy(() => import('@/ui/Badge'));

interface UsersTopArtistsResponse extends PagingObject<ArtistObjectFull> {}

function SearchReccomendations() {
  const { data: myTopArtists, isFetched, isLoading } = useMyTopArtists();
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    isFetched && (
      <Grid className="mb-9">
        {(myTopArtists as UsersTopArtistsResponse)?.items.map(item => (
          <Card
            tab={item.type ?? 'general'}
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
        ))}
      </Grid>
    )
  );
}

export default SearchReccomendations;
