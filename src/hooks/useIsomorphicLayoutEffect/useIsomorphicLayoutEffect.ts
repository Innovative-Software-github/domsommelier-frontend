import * as React from 'react';

/**
 * `useLayoutEffect` который не показывает предупреждение при server-side рендеринге.
 *
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
