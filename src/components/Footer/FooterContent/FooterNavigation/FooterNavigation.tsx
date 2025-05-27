import React from 'react';
import Link from 'next/link';
import cls from './FooterNavigation.module.scss';
import { footerNavigationRoutes } from './utils';

export const FooterNavigation: React.FC = () => {
  return (
    <nav className={cls.navigationLinks}>
      {footerNavigationRoutes.map((route) => (
        <Link key={route.label} href={route.href}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
