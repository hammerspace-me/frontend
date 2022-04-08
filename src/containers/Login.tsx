import { FC, useState } from 'react';
import { ethers } from 'ethers';
import { useApi } from '../actions/api-factory';
import { Button, Row, Col } from 'react-bootstrap';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login: FC = () => {
  const [loading, setLoading] = useState(false); // Loading button state
  const [store, setStore] = useStore();
  const { api } = useApi();
  let navigate = useNavigate();

  const handleClick = async () => {
    const _window = window as any;
    if (!_window.ethereum) throw new Error('No crypto wallet found. Please install it.');

    setLoading(true);
    await _window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const nonce = await api.post('auth/request', {
      backpack: address
    });

    console.log('Received nonce ' + nonce);

    const signature = await signer.signMessage(nonce.nonce);

    console.log('Signed nonce ' + signature);

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

    setLoading(false);
    navigate('/admin', { replace: true });
  };

  return (
    <Row>
      <Col>
        <h1>Login</h1>
        <Button onClick={handleClick} disabled={store.backpack ? true : false}>
          Login with Metamask
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
