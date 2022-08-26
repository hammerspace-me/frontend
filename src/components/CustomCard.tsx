import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalActions } from '../actions/modalActions';

const CustomCard: FC = () => {
  const navigate = useNavigate();
  const { hideTechnologyProviderModal } = useModalActions();

  const onClick = () => {
    hideTechnologyProviderModal();
    navigate('/item');
  };

  return (
    <div
      onClick={onClick}
      className="w-full bg-white border shadow-md p-6 transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none rounded-md hover:cursor-pointer">
      <span className="inline-flex items-center m-2 px-3 py-1 bg-indigo-200 rounded-full text-sm font-semibold text-gray-600">
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span className="ml-1">Any</span>
      </span>
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
        Custom Backpack item
      </h5>
      <span className="text-base text-gray-600 font-semibold break-words">
        Add a custom Backpack item of any kind to your Backpack.
      </span>
    </div>
  );
};

export default CustomCard;
