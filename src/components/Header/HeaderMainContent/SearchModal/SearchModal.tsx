import React from 'react';

import cls from './SearchModal.module.scss';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { SearchModalHeader } from './SearchModalHeader/SearchModalHeader';
import { SearchModalBody } from './SearchModalBody/SearchModalBody';
import { useBackdropClose } from '../../../../hooks/useBackdropClose';

export interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<ISearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = React.useState('');

  const backdropRef = useBackdropClose(onClose);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

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
        <SearchModalHeader
          query={query}
          onQueryChange={setQuery}
          autoFocus={isOpen}
          onClose={onClose}
        />
        <SearchModalBody query={query} />
      </ContentContainer>
    </Backdrop>
  );
};
