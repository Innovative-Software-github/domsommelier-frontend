import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { catalogLinks } from '../../../constants/catalogLinks';

import cls from './HeaderCatalogLinks.module.scss';

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
