import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { StoreProvider, storeDefault } from '../store';
import Backpack from './Backpack';
import Login from './Login';
import OAuth from './OAuth';
import OAuthActivation from './OAuthActivation';

function RequireAuth({ children }: { children: JSX.Element }) {
  const [store] = useStore();
  const location = useLocation();

  if (store.accessToken === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const App: FC = () => {
  return (
    <StoreProvider initialValue={storeDefault}>
      <BrowserRouter>
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
          <Route path="oauth">
            <Route path="authorize" element={<OAuth />} />
            <Route path="activate" element={<OAuthActivation />} />
            <Route path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
