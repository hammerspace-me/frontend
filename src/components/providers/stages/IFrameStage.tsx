import { FC, useEffect } from 'react';
import { PipelineStage } from '@bkpk/providers/dist/provider/pipeline';
import { IframeResponse } from '@bkpk/providers/dist/provider/pipeline/iframe';
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
  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  const receiveMessage = async (event: any) => {
    const baseUrl = getBaseUrl(props.url);
    if (event.origin !== baseUrl || !event.data) return;
    if (props.context.stage.type === 'iframe') {
      const result: IframeResponse = await props.context.stage.messageHandler.call(
        props.context,
        event.data
      );
      props.resultCallback(result);
    }
  };

  return (
    <div className="w-full h-full">
      <iframe
        src={props.url}
        allow="camera *; microphone *"
        className="w-full h-[800px] rounded-lg"></iframe>
    </div>
  );
};

export default IFrameStage;
