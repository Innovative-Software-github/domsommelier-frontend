import React from 'react';

import cls from './HeaderCatalogLinks.module.scss';
import { catalogLinks } from '@/components/Header/HeaderCatalogLinks/utils';
import Link from 'next/link';
import clsx from 'clsx';

export const HeaderCatalogLinks = () => {
  return (
    <div className={cls.container}>
      {catalogLinks.map((catalogLink) => (
        <Link
          key={catalogLink.label}
          href={catalogLink.link}
          className={clsx(cls.link, {
            [cls.primaryLink]: catalogLink.isPrimary,
          })}
        >
          {catalogLink.label}
        </Link>
      ))}
    </div>
  );
};
