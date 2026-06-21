/** Ответ бэкенда GET /api/v1/cities. */
export interface ICityResponse {
  id: number;
  slug: string;
  name: string;
  active: boolean;
  sortOrder: number;
}
