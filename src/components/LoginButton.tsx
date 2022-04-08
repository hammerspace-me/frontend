import { ethers } from 'ethers';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';

const LoginButton: FC = () => {
  const [store, setStore] = useStore();
  const { api } = useApi();
  const navigate = useNavigate();

  const alreadyLoggedIn = store.accessToken !== undefined;

  const handleLoginWithMetamask = async () => {
    /* eslint-disable */
    const _window = window as any;
    if (!_window.ethereum) throw new Error('No crypto wallet found. Please install it.');

    await _window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    /* eslint-enable */

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const nonce = await api.post('auth/request', {
      backpack: address
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

    navigate('/admin/backpack', { replace: true });
  };

  if (alreadyLoggedIn) {
    return <span>Logged in as {store.userAddress}</span>;
  }

  return (
    <Button variant="secondary" onClick={handleLoginWithMetamask}>
      Login with Metamask
    </Button>
  );
};

export default LoginButton;
