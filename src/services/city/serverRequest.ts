'use server';

import { ICity, ICityState } from '@/store/city/interfaces';

export async function getUserCityFromHeaders(): Promise<ICity | null> {
  try {
    // TODO: Реализовать получение города из заголовков когда будет необходимо
    // const headersList = await headers();
    // const cityName = headersList?.get?.('x-vercel-ip-city');

    return {
      id: '1',
      name: 'Москва',
    };
  } catch (error) {
    console.warn('Failed to get city from headers:', error);
    return null;
  }
}

export async function getCityInitialState(): Promise<ICityState | undefined> {
  const currentCity = await getUserCityFromHeaders();
  if (!currentCity) {
    return undefined;
  }

  return {
    currentCity,
    cities: [],
  };
}

