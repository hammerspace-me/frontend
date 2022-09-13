import { FC } from 'react';
import { useModalActions } from '../actions/modalActions';

interface TechnologyProviderCardProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const TechnologyProviderCard: FC<TechnologyProviderCardProps> = (
  props: TechnologyProviderCardProps
) => {
  const { hideTechnologyProviderModal } = useModalActions();

  const onClick = () => {
    hideTechnologyProviderModal();
    props.onClick();
  };

  return (
    <div
      key={props.title}
      onClick={onClick}
      className="w-full bg-white border shadow-md p-6 transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none rounded-md hover:cursor-pointer">
      <span className="inline-flex items-center m-2 px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="ml-1">Avatars</span>
      </span>
      <img className="w-60 max-h-24 mt-4" alt="logo" src={props.image}></img>
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">{props.title}</h5>
      <span className="text-base text-gray-600 font-semibold break-words">{props.description}</span>
    </div>
  );
};

export default TechnologyProviderCard;
