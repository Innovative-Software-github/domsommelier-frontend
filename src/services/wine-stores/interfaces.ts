export interface IWineStoreCoordinates {
  longitude: number;
  latitude: number;
}

export interface IWineStore {
  id: number;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  city: string;
  district: string;
  location: IWineStoreCoordinates;
}

export interface IWineStoresPage {
  content: IWineStore[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
