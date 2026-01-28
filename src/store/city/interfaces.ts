// TODO: уточнить контракт на бэке
export interface ICity {
  id: string;
  name: string;
}

export interface ICityState {
  currentCity: ICity | null;
  cities: ICity[];
}

