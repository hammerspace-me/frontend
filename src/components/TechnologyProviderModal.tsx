import { FC } from 'react';
import { useModalActions } from '../actions/modalActions';
import { useStore } from '../store';
import TechnologyProviderList from './TechnologyProviderList';
import { useNavigate } from 'react-router-dom';
import providers from '@hammerspace-me/technology-providers-sdk';

export interface TechnologyProvider {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const TechnologyProviderModal: FC = () => {
  const [store] = useStore();
  const { hideTechnologyProviderModal } = useModalActions();
  const navigate = useNavigate();

  const technologyProviders: TechnologyProvider[] = [
    {
      title: providers['ready-player-me'].title,
      description: providers['ready-player-me'].description,
      onClick: () => {
        navigate('/readyplayerme');
      },
      image: providers['ready-player-me'].icon.toString()
    },
    {
      title: providers['crypto-avatars'].title,
      description: providers['crypto-avatars'].description,
      onClick: () => {
        navigate('/cryptoavatars');
      },
      image: providers['crypto-avatars'].icon.toString()
    },
    {
      title: providers['meebits'].title,
      description: providers['meebits'].description,
      onClick: () => {
        navigate('/meebits');
      },
      image: providers['meebits'].icon.toString()
    }
  ];

  const hiddenClass = store.technologyProviderModal ? '' : ' hidden';

  return (
    <div
      id="technology-provider-modal"
      className={
        'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full bg-black bg-opacity-50' +
        hiddenClass
      }>
      <div className="flex justify-center items-center mx-auto p-4 w-full max-w-4xl h-full">
        <div className="relative bg-white rounded-lg shadow-lg pb-8">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-white bg-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center tracking-wider outline-none transition-all sm:text-sm hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none"
            onClick={hideTechnologyProviderModal}>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-4 px-6 rounded-t border-b">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">Add Backpack Item</h3>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500">
              Add a new item by using one of our technology providers or add it manually to your
              Hammerspace.
            </p>
          </div>
          <TechnologyProviderList providers={technologyProviders} />
        </div>
      </div>
    </div>
  );
};

export default TechnologyProviderModal;
