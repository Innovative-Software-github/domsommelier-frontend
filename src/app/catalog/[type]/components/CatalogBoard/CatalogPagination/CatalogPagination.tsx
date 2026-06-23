'use client';

import React from 'react';
import { Pagination } from '../../../../../../ui/Pagination/Pagination';
import { Button } from '../../../../../../ui/Button/Button';
import cls from './CatalogPagination.module.scss';

export interface ICatalogPaginationProps {
  /** Текущая страница (0-based, как в сторе/на бэкенде). */
  page: number;
  totalPages: number;
  /** true — текущая страница последняя (нечего догружать). */
  last: boolean;
  /** Есть ли вообще товары (иначе пагинацию не показываем). */
  hasItems: boolean;
  onLoadMore: () => void;
  /** Переход на страницу (0-based). */
  onGoToPage: (page: number) => void;
}

export const CatalogPagination: React.FC<ICatalogPaginationProps> = ({
  page,
  totalPages,
  last,
  hasItems,
  onLoadMore,
  onGoToPage,
}) => {
  // Нет товаров или всего одна страница — ни «Показать ещё», ни номеров.
  if (!hasItems || totalPages <= 1) {
    return null;
  }

  return (
    <div className={cls.container}>
      {!last && (
        <Button variant="outlined" className={cls.loadMore} onClick={onLoadMore}>
          Показать ещё
        </Button>
      )}

      <Pagination
        page={page + 1}
        count={totalPages}
        siblingCount={1}
        boundaryCount={2}
        onChange={(nextPage) => onGoToPage(nextPage - 1)}
      />
    </div>
  );
};
