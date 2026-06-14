import { useCallback, useEffect, useState } from 'react';
import { getOrders } from '@/services/orders/requests';
import { IOrderHistoryItem } from '@/services/orders/interfaces';

const DEFAULT_PAGE_SIZE = 10;

interface IProfileOrdersState {
  orders: IOrderHistoryItem[];
  totalPages: number;
  page: number;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: IProfileOrdersState = {
  orders: [],
  totalPages: 1,
  page: 1,
  isLoading: true,
  error: null,
};

export function useProfileOrders(pageSize = DEFAULT_PAGE_SIZE) {
  const [state, setState] = useState<IProfileOrdersState>(INITIAL_STATE);

  const loadOrders = useCallback(async (pageNum: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await getOrders(pageNum - 1, pageSize);
      setState({
        orders: data.content,
        totalPages: data.totalPages,
        page: pageNum,
        isLoading: false,
        error: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Не удалось загрузить заказы',
      }));
    }
  }, [pageSize]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      loadOrders(newPage);
    },
    [loadOrders],
  );

  useEffect(() => {
    loadOrders(1);
  }, [loadOrders]);

  return {
    ...state,
    loadOrders,
    handlePageChange,
  };
}
