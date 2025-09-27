import { IBasketBase } from '../../services/basket/interfaces';
import { IBasketReducer, initialBasketState } from './reducers';

export const createBasketInitialState = (preloadedBasket?: IBasketBase): IBasketReducer => {
  if (preloadedBasket) {
    return {
      ...initialBasketState,
      basket: preloadedBasket,
    };
  }

  return initialBasketState;
};
