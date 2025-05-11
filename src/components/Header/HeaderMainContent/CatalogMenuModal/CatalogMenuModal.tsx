import * as React from 'react';

import cls from './CatalogMenuModal.module.scss';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import clsx from 'clsx';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { CatalogMenuContent } from './CatalogMenuContent/CatalogMenuContent';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { useBackdropClose } from '../../../../hooks/useBackdropClose';

export interface ICatalogMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogMenuModal: React.FC<ICatalogMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  useBodyScrollLock(isOpen);

  const backdropRef = useBackdropClose(onClose);

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
    <Backdrop ref={backdropRef} isOpen={isOpen}>
      <CatalogMenuContent />
    </Backdrop>
  );
};
