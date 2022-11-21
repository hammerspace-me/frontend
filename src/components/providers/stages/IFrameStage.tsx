// TODO: Change to new package name
import { PipelineStage } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline';
import { IframeResponse } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline/iframe';
import { FC, useEffect, useState } from 'react';
import { getBaseUrl } from '../../../utils/baseUrl';

interface IFrameStageProps {
  url: string;
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
  resultCallback: (result: IframeResponse) => void;
}

const IFrameStage: FC<IFrameStageProps> = (props: IFrameStageProps) => {
  const [result, setResult] = useState<any>();

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    if (result) {
      props.resultCallback(result);
    }
  }, [result]);

  const receiveMessage = async (event: any) => {
    const baseUrl = getBaseUrl(props.url);
    if (event.origin !== baseUrl || !event.data) return;
    if (props.context.stage.type === 'iframe') {
      const iFrameResult: IframeResponse = await props.context.stage.messageHandler.call(
        props.context,
        event.data
      );
      if (!result) {
        setResult(iFrameResult);
      }
    }
  };

  return (
    <div className="w-full h-full">
      <iframe
        src={props.url}
        title="iframe-stage"
        allow="camera *; microphone *"
        className="w-full h-[800px] rounded-lg"></iframe>
    </div>
  );
};

export default IFrameStage;
