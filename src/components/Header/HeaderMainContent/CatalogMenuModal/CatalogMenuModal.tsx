import * as React from 'react';

import cls from './CatalogMenuModal.module.scss';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import clsx from 'clsx';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { CatalogMenuContent } from './CatalogMenuContent/CatalogMenuContent';

export interface ICatalogMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogMenuModal: React.FC<ICatalogMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  useBodyScrollLock(isOpen);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      className={clsx(cls.backdrop, { [cls.open]: isOpen })}
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-menu-modal"
    >
      <div className={cls.container} data-modal tabIndex={-1}>
        <CatalogMenuContent />
      </div>
    </div>
  );
};
