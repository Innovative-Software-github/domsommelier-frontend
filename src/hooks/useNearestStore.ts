'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentCitySelector } from '../store/city/selectors';
import { getWineStores } from '../services/wine-stores/requests';
import { IWineStore } from '../services/wine-stores/interfaces';

/**
 * Первая винотека текущего (выбранного) города — для быстрой подсказки
 * «Самовывоз из ...» на карточке товара, до перехода в checkout, где
 * покупатель выбирает винотеку осознанно из полного списка.
 */
export const useNearestStore = () => {
  const currentCity = useSelector(currentCitySelector);
  const [store, setStore] = useState<IWineStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    getWineStores(0, 1, currentCity?.slug)
      .then((page) => {
        if (!cancelled) {
          setStore(page.content[0] ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStore(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentCity?.slug]);

  return { store, isLoading };
};
