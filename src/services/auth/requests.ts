import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IAuthConfirmResponse } from './interfaces';

export const authInitiate = (email: string) => {
  return customFetch<void>(
    {
      path: `${ApiEndpoint.auth.initiate}?email=${encodeURIComponent(email)}`,
      method: 'POST',
      withErrorHandling: true,
    },
  );
};

export const authConfirm = (email: string, code: string) => {
  return customFetch<IAuthConfirmResponse>(
    {
      path: `${ApiEndpoint.auth.confirm}?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
      method: 'POST',
      withErrorHandling: true,
    },
  );
};
