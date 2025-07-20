import React from 'react';
import clsx from 'clsx';

import { usePagination } from './utils';
import { PaginationItem } from './PaginationItem/PaginationItem';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { PaginationEllipsis } from './PaginationEllipsis/PaginationEllipsis';

import cls from './Pagination.module.scss';

export interface IPaginationProps {
  count: number;
  page: number;
  siblingCount: number;
  boundaryCount: number;
  className?: string;
  onChange: (page: number) => void
}

export const Pagination: React.FC<IPaginationProps> = (props) => {
  const {
    page,
    count,
    siblingCount = 1,
    boundaryCount = 2,
    className,
    onChange,
  } = props;
  const items = React.useMemo(
    () => usePagination({
      count, page, siblingCount, boundaryCount,
    }),
    [count, page, siblingCount, boundaryCount],
  );

  const isAnimationDisabled = React.useMemo(
    () => items.includes('start-ellipsis') && items.includes('start-ellipsis'),
    [items],
  );

  const renderPaginationItem = (item: number | string) => {
    switch (typeof item) {
      case 'number':
        return (
          <PaginationItem
            key={item}
            page={page}
            isAnimationDisabled={isAnimationDisabled || boundaryCount === 0}
            onClick={() => onChange(item)}
          >
            {item}
          </PaginationItem>
        );

      case 'string':
        switch (item) {
          case 'previous':
            return (
              <PaginationButton
                key={item}
                variant={item}
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
              />
            );
          case 'next':
            return (
              <PaginationButton
                key={item}
                variant={item}
                onClick={() => onChange(page + 1)}
                disabled={page >= count}
              />
            );
          case 'start-ellipsis':
          case 'end-ellipsis':
            return <PaginationEllipsis key={item} />;

          default:
            return null;
        }

      default:
        return null;
    }
  };

  return (
    <div className={clsx(cls.pagination, className)}>
      {items.map((item) => renderPaginationItem(item))}
    </div>
  );
};

Pagination.displayName = 'Pagination';
