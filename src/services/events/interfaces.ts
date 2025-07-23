export interface IEvent {
  id: string;
  type: string;
  price: number;
  dateTime: string;
  title: string;
  smallCover: string;
  largeCover: string;
  city: string;
  address: string;
  wineryIndex: string;
  description: string;
  registrationLink: string;
}

export type IEventCard = Pick<IEvent,
  | 'id'
  | 'type'
  | 'price'
  | 'dateTime'
  | 'title'
  | 'smallCover'
>;

export const EventTypes = {
  degustation: 'degustation',
  wineCasino: 'wineCasino',
} as const;

export type TEventTypes = typeof EventTypes[keyof typeof EventTypes];

export interface IGetEventsRequest {
  dateStart?: string;
  dateEnd?: string;
  priceMin?: number;
  priceMax?: number;
  type?: TEventTypes;
  page: number;
  size: number;
}

export interface IGetEventsResponse {
  content: IEvent[];
  totalPages: number;
}

export type TGetEventByIdRequest = string;

export interface IGetEventByIdResponse extends Array<IEvent> {}
