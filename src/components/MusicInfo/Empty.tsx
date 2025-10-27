import { useMyTopArtists } from '@/hooks/query/artist/useMyTopArtists';
import Badge, { VARIANTS } from '@/ui/Badge';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import { FullBackground } from '@/ui/Layout';
import NavigateSearch from './_shared/NavigateSearch';

function Empty() {
  const { data: myTopArtists, isFetched } = useMyTopArtists();
  return (
    <FullBackground className="p-8">
      <h1 className="text-(length:--text-fluid-lg) text-(--light-grey-100)">
        재생중인 음악이 없네요 😑
      </h1>
      <h2 className="text-(length:--text-fluid-md) text-(--light-grey-300)">
        최근에 들은 아티스트들이에요. 듣고 싶은 노래를 검색해 보세요!
      </h2>
      <NavigateSearch />

      <div className="w-full h-[80vh] overflow-scroll scrollbar-hide">
        {isFetched && (
          <Grid className="mb-9">
            {(myTopArtists as SpotifyApi.UsersTopArtistsResponse)?.items.map(
              item => (
                <Card
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
        )}
      </div>
    </FullBackground>
  );
}

export default Empty;
