import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tokenStorage } from '@/services/auth/tokenStorage';
import { restoreSessionAction } from '@/store/auth/actions';

/**
 * Восстанавливает сессию авторизации из localStorage при монтировании.
 * Вызывать один раз на уровне провайдеров.
 */
export const useRestoreAuthSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = tokenStorage.getToken();
    const user = tokenStorage.getUser();

    if (token && user) {
      dispatch(restoreSessionAction(user));
    }
  }, [dispatch]);
};

