import * as React from 'react';

/**
 * Закрывает модалку при клике на подложку (вне контента модалки).
 * Возвращает ref, который следует повесить на элемент-подложку.
 */
export const useBackdropClose = (
  onClose: () => void,
): React.RefObject<HTMLDivElement | null> => {
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target === backdropRef.current) {
        onClose();
      }
    };

    const node = backdropRef.current;
    if (node) node.addEventListener('click', handleClick);

    return () => {
      if (node) node.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return backdropRef;
};
