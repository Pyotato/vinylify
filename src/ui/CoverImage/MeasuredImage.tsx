import { memo, useState } from 'react';

export type MeasuredImageProps = {
  src: string;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
};

export const MeasuredImageBase = ({
  src,
  alt,
  className = '',
  loading,
  width,
  height,
  ...props
}: Readonly<MeasuredImageProps>) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) ${className}`}
    >
      <div
        className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500
        `}
      />
      <img
        width={width ?? 400}
        height={height ?? 400}
        src={src}
        alt={alt || src}
        loading={loading}
        onLoad={handleLoad}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500
          `}
        {...props}
      />
    </div>
  );
};

const MeasuredImage = memo(MeasuredImageBase);
export default MeasuredImage;
