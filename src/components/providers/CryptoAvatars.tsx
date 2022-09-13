import { FC } from 'react';
import PipelineManager from './PipelineManager';
import AvatarProviderTag from './AvatarProviderTag';

const CryptoAvatars: FC = () => {
  return (
    <>
      <AvatarProviderTag provider="crypto-avatars"></AvatarProviderTag>
      <PipelineManager provider="crypto-avatars"></PipelineManager>
    </>
  );
};

export default CryptoAvatars;
