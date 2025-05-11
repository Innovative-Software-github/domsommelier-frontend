import * as React from 'react';

import cls from './SearchSidebarBlock.module.scss';
import Link from 'next/link';

export interface ISearchSidebarBlockProps {
  title: string;
  options: string[];
}

export const SearchSidebarBlock: React.FC<ISearchSidebarBlockProps> = ({
  title,
  options,
}) => {
  return (
    <div className={cls.container}>
      <div className={cls.title}>{title}</div>
      {options.map((option, index) => (
        <Link key={index} href="/" className={cls.link}>
          {option}
        </Link>
      ))}
    </div>
  );
};
