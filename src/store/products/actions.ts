import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TGetFilteredProductsResponse } from '../../services/products/interfaces/base';
import { IAsyncThunkConfig } from '..';
import { getFilteredProducts, IGetFilteredProductsRequest } from '../../services/products/requests';
import { TAPIError } from '../interfaces';

export const getFilteredProductsRequest = createAsyncThunk<
TGetFilteredProductsResponse,
IGetFilteredProductsRequest,
IAsyncThunkConfig
>(
  'products/getFilteredProductsRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getFilteredProducts(payload.filters, payload.productType);

      return response;
    } catch (err) {
      console.error(err);

      return rejectWithValue(err as TAPIError);
    }
  },
);

export const setInitialProductCards = createAction<TGetFilteredProductsResponse>('products/setInitialProductCards');
