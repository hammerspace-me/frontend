import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={
        'bg-black text-white relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13 ' +
        props.className
      }>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false
};

export default Button;
