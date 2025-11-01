'use server';

import { headers } from 'next/headers';
import { ICity, ICityState } from '@/store/city/interfaces';

export async function getUserCityFromHeaders(): Promise<ICity | null> {
  try {
    const headersList = await headers();

    // Получаем город из заголовков Vercel
    // Доступны только в production/preview на Vercel
    const cityName = headersList?.get?.('x-vercel-ip-city');

    // Альтернативные варианты названий заголовков
    const cityNameAlt = cityName ||
      headersList?.get?.('x-vercel-ip-city-name') ||
      headersList?.get?.('cf-ipcity'); // Cloudflare (если используется)
    
    if (!cityNameAlt) {
      return null;
    }

    const cityId = cityNameAlt?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    return {
      id: cityId,
      name: cityNameAlt,
    };
  } catch (error) {
    // В случае ошибки или отсутствия заголовков возвращаем null
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

