import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Хук, позволяющий определить в каком окружении выполняется код.
 *
 * @returns {boolean} true для серверного окружения, false - для браузера.
 */
export function useIsServer(): boolean {
  const [isServer, setIsServer] = React.useState(true);

  useIsomorphicLayoutEffect(() => {
    setIsServer(false);
  }, []);

  return isServer;
}
