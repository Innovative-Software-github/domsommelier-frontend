import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSaved } from './useSaved';
import { isProductSavedSelector } from '../../store/saved/selectors';
import { TSavedProductId } from '../../services/saved/interfaces';
import { IStore } from '../../store/interfaces';
import { ROUTES } from '../../constants/routes';

export const useProductSaved = (productId: TSavedProductId) => {
  const { addToSaved, removeFromSaved, clearSaved, isSavedLoading, productLoadingStates } =
    useSaved();
  const router = useRouter();

  const isSaved = useSelector((state: IStore) => isProductSavedSelector(state, productId));

  const isProductSavedLoading = useMemo(
    () => productLoadingStates.get(productId) ?? false,
    [productLoadingStates, productId],
  );

  const handleToggleSaved = useCallback(async () => {
    // add/remove возвращают null, если пользователь не вошёл (открылась модалка
    // входа) — тогда ничего не произошло и тост не нужен. Ошибки запроса уже
    // показаны тостом в customFetch, здесь их только гасим, чтобы промис из
    // onClick не падал необработанным.
    try {
      if (isSaved) {
        const result = await removeFromSaved(productId);
        if (result) {
          toast('Товар удалён из избранного', {
            action: {
              label: 'Вернуть',
              onClick: () => addToSaved(productId).catch(() => {}),
            },
          });
        }
      } else {
        const result = await addToSaved(productId);
        if (result) {
          toast.success('Товар добавлен в избранное', {
            action: {
              label: 'Перейти',
              onClick: () => router.push(ROUTES.saved),
            },
          });
        }
      }
    } catch {}
  }, [isSaved, removeFromSaved, addToSaved, productId, router]);

  return {
    isSaved,
    handleToggleSaved,
    removeFromSaved,
    clearSaved,
    isSavedLoading,
    isProductSavedLoading,
  };
};
