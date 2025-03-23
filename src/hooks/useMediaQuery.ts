import { useMediaQuery } from 'react-responsive';
import { MediaQuery } from '../constants/media';

/**
 * Хук, возвращающий контекст в зависимости от ширины экрана - мобильный или десктопный.
 *
 * @param {(string | number)} [maxWidth=MediaQuery.BigMobile] максимальная ширина экрана для выполнения медиа запроса
 * @returns {('mobile' | 'desktop')}
 */
export function useMediaContext(
  maxWidth: string | number = MediaQuery.BigMobile,
): 'mobile' | 'desktop' {
  const isMobile = useMediaQuery({ maxWidth });

  return isMobile ? 'mobile' : 'desktop';
}
