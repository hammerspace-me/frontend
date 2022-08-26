import { FC, useEffect, useState } from 'react';
import { useStore } from '../store';
import { useBackpackActions } from '../actions/backpackActions';
import { AvatarErrorBoundary } from './AvatarErrorBoundary';
import AvatarPreview from './AvatarPreview';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useModalActions } from '../actions/modalActions';
import { sourceMapping } from '../utils/sourceMapping';

const BackpackGrid: FC = () => {
  const [store] = useStore();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { showTechnologyProviderModal } = useModalActions();

  const errorHandler = (message: string) => {
    setError(message);
  };

  const { getBackpack } = useBackpackActions(errorHandler);

  const onCreate = async () => {
    showTechnologyProviderModal();
  };

  useEffect(() => {
    getBackpack();
  }, []);

  const navigateEdit = (id: string) => {
    navigate('/item/' + id);
  };

  if (error) {
    return (
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
        Something went wrong...
      </h5>
    );
  }

  if (!store.backpack) {
    return (
      <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
        Can not find Backpack
      </h5>
    );
  }

  if (store.backpack && store.backpack.backpackItems.length < 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <EmptyCard onClick={onCreate}></EmptyCard>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <Button onClick={onCreate} className="px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Backpack item
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {store.backpack?.backpackItems.map((item) => (
          <div
            key={item.content}
            className="w-full bg-white border shadow-md p-6 transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 hover:cursor-pointer focus:shadow-large focus:outline-none rounded-md"
            onClick={() => navigateEdit(item.id)}>
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
            <AvatarErrorBoundary>
              <AvatarPreview avatarUri={process.env.REACT_APP_IPFS_GATEWAY + item.content} />
            </AvatarErrorBoundary>
            <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
              {sourceMapping[item.source]}
            </h5>
            <span className="text-base text-gray-600 font-semibold break-words">
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default BackpackGrid;

interface EmptyCardProps {
  onClick: () => void;
}

const EmptyCard: FC<EmptyCardProps> = (props: EmptyCardProps) => {
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
        No Backpack items
      </h5>
      <span className="text-base text-gray-400 font-semibold break-words mb-5">
        Get started by creating your first Backpack item.
      </span>
      <Button onClick={props.onClick} className="px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Backpack item
      </Button>
    </div>
  );
};
