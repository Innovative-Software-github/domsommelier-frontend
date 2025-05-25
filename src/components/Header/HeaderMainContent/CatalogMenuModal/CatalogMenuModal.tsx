import * as React from 'react';

import cls from './CatalogMenuModal.module.scss';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import clsx from 'clsx';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { CatalogMenuContent } from './CatalogMenuContent/CatalogMenuContent';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';

export interface ICatalogMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogMenuModal: React.FC<ICatalogMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Backdrop isOpen={isOpen} onClickCancelIcon={onClose}>
      <CatalogMenuContent />
    </Backdrop>
  );
};
