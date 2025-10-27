import { CSSProperties, ReactNode } from 'react';

const KeycapButton = ({
  onClick,
  children,
  style,
  className = '',
}: {
  onClick: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <button
      className={`bg-(--grey-500) h-8 shadow-(--shadow-button) text-(--color-white) border-none rounded-[0.2rem] hover:cursor-pointer hover:bg-(--light-grey-300) text-(length:--text-fluid-s) align-middle ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default KeycapButton;
