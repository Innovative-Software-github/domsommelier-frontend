export interface ICity {
  id: number;
  /** Стабильный латинский идентификатор: moscow, perm. Используется в API и cookie. */
  slug: string;
  name: string;
}

export interface ICityState {
  currentCity: ICity | null;
  cities: ICity[];
}
