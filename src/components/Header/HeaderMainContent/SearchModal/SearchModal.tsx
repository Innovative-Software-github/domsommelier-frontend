import React from 'react';

import cls from './SearchModal.module.scss';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { SearchModalHeader } from './SearchModalHeader/SearchModalHeader';
import { SearchModalBody } from './SearchModalBody/SearchModalBody';

export interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<ISearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  return (
    <Backdrop
      onClickCancelIcon={onClose}
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
        <SearchModalBody query={query} onQueryChange={setQuery} onNavigate={onClose} />
      </ContentContainer>
    </Backdrop>
  );
};
