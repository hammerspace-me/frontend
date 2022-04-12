import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useStore } from '../store';
import { StoreProvider, storeDefault } from '../store';
import Backpack from './Backpack';
import Login from './Login';

function RequireAuth({ children }: { children: JSX.Element }) {
  const [store] = useStore();
  const location = useLocation();

  if (store.accessToken === undefined) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const App: FC = () => {
  return (
    <StoreProvider initialValue={storeDefault}>
      <BrowserRouter>
        <Header></Header>
        <Container>
          <Routes>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Backpack />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
