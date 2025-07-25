import { IPaginationProps } from './Pagination';

export type IUsePaginationProps = Omit<IPaginationProps, 'onChange'>
export type TUsePaginationReturn = (number | string)[];

export const usePagination = ({
  count,
  page,
  siblingCount,
  boundaryCount,
}: IUsePaginationProps): TUsePaginationReturn => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount,
      boundaryCount + siblingCount * 2 + 2,
    ),
    count - boundaryCount - 1,
  );

  const itemList = [
    ...(['previous']),
    ...startPages,

    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    ...range(siblingsStart, siblingsEnd),

    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis']
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    ...(['next']),
  ];

  return itemList;
};
