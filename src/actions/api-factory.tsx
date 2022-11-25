import { useLocation, useNavigate } from 'react-router-dom';
import { Api } from './api';

export const useApi = (
  accessToken?: string,
  errorHandler?: (message: string) => void,
  unauthorizedHandler?: (message: string) => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const errorNotification = (message: string) => {
    console.log('Error notification', message);
  };

  const noAuthRedirection = (url: string) => {
    console.log('Unauthorized API call, redirecting to login');
    navigate('/login', { state: { from: location }, replace: true });
  };

  return {
    api: new Api(
      process.env.REACT_APP_BACKEND || 'http://localhost:3000',
      errorHandler || errorNotification,
      unauthorizedHandler || noAuthRedirection,
      accessToken
    )
  };
};
