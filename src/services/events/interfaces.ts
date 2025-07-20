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
