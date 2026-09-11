import { useCallback, useSyncExternalStore } from 'react';
import { MediaQuery } from '../constants/media';

/**
 * Хук, возвращающий контекст в зависимости от ширины экрана - мобильный или десктопный.
 *
 * На сервере ширины экрана нет, поэтому SSR всегда рендерит десктоп. Раньше тут
 * был useMediaQuery из react-responsive, который на клиенте сразу отдавал
 * реальную ширину, — на планшетах и телефонах разметка расходилась с серверной
 * и React падал с ошибкой гидратации. useSyncExternalStore при гидратации берёт
 * серверный снапшот, а реальную ширину применяет следующим рендером.
 *
 * @param {(string | number)} [maxWidth=MediaQuery.BigMobile] максимальная ширина экрана для выполнения медиа запроса
 * @returns {('mobile' | 'desktop')}
 */
export function useMediaContext(
  maxWidth: string | number = MediaQuery.BigMobile,
): 'mobile' | 'desktop' {
  const query = `(max-width: ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth})`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);

      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    [query],
  );

  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );

  return isMobile ? 'mobile' : 'desktop';
}
