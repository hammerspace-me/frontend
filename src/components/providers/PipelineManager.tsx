import { FC, useState } from 'react';
import providers from '@bkpk/providers';
import { PipelineStage } from '@bkpk/providers/dist/provider/pipeline';
import IFrameStage from './stages/IFrameStage';
import ResultStage from './stages/ResultStage';
import TransformStage from './stages/TransformStage';
import Web3Stage from './stages/Web3Stage';
import SelectStage from './stages/SelectStage';
import OAuthStage from './stages/OAuthStage';

interface PipelineManagerProps {
  provider: string;
}

const PipelineManager: FC<PipelineManagerProps> = (props: PipelineManagerProps) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const pipeline: PipelineStage[] = providers[props.provider].pipeline;
  const configuration = {
    gateway: 'mona',
    apiKey: '$2b$10$SvGFHweLgxISQD83yq0wLuaRUflTSu6vflUPssOlxih4EblIelYTK',
    apiUrl: 'https://api.cryptoavatars.io/v1'
  };

  const [aggregate, setAggregate] = useState<any>();
  const currentStage = pipeline[currentStageIndex];

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
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    const src = currentStage.src;
    const url: string = typeof src === 'function' ? src.call(context, '') : src;
    return <IFrameStage url={url} context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'web3') {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    return <Web3Stage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'select') {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    return <SelectStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'transform') {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    return <TransformStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'oauth') {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    return <OAuthStage context={context} resultCallback={onResult} />;
  }

  if (currentStage?.type === 'result') {
    const context = {
      aggregate,
      provider: providers[props.provider],
      stage: currentStage,
      config: configuration
    };
    return <ResultStage context={context} />;
  }

  return <>Unexpected stage</>;
};

export default PipelineManager;
