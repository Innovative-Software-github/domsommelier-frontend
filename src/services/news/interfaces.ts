import { IPaginatedResponse } from '@/services/common/interfaces';

export interface INews {
  id: string;
  title: string;
  description: string | null;
  /** Готовая публичная ссылка на обложку или null, если её нет. */
  coverUrl: string | null;
  publishedAt: string;
}

export type IGetNewsResponse = IPaginatedResponse<INews>;
