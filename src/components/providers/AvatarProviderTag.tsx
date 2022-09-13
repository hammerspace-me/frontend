import providers from '@bkpk/providers';
import { FC } from 'react';

interface AvatarProviderTagProps {
  provider: string;
}

const AvatarProviderTag: FC<AvatarProviderTagProps> = (props: AvatarProviderTagProps) => {
  return (
    <div className="w-full max-w-sm border-black border-2 h-12 rounded-lg mb-4 text-black text-xl font-semibold flex flex-row items-center">
      <img src={providers[props.provider].icon.toString()} className="m-4 h-8"></img>
      {providers[props.provider].title}
    </div>
  );
};

export default AvatarProviderTag;
