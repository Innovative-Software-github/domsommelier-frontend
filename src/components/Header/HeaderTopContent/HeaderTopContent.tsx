import React from 'react';
import Link from 'next/link';
import { headerTopContentLinks } from '@/components/Header/HeaderTopContent/utils';
import cls from './HeaderTopContent.module.scss';

export const HeaderTopContent: React.FC = () => {
  return (
    <div className={cls.container}>
      <div className={cls.links}>
        {headerTopContentLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={cls.contacts}>
        {/* todo: Сейчас тут моки, будут полноценный компонент с выпадающим списоком */}
        <p className={cls.location}>Комсомольский проспект д.14</p>
        <p className={cls.photo}>+7 (342) 202 05 55</p>
      </div>
    </div>
  );
};
