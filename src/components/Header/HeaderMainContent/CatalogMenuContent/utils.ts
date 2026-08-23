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

const FEATURED_PRODUCTS_COUNT = 3;

/**
 * Карточки самых популярных товаров выбранной категории — показываются
 * в мега-меню каталога справа от списка категорий. Загружаются лениво:
 * только пока меню открыто, и только один раз на категорию за время жизни
 * компонента (результат кэшируется в памяти, повторный hover не бьёт в API).
 */
export const useCatalogFeaturedProducts = (
  activeProductTypeKey: TProductType,
  isOpen: boolean,
) => {
  const currentCity = useSelector(currentCitySelector);
  const cacheRef = useRef<Partial<Record<TProductType, TProductCard[]>>>({});
  const [products, setProducts] = useState<TProductCard[]>(
    cacheRef.current[activeProductTypeKey] ?? [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const cached = cacheRef.current[activeProductTypeKey];
    if (cached !== undefined) {
      setProducts(cached);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    getFilteredProducts({}, activeProductTypeKey, currentCity?.slug, {
      page: 0,
      size: FEATURED_PRODUCTS_COUNT,
      sort: 'popular',
    })
      .then((response) => {
        cacheRef.current[activeProductTypeKey] = response.content;
        if (!cancelled) setProducts(response.content);
      })
      .catch(() => {
        cacheRef.current[activeProductTypeKey] = [];
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeProductTypeKey, isOpen, currentCity?.slug]);

  return { products, isLoading };
};
