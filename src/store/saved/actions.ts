import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSaved, addToSaved, removeFromSaved, clearSaved } from '../../services/saved/requests';
import {
  IGetSavedResponse,
  IAddToSavedResponse,
  IRemoveFromSavedResponse,
  TSavedCustomerId,
} from '../../services/saved/interfaces';
import { IAsyncThunkConfig, TAPIError } from '../interfaces';
import { IAddToSavedThunkArgs, IRemoveFromSavedThunkArgs } from './interfaces';

export const getSavedRequest = createAsyncThunk<
  IGetSavedResponse | null,
  TSavedCustomerId,
  IAsyncThunkConfig
>(
  'saved/fetchSaved',
  async (customerId, { rejectWithValue }) => {
    try {
      return await getSaved(customerId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  },
);

export const addToSavedThunk = createAsyncThunk<
  IAddToSavedResponse,
  IAddToSavedThunkArgs,
  IAsyncThunkConfig
>(
  'saved/addToSaved',
  async ({ customerId, productId }, { rejectWithValue }) => {
    try {
      return await addToSaved(customerId, productId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  },
);

export const removeFromSavedThunk = createAsyncThunk<
  IRemoveFromSavedResponse,
  IRemoveFromSavedThunkArgs,
  IAsyncThunkConfig
>(
  'saved/removeFromSaved',
  async ({ customerId, productId }, { rejectWithValue }) => {
    try {
      return await removeFromSaved(customerId, productId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  },
);

export const clearSavedThunk = createAsyncThunk<
  null,
  TSavedCustomerId,
  IAsyncThunkConfig
>(
  'saved/clearSaved',
  async (customerId, { rejectWithValue }) => {
    try {
      return await clearSaved(customerId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  },
);
