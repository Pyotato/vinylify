import { LOADING_IMAGE } from '@/constants/image';
import { Track } from '@/models/Track';

type NewTrack = Track & { new: boolean };

const PlayQueue = ({ queue }: { queue?: NewTrack[] | Track[] }) => {
  if (!queue) {
    return null;
  }

  return (
    <div className="w-full font-jua py-2">
      <span className="font-bold mb-1">재생목록</span>
      <div className="overflow-scroll h-52 scrollbar-hide p-3">
        <div
          className={`inline-flex flex-col gap-x-4 mx-auto w-full px-0 pt-0 gap-3 h-full`}
        >
          {queue?.map((item, index) => (
            <div
              key={item.id + '-' + index}
              className={`inline-flex rounded-lg gap-2 h-full bg-(--grey-100) shadow-2xl`}
            >
              <img
                className="rounded-tl-lg rounded-bl-lg aspect-auto w-12"
                src={item?.album?.images?.at(-1)?.url ?? LOADING_IMAGE}
                alt={item?.album?.images?.at(-1)?.url ?? LOADING_IMAGE}
                width={item?.album?.images?.at(-1)?.width ?? 60}
                height={item?.album?.images?.at(-1)?.height ?? 60}
              />
              <span className="p-1 inline-flex flex-col">
                <span className="text-sm text-(--light-grey-200)">
                  {item.name}
                </span>
                <span className="text-(--light-grey-300) text-xs">
                  {item.artists.map(artist => artist.name).join(', ')}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PlayQueue.factoryId = `player-list`;
export default PlayQueue;
