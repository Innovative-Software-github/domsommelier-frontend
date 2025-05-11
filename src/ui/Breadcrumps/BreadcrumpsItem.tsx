import React from 'react';
import clsx from 'clsx';

import cls from './Breadcrumps.module.scss';
import Link from 'next/link';
import { IBreadcrumps, IBreadcrumpsOption } from './Breadcrumps';
import { BreadcrumpsSeparator } from './BreadcrumpsSeparator';

export interface IBreadcrumpsItem {
  option: IBreadcrumpsOption;
  separator: IBreadcrumps['separator'];
  isLastItem: boolean;
}

export const BreadcrumpsItem: React.FC<IBreadcrumpsItem> = ({
  option,
  separator,
  isLastItem,
}) => {
  const { name, href } = option;

  if (!isLastItem && href) {
    return (
      <>
        <Link
          className={clsx(cls.breadcrumpItem, {
            [cls.lastBreadcrumpItem]: isLastItem,
          })}
          href={href}
        >
          {name}
        </Link>
        {!isLastItem && <BreadcrumpsSeparator separator={separator} />}
      </>
    );
  }

  return (
    <>
      <span
        className={clsx(cls.breadcrumpItem, {
          [cls.lastBreadcrumpItem]: isLastItem,
        })}
      >
        {name}
      </span>
      {!isLastItem && <BreadcrumpsSeparator separator={separator} />}
    </>
  );
};
