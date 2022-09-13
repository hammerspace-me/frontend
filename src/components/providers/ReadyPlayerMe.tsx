import { FC } from 'react';
import PipelineManager from './PipelineManager';
import AvatarProviderTag from './AvatarProviderTag';

const ReadyPlayerMe: FC = () => {
  return (
    <>
      <AvatarProviderTag provider="ready-player-me"></AvatarProviderTag>
      <PipelineManager provider="ready-player-me"></PipelineManager>
    </>
  );
};

export default ReadyPlayerMe;
