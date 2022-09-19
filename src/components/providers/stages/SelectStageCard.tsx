import { SelectResponse } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline/select';
import { FC } from 'react';

interface SelectStageCardProps {
  item: any;
  stage: SelectResponse;
  onClick: (item: any) => void;
}

const SelectStageCard: FC<SelectStageCardProps> = (props: SelectStageCardProps) => {
  const imageUrl =
    typeof props.stage.image === 'function' ? props.stage.image(props.item) : props.stage.image;
  const title =
    typeof props.stage.name === 'function' ? props.stage.name(props.item) : props.stage.name;

  return (
    <div
      onClick={props.onClick}
      className="w-full bg-white border shadow-md p-6 transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none rounded-md hover:cursor-pointer">
      <img className="mt-4" alt="avatar" src={imageUrl}></img>
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">{title}</h5>
    </div>
  );
};

export default SelectStageCard;
