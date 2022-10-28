import { FC } from 'react';
import { ethers } from 'ethers';
import { useStore } from '../../../store';
import { MetaMaskLogo } from '../../../assets/metamaskLogo';
import { PipelineStage } from '@metaverse-backpack/backpack-providers/dist/provider/pipeline';

interface Web3StageProps {
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
  resultCallback: (result: any) => void;
}

const Web3Stage: FC<Web3StageProps> = (props: Web3StageProps) => {
  const [store] = useStore();
  /* eslint-disable */
  const _window: any = window;
  /* eslint-enable */

  const handleMetamask = async () => {
    /* eslint-disable */
    await _window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    props.resultCallback([address]);
  };

  const handleMetamaskInstall = async () => {
    window.location.replace('https://metamask.io/download');
  };

  const handleBackpackAddress = async () => {
    const address = process.env.REACT_APP_CA_ADDRESS || store.userAddress;
    props.resultCallback([address]);
  };

  return (
    <div className="w-full h-full max-w-lg">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
        Login to {props.context.provider?.title}
      </h5>
      <p className="text-sm font-normal text-gray-500">
        Connect with one of our available wallet providers.
      </p>
      <ul className="my-4 space-y-3">
        <li>
          <button
            onClick={!_window.ethereum ? handleMetamaskInstall : handleMetamask}
            className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 hover:cursor-pointer group hover:shadow w-full justify-start">
            <MetaMaskLogo />
            <span className="ml-3 whitespace-nowrap">MetaMask</span>
          </button>
        </li>
        <li>
          <button
            onClick={handleBackpackAddress}
            className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 hover:cursor-pointer group hover:shadow w-full justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
              />
            </svg>
            <span className="ml-3 whitespace-nowrap">Continue with your HAMMERSPACE address</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Web3Stage;
