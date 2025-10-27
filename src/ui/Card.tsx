import { PLACEHOLDER_IMAGE } from '@/constants/image';
import CoverImage from '@/ui/CoverImage';
import { CSSProperties, HtmlHTMLAttributes, lazy, RefObject } from 'react';
import { InView } from 'react-intersection-observer';

const DEFAULT_IMAGE_SIZE = 400;

const Player = lazy(() => import('./Player'));

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  title?: string;
  titleTag?: string | null;
  coverImage?: string;
  isPlayable?: boolean;
  contextUri: string;
  externalUrls?: string;
  id?: string;
  imgWidth?: number | null;
  imgHeight?: number | null;
  offset?: { uri: string } | { position: number };
}

const Card = ({
  titleTag,
  variant = 'white',
  children,
  refs,
  title,
  isPlayable,
  offset,
  coverImage,
  contextUri,
  externalUrls,
  cardStyle,
  id,
  className = '',
  imgWidth = DEFAULT_IMAGE_SIZE,
  imgHeight = DEFAULT_IMAGE_SIZE,
}: CardProps & {
  cardStyle?: CSSProperties;
  variant?: 'white' | 'grey';
  refs?: RefObject<HTMLUListElement | null>;
}) => {
  return (
    <ul
      ref={refs}
      className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0 ${className}`}
      style={cardStyle}
    >
      <li>
        <CoverImage
          imgUrl={coverImage ?? PLACEHOLDER_IMAGE}
          url={externalUrls}
          id={id}
          height={imgHeight ?? DEFAULT_IMAGE_SIZE}
          width={imgWidth ?? DEFAULT_IMAGE_SIZE}
        />
      </li>
      <li>
        <span className={`text-(length:--text-fluid-m) break-all`}>
          {title}
        </span>
      </li>

      <li className={`inline-flex align-middle gap-1`}>
        {isPlayable ? (
          <InView>
            {({ inView, ref }) => (
              <span
                ref={ref}
                className="inline-flex align-middle justify-center"
              >
                <Player
                  variant={variant}
                  id={id}
                  offset={offset}
                  contextUri={contextUri}
                  enabled={inView}
                />
              </span>
            )}
          </InView>
        ) : null}
        <span className={`inline-block text-(--light-grey-500)`}>
          {titleTag}
        </span>
      </li>

      {children}
    </ul>
  );
};

export default Card;
