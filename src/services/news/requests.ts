import { ApiEndpoint } from '../config/apiEndpoints';
import { customFetch } from '../config/customFetch';
import { IGetNewsResponse, INews } from './interfaces';

/** Свежие новости для свайпера на главной (свежие сверху). */
export const getLatestNews = async (limit = 10): Promise<INews[]> => {
  const response = await customFetch<IGetNewsResponse, { page: number; size: number }>(
    {
      path: ApiEndpoint.news.getNews,
      method: 'GET',
    },
    { page: 0, size: limit },
  );

  return response.content;
};
