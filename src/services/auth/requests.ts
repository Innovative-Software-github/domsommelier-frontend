import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IAuthConfirmResponse, IAuthInitiateResponse } from './interfaces';

export const authInitiate = (email: string) => {
  return customFetch<IAuthInitiateResponse, { email: string }>(
    {
      path: ApiEndpoint.auth.initiate,
      method: 'POST',
      withErrorHandling: true,
    },
    { email },
  );
};

export const authConfirm = (email: string, code: string) => {
  return customFetch<IAuthConfirmResponse, { email: string; code: string }>(
    {
      path: ApiEndpoint.auth.confirm,
      method: 'POST',
      withErrorHandling: true,
    },
    { email, code },
  );
};
