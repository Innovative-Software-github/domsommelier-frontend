'use client';

import { useEffect } from 'react';
import { notifyNetworkError } from '@/utils/apiError';

export interface IServerErrorToastProps {
  message?: string;
}

/**
 * Мост «сервер → тост». Часть данных грузится на сервере при SSR (RootLayout,
 * серверные страницы каталога/мероприятий) — если запрос там не удался,
 * страница всё равно рендерится с фолбэком (см. соответствующие page.tsx),
 * но показать тост в момент сбоя невозможно: браузера ещё нет. Этот компонент
 * оказывается в разметке только когда что-то из серверных данных не
 * загрузилось, и при гидратации на клиенте показывает тот же тост, что
 * показал бы обычный клиентский запрос через notifyApiError/notifyNetworkError.
 */
export function ServerErrorToast({ message }: IServerErrorToastProps) {
  useEffect(() => {
    void notifyNetworkError(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
