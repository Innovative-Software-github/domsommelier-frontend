import * as React from 'react';
import Link from 'next/link';

import cls from './SearchSidebarBlock.module.scss';

export interface ISearchSidebarItem {
  label: string;
  /** Ссылка — переход на страницу; без неё пункт — кнопка с onClick. */
  href?: string;
  onClick?: () => void;
}

export interface ISearchSidebarBlockProps {
  title: string;
  items: ISearchSidebarItem[];
  action?: { label: string; onClick: () => void };
}

export const SearchSidebarBlock: React.FC<ISearchSidebarBlockProps> = ({
  title,
  items,
  action,
}) => {
  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <div className={cls.title}>{title}</div>
        {action && (
          <button type="button" className={cls.action} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} href={item.href} className={cls.link} onClick={item.onClick}>
            {item.label}
          </Link>
        ) : (
          <button key={item.label} type="button" className={cls.link} onClick={item.onClick}>
            {item.label}
          </button>
        ),
      )}
    </div>
  );
};
