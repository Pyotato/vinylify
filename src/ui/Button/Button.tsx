import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
  name,
}: {
  onClick: () => void;
  children: ReactNode;
  name?: string;
}) => {
  return (
    <button
      className={
        'border-none hover:cursor-pointer fill-(--color-white) hover:fill-(--grey-100) p-0 w-4 mr-1'
      }
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
