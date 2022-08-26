import { FC, ReactNode } from 'react';

interface CardWithLogoProps {
  children?: ReactNode;
}

const CardWithLogo: FC<CardWithLogoProps> = (props: CardWithLogoProps) => {
  return (
    <div className="p-4 w-full max-w-lg bg-white rounded-lg border shadow-md sm:p-6">
      <h5 className="self-center text-2xl font-semibold whitespace-nowrap mb-4">BKPK.io</h5>
      {props.children}
    </div>
  );
};

export default CardWithLogo;
