import { FC } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import Cookies from 'universal-cookie';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const [store, setStore] = useStore();
  const navigate = useNavigate();

  const logout = () => {
    setStore((old) => ({
      ...old,
      accessToken: undefined,
      backpack: undefined
    }));
    const cookies = new Cookies();
    cookies.remove('access_token');
    cookies.remove('user_address');
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img alt="Backpack" src={Logo} width="30" className="d-inline-block align-top" /> Backpack
        </Navbar.Brand>
        {store.accessToken ? <Button onClick={logout}>Logout</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
