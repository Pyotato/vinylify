import { Link } from 'react-router-dom';

function RecommendationList({
  tracks,
}: Readonly<{
  tracks: SpotifyApi.TrackObjectFull[];
}>) {
  return (
    <div
      className={`inline-grid grid-cols-1 gap-x-4 mx-auto lg:grid-cols-2 w-full px-0 pt-0 gap-3 h-full`}
    >
      {tracks.map(track => (
        <Link
          to={track.href}
          key={track.id}
          className="inline-flex rounded-lg gap-2 h-full bg-(--grey-100) shadow-2xl"
        >
          <img
            className="rounded-tl-lg rounded-bl-lg aspect-auto"
            src={track.album.images.at(-1)?.url}
            alt={track.album.images.at(-1)?.url}
            width={track.album.images.at(-1)?.width ?? 60}
            height={track.album.images.at(-1)?.height}
          />
          <span className="p-1 inline-flex flex-col">
            <span>{track.name}</span>
            <span className="text-(--light-grey-300)">
              {track.artists.map(artist => artist.name).join(', ')}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default RecommendationList;
