import { FC } from 'react';
import PipelineManager from './PipelineManager';
import AvatarProviderTag from './AvatarProviderTag';

const Meebits: FC = () => {
  return (
    <>
      <AvatarProviderTag provider="meebits"></AvatarProviderTag>
      <PipelineManager provider="meebits"></PipelineManager>
    </>
  );
};

export default Meebits;
