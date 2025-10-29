import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { MeasuredImage } from '@/ui/CoverImage/MeasuredImage';
import { DetailedHTMLProps, lazy } from 'react';
import { Link } from 'react-router-dom';

const SpotifyIcon = lazy(() => import('@/ui/Icons/Spotify'));
export interface ImgUrlProps
  extends DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imgUrl?: string;
  url?: string;
}

const CoverImage = ({ imgUrl, url }: ImgUrlProps) => {
  return (
    <Link
      to={url ?? '#'}
      className="relative inline-block w-full"
      aria-disabled={url == null}
    >
      <MeasuredImage src={imgUrl ?? PLACEHOLDER_IMAGE} alt={imgUrl} />
      <span className="absolute bottom-1 right-1 inline-block text-(length:--text-fluid-s)">
        <SpotifyIcon />
      </span>
    </Link>
  );
};

export default CoverImage;
