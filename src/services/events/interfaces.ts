import { IPaginatedResponse } from '@/services/common/interfaces';
import { TEventTypes } from "../../constants/events";

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IEvent {
  id: string;
  type: TEventTypes;
  price: number;
  dateTime: string;
  title: string;
  smallCover: string;
  largeCover: string;
  city: string;
  address: string;
  description: string;
  registrationLink: string;
  about?: string | null;
  howItGoes?: string | null;
  faq?: IFaqItem[] | null;
}

export type IEventCard = Pick<IEvent,
  | 'id'
  | 'type'
  | 'price'
  | 'dateTime'
  | 'title'
  | 'smallCover'
>;

export interface IGetEventsRequest {
  dateStart?: string;
  dateEnd?: string;
  priceMin?: number;
  priceMax?: number;
  type?: TEventTypes;
  /** slug выбранного города — мероприятия по всем винотекам города. */
  city?: string;
  page: number;
  size: number;
}

export interface IGetEventsResponse extends IPaginatedResponse<IEvent> {}

export type TGetEventByIdRequest = string;

export interface IGetEventByIdResponse extends IEvent {}
