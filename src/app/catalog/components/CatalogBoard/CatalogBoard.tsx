import * as React from 'react';

import cls from './CatalogBoard.module.scss';
import { WineCard } from '../../../../ui/WineCard/WineCard';
import { wineCardModelMock } from '../../../../constants/temporaryMocks';
import {
  productTypeLabels,
  TProductType,
} from '../../../../constants/routes/productsRoutes';
import { FilterControllers } from './FilterControllers/FilterControllers';

export interface ICatalogBoardProps {
  productType: TProductType;
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({ productType }) => {
  return (
    <section className={cls.container}>
      <h2 className={cls.title}>{productTypeLabels[productType]}</h2>
      <FilterControllers />
      <div className={cls.board}>
        {Array.from({ length: 12 }).map((_, i) => (
          <WineCard
            key={i}
            className={cls.card}
            wineOption={wineCardModelMock}
          />
        ))}
      </div>
    </section>
  );
};
