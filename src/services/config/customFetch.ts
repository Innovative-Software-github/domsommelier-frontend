import { TAPIError } from '@/store/interfaces';
import { getBackendHost } from '@/utils/getBackendHost';
import { stringifySearchParams } from '@/utils/stringifySearchParams';

export type THTTPRequestMethod =
  | 'HEAD'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';
export type TURIScheme = 'http' | 'https';

export interface IHttpRequestConfig {
  path: string;
  method: THTTPRequestMethod;
  headers?: [string, string][];
  scheme?: TURIScheme;
  port?: number;
  contentType?: string;
  withCredentials?: boolean;
  withErrorHandling?: boolean;
  signal?: AbortSignal;
  cacheStrategy?: {
    cache?: RequestCache;
    revalidate?: number;
    tags?: string[];
  };
}

export type RequestDataValue =
  | string
  | number
  | null
  | boolean
  | void
  | Array<RequestDataValue>;

export interface IRequestData {
  [key: string]: RequestDataValue | IRequestData;
}

export interface IResponse<T> {
  data: T | null;
  error: TAPIError;
}

/**
 *
 * @template TResponsePayload - Тип данных ответа
 * @template TRequestPayload - Тип данных запроса
 *
 * @param {IHttpRequestConfig} settings - Настройки запроса
 * @param {string} settings.path - Путь запроса
 * @param {THTTPRequestMethod} settings.method - HTTP метод
 * @param {[string, string][]} [settings.headers] - Дополнительные заголовки
 * @param {TURIScheme} [settings.scheme] - Протокол (http/https)
 * @param {number} [settings.port] - Порт
 * @param {string} [settings.contentType] - Тип контента
 * @param {boolean} [settings.withCredentials] - флаг отправлять ли куки
 * @param {boolean} [settings.withErrorHandling] - флаг включить ли обработку ошибок
 * @param {AbortSignal} [settings.signal] - Сигнал для отмены запроса
 * @param {Object} [settings.cacheStrategy] - Стратегия кэширования
 * @param {RequestCache} [settings.cacheStrategy.cache] - Тип кэширования
 * @param {number} [settings.cacheStrategy.revalidate] - Время перезапроса в секундах
 * @param {[string]} [settings.cacheStrategy.tags] - Теги для кэширования и ревалидации
 *
 * @param {TRequestPayload} [data] - Данные для отправки
 *
 * @returns {Promise<IResponse<TResponsePayload> | TResponsePayload>} Результат запроса
 * - Если withErrorHandling=true, возвращает объект {data, error}
 * - Если withErrorHandling=false, возвращает данные напрямую
 *
 * @throws {Error} Выбрасывает ошибку, если не задан хост бэкенда
 */
export function customFetch<
  TResponsePayload = unknown,
  TRequestPayload = IRequestData,
>(
  settings: IHttpRequestConfig & { withErrorHandling: true },
  data?: TRequestPayload,
): Promise<IResponse<TResponsePayload>>;

// eslint-disable-next-line no-redeclare
export function customFetch<
  TResponsePayload = unknown,
  TRequestPayload = IRequestData,
>(
  settings: IHttpRequestConfig & { withErrorHandling?: false },
  data?: TRequestPayload,
): Promise<TResponsePayload>;

// eslint-disable-next-line no-redeclare
export async function customFetch<
  TResponsePayload = unknown,
  TRequestPayload = IRequestData,
>(
  {
    path,
    method,
    headers = [],
    scheme = 'http',
    port,
    contentType = 'application/json',
    withCredentials = true,
    withErrorHandling = false,
    signal,
    cacheStrategy,
  }: IHttpRequestConfig,
  data?: TRequestPayload,
): Promise<IResponse<TResponsePayload> | TResponsePayload> {
  const makeRequest = async (): Promise<TResponsePayload> => {
    const host = getBackendHost() || '194.87.190.20:8080';

    if (!host) {
      throw new Error('Backend host is not defined');
    }

    const query =
      data && method === 'GET' ? `?${stringifySearchParams(data)}` : '';
    const body = data && method !== 'GET' ? JSON.stringify(data) : undefined;

    const url = `${scheme}://${host}${port ? `:${port}` : ''}${path}${query}`;

    const response = await fetch(url, {
      method,
      body,
      headers: [
        ...headers,
        ['Content-Type', contentType],
        ['Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub3NvZmYuNG5kckB5YW5kZXgucnUiLCJpZCI6IjZjNWY5ODVkLWIwYmYtNGJiNS1iYTBlLTFkODdmYzkzZDVjOSIsImlhdCI6MTc2OTYzNTYzNSwiZXhwIjoxNzY5NzIyMDM1fQ.RF5a5Po0r8VcP3C68TjHWfFGD_KlbPnaAoi0NalG5eU'],
      ],
      credentials: withCredentials ? 'include' : 'omit',
      cache: cacheStrategy?.cache || 'no-store',
      next: {
        revalidate: cacheStrategy?.revalidate,
        tags: cacheStrategy?.tags,
      },
      signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      throw error;
    }

    return response.json();
  };

  if (withErrorHandling) {
    try {
      const response = await makeRequest();

      return {
        data: response,
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: e as TAPIError,
      };
    }
  }

  return makeRequest();
}
