import * as React from 'react';

import { SearchSidebarBlock } from './SearchSidebarBlock/SearchSidebarBlock';
import { WineCard } from '../../../../../ui/WineCard/WineCard';
import { wineCardModelMock } from '../../../../../constants/temporaryMocks';

import cls from './SearchModalBody.module.scss';

export interface ISearchModalBodyProps {}

export const SearchModalBody: React.FC<ISearchModalBodyProps> = () => {
  return (
    <div className={cls.container}>
      <div className={cls.sidebar}>
        <SearchSidebarBlock
          title="Популярные запросы"
          options={['Красное вино', 'Красное вино', 'Красное вино']}
        />
        <SearchSidebarBlock
          title="Категории"
          options={['Вина', 'Игристые', 'Красное вино']}
        />
      </div>
      <div className={cls.content}>
        <WineCard wineOption={wineCardModelMock} />
        <WineCard wineOption={wineCardModelMock} />
        <WineCard wineOption={wineCardModelMock} />
      </div>
    </div>
  );
};
