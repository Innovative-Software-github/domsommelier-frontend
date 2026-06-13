import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkoutBasket } from '../../services/orders/requests';
import { ICheckoutThunkArgs } from './interfaces';

export const checkoutThunk = createAsyncThunk<string, ICheckoutThunkArgs>(
  'checkout/submit',
  async ({ customerId, wineStoreId }, { rejectWithValue }) => {
    try {
      return await checkoutBasket(customerId, wineStoreId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
