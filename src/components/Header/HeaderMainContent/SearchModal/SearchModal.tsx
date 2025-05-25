import React from 'react';

import cls from './SearchModal.module.scss';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { Input } from '../../../../ui/Input/Input';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { Icon } from '../../../../ui/Icon/Icon';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { Button } from '../../../../ui/Button/Button';
import { SearchModalHeader } from './SearchModalHeader/SearchModalHeader';
import { SearchModalBody } from './SearchModalBody/SearchModalBody';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { useBackdropClose } from '../../../../hooks/useBackdropClose';

export interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<ISearchModalProps> = ({
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
    <Backdrop
      ref={backdropRef}
      backdropClassName={cls.backdrop}
      contentClassName={cls.content}
      isOpen={isOpen}
    >
      <ContentContainer className={cls.container}>
        <SearchModalHeader onClose={onClose} />
        <SearchModalBody />
      </ContentContainer>
    </Backdrop>
  );
};
