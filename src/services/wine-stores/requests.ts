import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IWineStore, IWineStoresPage } from './interfaces';

export const getWineStores = async (page = 0, size = 50) => {
  return customFetch<IWineStoresPage>({
    path: ApiEndpoint.wineStores.getAll(page, size),
    method: 'GET',
    withCredentials: false,
  });
};

export const getWineStoreById = async (id: number) => {
  return customFetch<IWineStore>({
    path: ApiEndpoint.wineStores.getById(id),
    method: 'GET',
    withCredentials: false,
  });
};
