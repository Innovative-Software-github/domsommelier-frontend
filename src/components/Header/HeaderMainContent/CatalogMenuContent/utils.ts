import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  productTypeArray,
  productTypeLabels,
  TProductType,
  TProductTypeLabels,
} from '../../../../constants/productTypes';
import { getFilteredProducts } from '../../../../services/products/requests';
import { TProductCard } from '../../../../services/products/interfaces/base';
import { currentCitySelector } from '../../../../store/city/selectors';

export interface ICatalogMenuCategories {
  key: TProductType;
  label: TProductTypeLabels;
}

export const useCatalogMenuCategories = (): ICatalogMenuCategories[] =>
  productTypeArray.map((productType) => ({
    key: productType,
    label: productTypeLabels[productType],
  }));

/**
 * Карточка самого популярного товара выбранной категории — показывается
 * в мега-меню каталога справа от списка категорий. Загружается лениво:
 * только пока меню открыто, и только один раз на категорию за время жизни
 * компонента (результат кэшируется в памяти, повторный hover не бьёт в API).
 */
export const useCatalogFeaturedProduct = (
  activeProductTypeKey: TProductType,
  isOpen: boolean,
) => {
  const currentCity = useSelector(currentCitySelector);
  const cacheRef = useRef<Partial<Record<TProductType, TProductCard | null>>>(
    {},
  );
  const [product, setProduct] = useState<TProductCard | null>(
    cacheRef.current[activeProductTypeKey] ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const cached = cacheRef.current[activeProductTypeKey];
    if (cached !== undefined) {
      setProduct(cached);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    getFilteredProducts({}, activeProductTypeKey, currentCity?.slug, {
      page: 0,
      size: 1,
      sort: 'popular',
    })
      .then((response) => {
        const featured = response.content[0] ?? null;
        cacheRef.current[activeProductTypeKey] = featured;
        if (!cancelled) setProduct(featured);
      })
      .catch(() => {
        cacheRef.current[activeProductTypeKey] = null;
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeProductTypeKey, isOpen, currentCity?.slug]);

  return { product, isLoading };
};
