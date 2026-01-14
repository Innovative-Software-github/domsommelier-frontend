'use server';

import { headers } from 'next/headers';
import { ICity, ICityState } from '@/store/city/interfaces';

export async function getUserCityFromHeaders(): Promise<ICity | null> {
  const headersList = await headers();
  const cityName = headersList.get('x-vercel-ip-city');
  console.log('cityName: ', cityName);

  if (!cityName) {
    return null;
  }

  const cityId = cityName.toLowerCase().replace(/\s+/g, '-');

  return {
    id: cityId,
    name: cityName,
  };
}

export async function getCityInitialState(): Promise<ICityState | undefined> {
  const currentCity = await getUserCityFromHeaders();
  console.log('currentCity: ', currentCity);
  if (!currentCity) {
    return undefined;
  }

  return {
    currentCity,
    cities: [],
  };
}

