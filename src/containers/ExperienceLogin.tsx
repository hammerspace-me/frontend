import { FC, useMemo } from 'react';
import { ethers } from 'ethers';
import { useApi } from '../actions/api-factory';
import { Button, Row, Col } from 'react-bootstrap';
import { useStore } from '../store';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

// A custom hook that builds on useLocation to parse query strings
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ExperienceLogin: FC = () => {
  const [store, setStore] = useStore();
  const { api } = useApi();
  const query = useQuery();

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

    const redirectQuery = query.get('redirect');
    if (redirectQuery) {
      window.location.replace(redirectQuery);
    }
  };

  const handleInstall = async () => {
    window.location.replace('https://metamask.io/download');
  };

  if (!query.get('redirect')) {
    return (
      <Row>
        <Col>
          <h1>No redirection URL present</h1>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        <h1>Application "Meditation PoC" is requesting access to your Backpack</h1>
        <p>Login with Metamask to grant access.</p>
        <Button
          onClick={!_window.ethereum ? handleInstall : handleLogin}
          disabled={store.backpack ? true : false}>
          {!_window.ethereum ? 'Install Metamask' : 'Continue with Metamask'}
        </Button>
      </Col>
    </Row>
  );
};

export default ExperienceLogin;
