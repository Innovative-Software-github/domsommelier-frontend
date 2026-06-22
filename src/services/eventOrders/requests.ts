import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import {
  ICreateEventOrderRequest,
  TCreateEventOrderResponse,
} from './interfaces';

export const createEventOrder = (request: ICreateEventOrderRequest) => {
  return customFetch<TCreateEventOrderResponse, ICreateEventOrderRequest>(
    {
      path: ApiEndpoint.eventOrders.create,
      method: 'POST',
      silentError: true,
    },
    request,
  );
};
