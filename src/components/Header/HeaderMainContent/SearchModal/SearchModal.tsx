import React from 'react';

import cls from './SearchModal.module.scss';
import clsx from 'clsx';

export interface ISearchModalProps {
  isOpen: boolean;
}

export const SearchModal: React.FC<ISearchModalProps> = ({ isOpen }) => {
  return (
    <section
      className={clsx(cls.container, {
        [cls.open]: isOpen,
      })}
    >
      skjdf
    </section>
  );
};
