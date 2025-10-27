// import { LOADING_IMAGE } from '@/constants/image';

// export type MeasuredImageProps = {
//   src: string;
//   alt?: string;
//   className?: string;
//   loading?: 'lazy' | 'eager';
//   width?: number;
//   height?: number;
// };

// export const MeasuredImage = ({
//   src,
//   alt,
//   width,
//   height,
//   className = '',
//   ...props
// }: Readonly<MeasuredImageProps>) => {
//   if (src == LOADING_IMAGE) {
//     return (
//       <div
//         className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) `}
//       >
//         <div
//           className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500`}
//         />

//         <img
//           src={src}
//           width={width ?? 30}
//           height={height ?? 30}
//           alt={alt || src}
//           loading="eager"
//           className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 animate-pulse`}
//         />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) ${className}`}
//     >
//       <div
//         className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500
//         `}
//       />

//       <img
//         src={src}
//         alt={alt || src}
//         className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500
//   `}
//         {...props}
//       />
//     </div>
//   );
// };
