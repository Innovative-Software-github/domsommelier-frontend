/** Достаёт человекочитаемое сообщение из тела ошибки бэка (ApiErrorResponse) или даёт фолбэк по статусу. */
export function extractApiErrorMessage(status: number, errorBody: unknown): string {
  if (errorBody && typeof errorBody === 'object') {
    const body = errorBody as { message?: unknown; error?: unknown };
    if (typeof body.message === 'string' && body.message.trim()) {
      return body.message.trim();
    }
    if (typeof body.error === 'string' && body.error.trim()) {
      return body.error.trim();
    }
  }
  if (status >= 500) return 'Ошибка сервера. Попробуйте позже.';
  if (status === 404) return 'Запрашиваемые данные не найдены.';
  if (status === 403) return 'Недостаточно прав для этого действия.';
  return 'Что-то пошло не так. Попробуйте ещё раз.';
}

/**
 * Показывает тост с ошибкой от бэка. Работает только в браузере (на сервере тостов нет).
 * 401 намеренно пропускаем — истёкшую сессию обрабатывает auth-флоу (событие auth:session-expired).
 */
export async function notifyApiError(status: number, errorBody: unknown): Promise<void> {
  if (typeof window === 'undefined' || status === 401) return;
  try {
    const { toast } = await import('sonner');
    toast.error(extractApiErrorMessage(status, errorBody));
  } catch {
    // sonner недоступен — молча игнорируем, чтобы не ломать обработку запроса
  }
}

/**
 * Показывает тост при сетевой ошибке (запрос не дошёл до сервера вообще: нет соединения,
 * таймаут, DNS, CORS и т.п.) — в отличие от notifyApiError это не HTTP-статус, а сбой
 * самого fetch(). Тоже только в браузере: на сервере (SSR) тостов нет, там сбой нужно
 * гасить фолбэком на вызывающей стороне, а не пытаться уведомить пользователя.
 */
export async function notifyNetworkError(
  message = 'Не удалось подключиться к серверу. Проверьте интернет-соединение и попробуйте ещё раз.',
): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { toast } = await import('sonner');
    toast.error(message);
  } catch {
    // sonner недоступен — молча игнорируем, чтобы не ломать обработку запроса
  }
}
