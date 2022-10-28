import { FC } from 'react';
import { ethers } from 'ethers';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CardWithLogo from '../components/CardWithLogo';
import { MetaMaskLogo } from '../assets/metamaskLogo';

interface LocationState {
  from: {
    pathname: string;
  };
}

const styles = {
  fullContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Login: FC = () => {
  const [, setStore] = useStore();
  const { api } = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  /* eslint-disable */
  const _window: any = window;
  /* eslint-enable */

  const handleLogin = async () => {
    /* eslint-disable */
    await _window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    /* eslint-enable */

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const nonce = await api.post('auth/request', {
      owner: address
    });
    const signature = await signer.signMessage(nonce.nonce);

    setStore((old) => ({
      ...old,
      api: { ...old.api, writing: true }
    }));
    const login = await api.post('auth/login', {
      address: address,
      signature: signature
    });

    const cookies = new Cookies();
    cookies.set('access_token', login.accessToken);
    cookies.set('user_address', address);
    setStore((old) => ({
      ...old,
      accessToken: login.accessToken,
      userAddress: address
    }));

    const { from } = (location.state as LocationState) || { from: { pathname: '/' } };

    navigate(from, { replace: true });
  };

  const handleInstall = async () => {
    window.location.replace('https://metamask.io/download');
  };

  return (
    <div style={styles.fullContainer}>
      <CardWithLogo>
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
          Login using your wallet
        </h5>
        <p className="text-sm font-normal text-gray-500">
          Connect with one of our available wallet providers to login to HAMMERSPACE.
        </p>
        <ul className="my-4 space-y-3">
          <li>
            <button
              onClick={!_window.ethereum ? handleInstall : handleLogin}
              className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 hover:cursor-pointer group hover:shadow w-full justify-start">
              <MetaMaskLogo />
              <span className="ml-3 whitespace-nowrap">MetaMask</span>
            </button>
          </li>
        </ul>
        <div>
          <button className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline">
            <svg
              className="mr-2 w-3 h-3"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="question-circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path>
            </svg>
            Why do I need to connect with my wallet?
          </button>
        </div>
      </CardWithLogo>
    </div>
  );
};

export default Login;
