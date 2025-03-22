import React from 'react';
import Link from 'next/link';
import { routes } from '../../../../constants/routes';
import cls from './FooterNavigation.module.scss';

export const FooterNavigation: React.FC = () => {
  return (
    <nav className={cls.navigationLinks}>
      {Object.values(routes).map((route) => (
        <Link key={route.label} href={route.href}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
