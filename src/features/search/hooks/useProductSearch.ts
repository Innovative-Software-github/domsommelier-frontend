'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { MIN_SEARCH_QUERY_LENGTH } from '../constants';
import {
  createEmptySearchResponse,
  ISearchProductsResponse,
  searchProducts,
} from '@/services/products/search';

export interface IUseProductSearchParams {
  q: string;
  page: number;
  pageSize: number;
  city?: string;
  enabled?: boolean;
}

export interface IUseProductSearchResult {
  data: ISearchProductsResponse;
  isLoading: boolean;
  error: unknown;
  isQueryValid: boolean;
  refetch: () => void;
}

export const useProductSearch = ({
  q,
  page,
  pageSize,
  city,
  enabled = true,
}: IUseProductSearchParams): IUseProductSearchResult => {
  const trimmedQ = q.trim();
  const isQueryValid = trimmedQ.length >= MIN_SEARCH_QUERY_LENGTH;
  const shouldFetch = enabled && isQueryValid;

  const [data, setData] = useState<ISearchProductsResponse>(() =>
    createEmptySearchResponse(pageSize),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSearch = useCallback(async () => {
    abortRef.current?.abort();

    if (!shouldFetch) {
      setData(createEmptySearchResponse(pageSize));
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchProducts(
        {
          q: trimmedQ,
          city,
          page,
          size: pageSize,
        },
        controller.signal,
      );

      if (!controller.signal.aborted) {
        setData(response);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [shouldFetch, trimmedQ, city, page, pageSize]);

  useEffect(() => {
    fetchSearch();

    return () => {
      abortRef.current?.abort();
    };
  }, [fetchSearch]);

  return {
    data,
    isLoading,
    error,
    isQueryValid,
    refetch: fetchSearch,
  };
};
