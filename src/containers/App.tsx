import { FC } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter,
  Link,
  LinkProps,
  Navigate,
  Route,
  Routes,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { useStore } from "../store";
import { StoreProvider, storeDefault } from "../store";
import Login from "./Login";
import Admin from "./Admin";
import Logo from "../assets/logo.png";
import LoginButton from "../components/LoginButton";

const ActiveLink: FC<LinkProps> = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link to={to} className={match ? "nav-link active" : "nav-link"} {...props}>
      {children}
    </Link>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const [store] = useStore();
  let location = useLocation();

  if (store.accessToken == undefined) {
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
        <Container>
          <header className="p-3">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <img className="bi me-2" width="50" role="img" src={Logo} />
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li>
                    <ActiveLink to="/">Home</ActiveLink>
                  </li>
                  <li>
                    <ActiveLink to="/admin">Administration</ActiveLink>
                  </li>
                </ul>
                <div className="text-end">
                  <LoginButton />
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <RequireAuth>
                  <Admin />
                </RequireAuth>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
