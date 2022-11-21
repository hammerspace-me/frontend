import { FC } from 'react';
import SelectStageEmptyCard from './SelectStageEmptyCard';
import SelectStageCard from './SelectStageCard';
// TODO: Change to new package name
import { PipelineStage } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline';
import { SelectResponse } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline/select';

interface SelectStageProps {
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
  resultCallback: (result: SelectResponse) => void;
}

const SelectStage: FC<SelectStageProps> = (props: SelectStageProps) => {
  const onClick = (item: any) => {
    props.resultCallback(item);
  };

  if (props.context.aggregate.length === 0) {
    return (
      <div className="w-full">
        <SelectStageEmptyCard />
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 mb-3 font-semibold text-gray-900 text-xl">
        Select the avatar you would like to add to your HAMMERSPACE
      </div>
      <div className="w-full grid gap-4 grid-cols-4">
        {props.context.aggregate.map((ag: any) => {
          return (
            <SelectStageCard
              key={ag['_id']}
              stage={props.context.stage as SelectResponse}
              item={ag}
              onClick={() => onClick(ag)}
            />
          );
        })}
      </div>
    </>
  );
};

export default SelectStage;
