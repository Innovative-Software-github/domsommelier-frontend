import { ApiEndpoint } from "../config/apiEndpoints";
import { customFetch } from "../config/customFetch";
import {
  IGetEventByIdResponse,
  IGetEventsRequest,
  IGetEventsResponse,
  TGetEventByIdRequest,
} from "./interfaces";

export const getEvents = async (request: IGetEventsRequest) => {
  const response = await customFetch<IGetEventsResponse, IGetEventsRequest>(
    {
      path: ApiEndpoint.events.getEvents,
      method: 'GET',
    },
    request,
  );

  return response;
}

export const getEventById = async (id: TGetEventByIdRequest) => {
  const response = await customFetch<IGetEventByIdResponse, TGetEventByIdRequest>(
    {
      path: `${ApiEndpoint.events.getEventById}/${id}`,
      method: 'GET',
    },
  );

  return response;
}