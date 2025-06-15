import * as React from 'react';

import cls from './CatalogMenuContent.module.scss';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import clsx from 'clsx';
import { ProductTypeItem } from './ProductTypeItem/ProductTypeItem';
import { ProductTypeContent } from './ProductTypeContent/ProductTypeContent';
import { useCatalogMenuData } from './utils';
import { TProductType } from '../../../../constants/productTypes';

export interface ICatalogMenuContentProps {}

export const CatalogMenuContent: React.FC<ICatalogMenuContentProps> = () => {
  const [activeProductTypeKey, setActiveProductTypeKey] =
    React.useState<TProductType>('wine');

  const { catalogMenuCategories, getVisibleFiltersByKey } =
    useCatalogMenuData();

  return (
    <ContentContainer className={clsx(cls.scrollArea, cls.container)}>
      <div className={cls.categories}>
        {catalogMenuCategories.map(({ key, label }) => (
          <ProductTypeItem
            key={key}
            isActiveCategory={activeProductTypeKey === key}
            title={label}
            onMouseEnter={() => setActiveProductTypeKey(key)}
          />
        ))}
      </div>

      <ProductTypeContent
        activeProductTypeKey={activeProductTypeKey}
        getVisibleFiltersByKey={getVisibleFiltersByKey}
      />
    </ContentContainer>
  );
};
