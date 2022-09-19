import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  className?: string;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button
      onClick={props.onClick ? onClick : undefined}
      disabled={props.disabled}
      className={
        'text-white relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13 ' +
        props.className +
        ' ' +
        props.backgroundColor
      }>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  backgroundColor: 'bg-black'
};

export default Button;
