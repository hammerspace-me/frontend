import { FC, useEffect } from 'react';
import { ethers } from 'ethers';
import { useApi } from '../actions/api-factory';
import { Button, Row, Col } from 'react-bootstrap';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login: FC = () => {
  const [store, setStore] = useStore();
  const { api } = useApi();
  const navigate = useNavigate();
  const _window: any = window;

  const handleLogin = async () => {
    /* eslint-disable */
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
    navigate('/', { replace: true });
  };

  const handleInstall = async () => {
    window.location.replace('https://metamask.io/download');
  };

  return (
    <Row>
      <Col>
        <h1>Login using your wallet</h1>
        <p>Connect your account to login to Backpack.</p>
        <Button
          onClick={!_window.ethereum ? handleInstall : handleLogin}
          disabled={store.backpack ? true : false}>
          {!_window.ethereum ? 'Install Metamask' : 'Continue with Metamask'}
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
