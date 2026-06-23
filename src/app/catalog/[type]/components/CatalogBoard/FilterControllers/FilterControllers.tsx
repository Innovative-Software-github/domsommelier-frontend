'use client';

import * as React from 'react';

import cls from './FilterControllers.module.scss';
import { useMediaContext } from '../../../../../../hooks/useMediaQuery';
import { MediaQuery } from '../../../../../../constants/media';
import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';
import { Backdrop } from '../../../../../../ui/Backdrop/Backdrop';
import { Select, ISelectOptions } from '../../../../../../ui/Select/Select';
import { FiltersPanel } from '../../FiltersPanel/FiltersPanel';
import { TProductType } from '../../../../../../constants/productTypes';
import { IFiltersState } from '../../FiltersPanel/FiltersFabric/interfaces';
import { SORT_OPTIONS, TSortOption } from '../../../utils/catalogQuery';

export interface IFilterControllersProps {
  productType: TProductType;
  filters: IFiltersState;
  updateFilterArray: (field: string, value: any[]) => void;
  applyFilters: () => void;
  sort: TSortOption;
  setSort: (sort: TSortOption) => void;
}

export const FilterControllers: React.FC<IFilterControllersProps> = ({
  productType,
  filters,
  updateFilterArray,
  applyFilters,
  sort,
  setSort,
}) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false);

  const isTablet = useMediaContext(MediaQuery.Tablet) === 'mobile';

  const selectedSort = SORT_OPTIONS.find((option) => option.key === sort);

  const handleSelectSort = (option: ISelectOptions) => setSort(option.key as TSortOption);

  return (
    <>
      <section className={cls.container}>
        {isTablet && (
          <button
            type="button"
            className={cls.button}
            onClick={() => setIsFiltersModalOpen(true)}
          >
            <span className={cls.text}>Фильтры</span>
            <Icon type={IconType.Filters_24} width={24} height={24} />
          </button>
        )}
        <Select
          anchor="Сортировка"
          options={SORT_OPTIONS}
          selectedOption={selectedSort}
          onSelect={handleSelectSort}
        />
      </section>

      {isTablet && (
        <Backdrop
          animation="rightSide"
          isOpen={isFiltersModalOpen}
          withCancelIcon
          onClickCancelIcon={() => setIsFiltersModalOpen(false)}
        >
          <FiltersPanel
            productType={productType}
            filters={filters}
            updateFilterArray={updateFilterArray}
            applyFilters={applyFilters}
          />
        </Backdrop>
      )}
    </>
  );
};
