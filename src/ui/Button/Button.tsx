import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
  name,
  'aria-label': ariaLabel,
}: {
  onClick: () => void;
  children: ReactNode;
  name?: string;
  'aria-label'?: string;
}) => {
  return (
    <button
      className={
        'border-none hover:cursor-pointer fill-(--color-white) hover:fill-(--grey-100) p-0 w-4 mr-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-white) rounded-sm'
      }
      name={name}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
