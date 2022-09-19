import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';

const SelectStageEmptyCard: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full border-dashed border-2 border-gray-100 rounded-md flex flex-col justify-center items-center p-6 min-h-[452px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-600 md:text-xl">
        You don't own any avatars
      </h5>
      <span className="text-base text-gray-400 font-semibold break-words mb-5">
        Select a different wallet or choose another avatar provider.
      </span>
      <Button onClick={onClick} className="px-3">
        Go back to overview
      </Button>
    </div>
  );
};

export default SelectStageEmptyCard;
