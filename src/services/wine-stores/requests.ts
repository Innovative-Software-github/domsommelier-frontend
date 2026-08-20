import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IWineStore, IWineStoresPage } from './interfaces';

/** citySlug — ограничить винотеки текущим городом (см. currentCitySelector). Без него — все винотеки. */
export const getWineStores = async (page = 0, size = 50, citySlug?: string) => {
  return customFetch<IWineStoresPage>({
    path: ApiEndpoint.wineStores.getAll(page, size, citySlug),
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
