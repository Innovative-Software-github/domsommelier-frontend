'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { SearchInput } from '@/features/search/components/SearchInput/SearchInput';
import { getSearchUrl } from '@/constants/routes';
import { Button } from '../../../../../ui/Button/Button';
import cls from './SearchModalHeader.module.scss';

export interface ISearchModalHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  autoFocus?: boolean;
  onClose: () => void;
}

export const SearchModalHeader: React.FC<ISearchModalHeaderProps> = ({
  query,
  onQueryChange,
  autoFocus = false,
  onClose,
}) => {
  const router = useRouter();

  const handleSubmit = (text: string) => {
    router.push(getSearchUrl(text));
    onClose();
  };

  return (
    <div className={cls.header}>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        onSubmit={handleSubmit}
        autoFocus={autoFocus}
      />
      <Button
        className={cls.closeButton}
        variant="darkOutlined"
        height="H-42"
        onClick={onClose}
      >
        Закрыть
      </Button>
    </div>
  );
};
