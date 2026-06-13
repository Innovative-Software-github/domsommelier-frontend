import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSaved } from './useSaved';
import { isProductSavedSelector } from '../../store/saved/selectors';
import { TSavedProductId } from '../../services/saved/interfaces';
import { IStore } from '../../store/interfaces';

export const useProductSaved = (productId: TSavedProductId) => {
  const { addToSaved, removeFromSaved, clearSaved, isSavedLoading, productLoadingStates } =
    useSaved();

  const isSaved = useSelector((state: IStore) => isProductSavedSelector(state, productId));

  const isProductSavedLoading = useMemo(
    () => productLoadingStates.get(productId) ?? false,
    [productLoadingStates, productId],
  );

  const handleToggleSaved = useCallback(async () => {
    if (isSaved) {
      await removeFromSaved(productId);
    } else {
      await addToSaved(productId);
    }
  }, [isSaved, removeFromSaved, addToSaved, productId]);

  return {
    isSaved,
    handleToggleSaved,
    removeFromSaved,
    clearSaved,
    isSavedLoading,
    isProductSavedLoading,
  };
};
