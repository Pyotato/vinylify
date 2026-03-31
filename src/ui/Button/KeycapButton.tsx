import { CSSProperties, ReactNode } from 'react';

const KeycapButton = ({
  onClick,
  children,
  style,
  className = '',
  name,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  disabled = false,
}: {
  onClick: () => void;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  name?: string;
  'aria-label'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${disabled ?? 'cursor-not-allowed'} bg-(--grey-500) h-8 shadow-(--shadow-button) text-(--color-white) border-none rounded-[0.2rem] hover:cursor-pointer hover:bg-(--light-grey-300) text-(length:--text-fluid-s) align-middle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-white) ${className}`}
      onClick={onClick}
      style={style}
      name={name}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default KeycapButton;
