import { useStore } from '../store';
import { useApi } from './api-factory';

export interface AuthorizationRequestDto {
  clientId: string;
  responseType: string;
  redirectUri: string;
  scopes: string[];
  state?: string;
}

export interface AuthorizationResponseDto {
  id: string;
  clientId: string;
  responseType: string;
  redirectUri: string;
  scopes: string[];
  state?: string;
}

export interface AuthorizationResponseWithClientDto {
  id: string;
  clientId: string;
  responseType: string;
  redirectUri: string;
  scopes: string[];
  state?: string;
  application: ApplicationDto;
}

export interface ApplicationDto {
  name: string;
  logo: string;
}

export interface AuthorizationResponseWithCodeDto {
  state?: string;
  code: string;
}

export interface AuthorizationResponseWithTokenDto {
  state?: string;
  tokenType: string;
  accessToken: string;
  expiresIn: number;
}

export interface ActivationDto {
  id: string;
  state?: string;
  clientId: string;
  owner: string;
  redirectUri?: string;
  activationCode: string;
  authorizationCode?: string;
  scopes: string[];
  expiration: number;
}

export const useOAuthActions = (
  errorHandler?: (message: string) => void,
  unauthorizedHandler?: (message: string) => void
) => {
  const [store] = useStore();
  const { api } = useApi(store.accessToken, errorHandler, unauthorizedHandler);

  const createAuthorizationRequest = async (authorizationRequestDto: AuthorizationRequestDto) => {
    const authorizationResponse: AuthorizationResponseDto = await api.post(
      '/oauth/authorize',
      authorizationRequestDto
    );

    const clientId = authorizationResponse.clientId;
    const redirectUri = authorizationRequestDto.redirectUri;
    const application: ApplicationDto = await api.get('oauth/application/' + clientId);
    return {
      ...authorizationResponse,
      redirectUri,
      application
    } as AuthorizationResponseWithClientDto;
  };

  const getActivation = async (code: string) => {
    const activation: ActivationDto = await api.get('/oauth/activation/' + code);
    return activation;
  };

  const confirmActivation = async (code: string, authorizationCode: string) => {
    const activation: ActivationDto = await api.post('/oauth/activation/' + code, {
      authorizationCode: authorizationCode
    });
    return activation;
  };

  const confirmAuthorizationRequest = async (authorizationResponse: AuthorizationResponseDto) => {
    if (authorizationResponse.responseType === 'token') {
      return await confirmAuthorizationTokenRequest(authorizationResponse.id);
    }

    if (authorizationResponse.responseType === 'code') {
      return await confirmAuthorizationCodeRequest(authorizationResponse.id);
    }

    return null;
  };

  const confirmAuthorizationCodeRequest = async (authorizationRequestId: string) => {
    const authorizationResponse: AuthorizationResponseWithCodeDto = await api.post(
      '/oauth/authorize/' + authorizationRequestId,
      {}
    );
    return authorizationResponse;
  };

  const confirmAuthorizationTokenRequest = async (authorizationRequestId: string) => {
    const authorizationResponse: AuthorizationResponseWithTokenDto = await api.post(
      '/oauth/authorize/' + authorizationRequestId,
      {}
    );
    return authorizationResponse;
  };

  const createQueryString = (
    authorizationResponse:
      | AuthorizationResponseWithCodeDto
      | AuthorizationResponseWithTokenDto
      | null
  ) => {
    if (authorizationResponse) {
      if ('code' in authorizationResponse) {
        const queryParameters = {
          code: authorizationResponse.code,
          state: authorizationResponse.state ? authorizationResponse.state : ''
        };
        return '?' + new URLSearchParams(queryParameters).toString();
      }

      if ('accessToken' in authorizationResponse) {
        const queryParameters = {
          access_token: authorizationResponse.accessToken,
          token_type: authorizationResponse.tokenType,
          expires_in: authorizationResponse.expiresIn.toString(),
          state: authorizationResponse.state ? authorizationResponse.state : ''
        };
        return '?' + new URLSearchParams(queryParameters).toString();
      }
    }

    return '';
  };

  return {
    createAuthorizationRequest,
    confirmAuthorizationRequest,
    createQueryString,
    getActivation,
    confirmActivation
  };
};
