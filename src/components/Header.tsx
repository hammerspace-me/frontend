import { FC } from 'react';
import Button from './Button';
import Cookies from 'universal-cookie';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const [, setStore] = useStore();
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

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <header className="container mx-auto p-4">
      <nav className="bg-white border-gray-200 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <button
            onClick={navigateHome}
            className="self-center text-2xl font-semibold whitespace-nowrap">
            HAMMERSPACE
          </button>
          <Button onClick={logout}>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

/*
    <Navbar>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img alt="Backpack" src={Logo} width="30" className="d-inline-block align-top" /> Backpack
        </Navbar.Brand>
        {store.accessToken ? <Button onClick={logout}>Logout</Button> : null}
      </Container>
    </Navbar>*/
