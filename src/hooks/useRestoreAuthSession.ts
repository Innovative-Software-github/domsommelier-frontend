import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tokenStorage } from '@/services/auth/tokenStorage';
import { restoreSessionAction, logoutAction } from '@/store/auth/actions';
import { getProfile } from '@/services/customer/requests';

/**
 * Восстанавливает сессию авторизации из localStorage при монтировании.
 * После восстановления валидирует токен через GET /customer/profile.
 * При 401 (протухший токен / пересозданная БД) — выполняет авто-logout.
 * При успехе синхронизирует customerId на случай пересоздания БД с тем же email.
 * Вызывать один раз на уровне провайдеров.
 */
export const useRestoreAuthSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = tokenStorage.getToken();
    const customer = tokenStorage.getCustomer();

    if (!token || !customer) return;

    dispatch(restoreSessionAction(customer));

      getProfile()
      .then((profile) => {
        tokenStorage.setCustomer(profile);
        dispatch(restoreSessionAction(profile));
      })
      .catch(() => {
        tokenStorage.clear();
        dispatch(logoutAction());
      });
  }, [dispatch]);
};
