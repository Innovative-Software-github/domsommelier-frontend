import { ISavedBase } from '../../services/saved/interfaces';
import { ISavedReducer, initialSavedState } from './reducers';

export const createSavedInitialState = (preloadedSaved?: ISavedBase | null): ISavedReducer => {
  if (preloadedSaved) {
    return {
      ...initialSavedState,
      saved: preloadedSaved,
    };
  }

  return initialSavedState;
};
