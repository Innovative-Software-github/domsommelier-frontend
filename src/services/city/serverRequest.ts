import { cookies } from 'next/headers';
import { ICity, ICityState } from '@/store/city/interfaces';
import { getCities } from './requests';
import { CITY_COOKIE } from './constants';

/**
 * Город, применяемый к текущему запросу: cookie выбранного города (если валиден),
 * иначе — первый активный город из справочника (дефолт на первый заход).
 * Используется для серверной фильтрации (каталог) — согласован с выбором в шапке.
 */
function resolveCurrentCity(cities: ICity[], cookieSlug: string | undefined): ICity | null {
  if (cities.length === 0) {
    return null;
  }
  const fromCookie = cookieSlug ? cities.find((city) => city.slug === cookieSlug) : undefined;
  return fromCookie ?? cities[0];
}

export async function getSelectedCitySlug(): Promise<string | undefined> {
  // cookies() вне try/catch: его DynamicServerError должен дойти до Next (роут динамический).
  const cookieStore = await cookies();
  const cookieSlug = cookieStore.get(CITY_COOKIE)?.value;

  try {
    const cities = await getCities();
    return resolveCurrentCity(cities, cookieSlug)?.slug;
  } catch (error) {
    console.warn('Failed to resolve current city slug:', error);
    return cookieSlug;
  }
}

/**
 * Начальное состояние слайса города для SSR-преднаполнения Redux.
 *
 * Текущий город определяется по приоритету:
 *   cookie выбранного города → первый активный город из справочника.
 * (IP-геолокацию можно добавить здесь же как подсказку при отсутствии cookie.)
 */
export async function getCityInitialState(): Promise<ICityState | undefined> {
  const cookieStore = await cookies();
  const cookieSlug = cookieStore.get(CITY_COOKIE)?.value;

  try {
    const cities = await getCities();
    const currentCity = resolveCurrentCity(cities, cookieSlug);

    return { currentCity, cities };
  } catch (error) {
    console.warn('Failed to load city initial state:', error);
    return undefined;
  }
}
