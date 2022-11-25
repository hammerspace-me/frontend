import { FC, useState } from 'react';
import IFrameStage from './stages/IFrameStage';
import ResultStage from './stages/ResultStage';
import TransformStage from './stages/TransformStage';
import Web3Stage from './stages/Web3Stage';
import SelectStage from './stages/SelectStage';
import OAuthStage from './stages/OAuthStage';
import { PipelineStage } from '@hammerspace-me/technology-providers-sdk/dist/provider/pipeline';
import providers from '@hammerspace-me/technology-providers-sdk';

interface PipelineManagerProps {
  provider: string;
}

const PipelineManager: FC<PipelineManagerProps> = (props: PipelineManagerProps) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const pipeline: PipelineStage[] = providers[props.provider].pipeline;
  const configuration = {
    gateway: process.env.REACT_APP_RPM_GATEWAY,
    apiKey: process.env.REACT_APP_CA_API_KEY,
    apiUrl: process.env.REACT_APP_CA_API_URL
  };

  const [aggregate, setAggregate] = useState<any>();
  const currentStage = pipeline[currentStageIndex];
  const context = {
    aggregate,
    provider: providers[props.provider],
    stage: currentStage,
    config: configuration
  };

  const onResult = (result: any) => {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };

    let resultAggregate = result;
    if (currentStage.type === 'web3' || currentStage.type === 'select') {
      if (currentStage.format) {
        resultAggregate = currentStage.format.call(context, result);
      }
    }

    setAggregate(resultAggregate);
    setCurrentStageIndex((s) => s + 1);
  };

  if (currentStage?.type === 'iframe') {
    const src = currentStage.src;
    const url: string = typeof src === 'function' ? src.call(context, '') : src;
    return <IFrameStage url={url} context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'web3') {
    return <Web3Stage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'select') {
    return <SelectStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'transform') {
    return <TransformStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'oauth') {
    return <OAuthStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'result') {
    return <ResultStage context={context} />;
  }

  return <>Unexpected stage</>;
};

export default PipelineManager;
