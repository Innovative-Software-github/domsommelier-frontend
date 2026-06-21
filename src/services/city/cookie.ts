import { CITY_COOKIE, CITY_COOKIE_MAX_AGE } from './constants';

/**
 * Сохраняет выбранный город в cookie (клиент).
 * Cookie затем читается на сервере при следующем рендере (после router.refresh()).
 */
export const setCityCookie = (slug: string): void => {
  document.cookie =
    `${CITY_COOKIE}=${encodeURIComponent(slug)}; path=/; max-age=${CITY_COOKIE_MAX_AGE}; SameSite=Lax`;
};
