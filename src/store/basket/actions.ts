import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToBasket, clearBasket, getBasket, removeFromBasket } from "../../services/basket/requests";
import { IAddToBasketResponse, IGetBasketResponse, IRemoveFromBasketResponse, TCustomerId } from "../../services/basket/interfaces";
import { IAsyncThunkConfig, TAPIError } from "../interfaces";
import { IAddToCartThunkArgs, IRemoveFromCartThunkArgs } from "./interfaces";

export const getBasketRequest = createAsyncThunk<
  IGetBasketResponse,
  TCustomerId,
  IAsyncThunkConfig
>(
  'basket/fetchCart',
  async (customerId, { rejectWithValue }) => {
    try {
      return await getBasket(customerId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  }
);

export const addToCartThunk = createAsyncThunk<
  IAddToBasketResponse,
  IAddToCartThunkArgs,
  IAsyncThunkConfig
>(
  'basket/addToCart',
  async ({ customerId, productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      return await addToBasket(customerId, productId, quantity);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  }
);

export const removeFromCartThunk = createAsyncThunk<
  IRemoveFromBasketResponse,
  IRemoveFromCartThunkArgs,
  IAsyncThunkConfig
>(
  'basket/removeFromCart',
  async ({ customerId, productId }, { rejectWithValue }) => {
    try {
      return await removeFromBasket(customerId, productId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  }
);

export const clearCartThunk = createAsyncThunk<
  null,
  TCustomerId,
  IAsyncThunkConfig
>(
  'basket/clearCart',
  async (customerId, { rejectWithValue }) => {
    try {
      return await clearBasket(customerId);
    } catch (error) {
      return rejectWithValue(error as TAPIError);
    }
  }
);