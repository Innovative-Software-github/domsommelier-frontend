import * as React from 'react';

import cls from './CatalogMenuContent.module.scss';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import clsx from 'clsx';
import { CategoryCard } from './CategoryCard/CategoryCard';
import Image from 'next/image';
import { mockCategories } from './utils';

export interface ICatalogMenuContentProps {}

export const CatalogMenuContent: React.FC<ICatalogMenuContentProps> = () => {
  const [activeCategoryId, setActiveCategoryId] = React.useState(1);

  const activeCategory = mockCategories.find(
    (category) => category.id === activeCategoryId,
  );

  return (
    <ContentContainer className={clsx(cls.scrollArea, cls.container)}>
      <div className={cls.categories}>
        {mockCategories.map((category) => (
          <CategoryCard
            key={category.id}
            isActiveCategory={activeCategoryId === category.id}
            title={category.title}
            onMouseEnter={() => setActiveCategoryId(category.id)}
          />
        ))}
      </div>
      <div className={cls.content}>
        <div className={cls.header}>
          {activeCategory?.images.map((item, index) => (
            <div className={cls.block} key={index}>
              <Image src={item.src} alt={item.label} width={210} height={175} />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <main className={cls.main}>
          {[...Array(4)].map((_, i) => (
            <div className={cls.blockFilter} key={i}>
              <h3 className={cls.filterTitle}>Цена</h3>
              <ul className={cls.filterList}>
                {activeCategory?.filters.map((price, index) => (
                  <li key={index}>{price}</li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
    </ContentContainer>
  );
};
