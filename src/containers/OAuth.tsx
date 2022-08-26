import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from '../store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  AuthorizationRequestDto,
  AuthorizationResponseWithClientDto,
  useOAuthActions
} from '../actions/oAuthActions';
import CardWithLogo from '../components/CardWithLogo';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const styles = {
  fullContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const OAuth: FC = () => {
  const [store] = useStore();
  const [authorizationResponse, setAuthorizationResponse] =
    useState<AuthorizationResponseWithClientDto>();
  const [error, setError] = useState<string>();
  const [activation, setActivation] = useState<boolean>(false);
  const location = useLocation();
  const query = useQuery();

  const {
    createAuthorizationRequest,
    confirmAuthorizationRequest,
    createQueryString,
    confirmActivation
  } = useOAuthActions((message) => {
    setError('API error');
  });

  const safeQuery = (attribute: string): string => {
    if (query.get(attribute) !== undefined) {
      return query.get(attribute) as string;
    }
    return '';
  };

  const validateAuthorizationRequest = useCallback(async () => {
    const authorizationRequest: AuthorizationRequestDto = {
      responseType: safeQuery('response_type'),
      redirectUri: safeQuery('redirect_uri'),
      clientId: safeQuery('client_id'),
      scopes: safeQuery('scope').split(' '),
      state: safeQuery('state')
    };
    const application = await createAuthorizationRequest(authorizationRequest);
    setAuthorizationResponse(application);
  }, []);

  useEffect(() => {
    validateAuthorizationRequest().catch((error) => {
      setError('API error');
    });
  }, [validateAuthorizationRequest]);

  const onCancel = () => {
    console.log('cancel');
  };

  const onApprove = async () => {
    if (authorizationResponse) {
      const confirmAuthorization = await confirmAuthorizationRequest(authorizationResponse);
      const queryString = createQueryString(confirmAuthorization);

      const activationCode = safeQuery('activation');

      if (activationCode && confirmAuthorization && 'code' in confirmAuthorization) {
        // if we come from an activation request, we want to handle it differently
        await confirmActivation(activationCode, confirmAuthorization.code);
        setActivation(true);
      } else {
        window.location.href = authorizationResponse.redirectUri + queryString;
      }
    } else {
      setError('No authorization response');
    }
  };

  if (error) {
    return (
      <div style={styles.fullContainer}>
        <CardWithLogo>
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Oh... something went wrong!
          </h5>
        </CardWithLogo>
      </div>
    );
  }

  if (activation) {
    return (
      <div style={styles.fullContainer}>
        <CardWithLogo>
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            You can close this window now
          </h5>
        </CardWithLogo>
      </div>
    );
  }

  if (store.accessToken === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div style={styles.fullContainer}>
      <CardWithLogo>
        <img
          className="mb-3 object-cover h-24 w-24 rounded"
          src={authorizationResponse?.application.logo}
          alt="logo"></img>
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
          {authorizationResponse?.application.name} wants to access your Backpack
        </h5>

        <p className="text-sm font-normal text-gray-500">
          This will allow {authorizationResponse?.application.name} to:
        </p>
        <ul className="my-4 space-y-3">
          {authorizationResponse?.scopes.map((scope) => {
            const mapping: { [name: string]: string } = {
              'avatars:read': 'View all your avatars',
              'avatars:create': 'Create new avatars',
              'avatars:update': 'Update all your avatars',
              'avatars:delete': 'Delete your avatars'
            };
            return (
              <li
                className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lggroup"
                key={scope}>
                <span className="flex-1 ml-3 whitespace-nowrap">{mapping[scope]}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <button
            onClick={onCancel}
            className="border-black border-2 relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm bg-brand border-brand hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none w-full text-black rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13">
            Cancel
          </button>
          <button
            onClick={onApprove}
            className="bg-black relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm bg-brand border-brand hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none w-full text-white rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13">
            Approve
          </button>
        </div>
      </CardWithLogo>
    </div>
  );
};

export default OAuth;
