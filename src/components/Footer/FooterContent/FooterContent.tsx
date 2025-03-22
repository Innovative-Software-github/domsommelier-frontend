'use client';

import React from 'react';
import Link from 'next/link';
import { routes } from '../../../constants/routes';
import cls from './FooterContent.module.scss';
import { companyContactsConstant } from '../../../constants/contacts';
import { ContactBlock } from './ContactBlock/ContactBlock';
import { Checkbox } from '@/ui/Checkbox/Checkbox';
import { TTheme } from '@/constants/theme';

export interface IFooterContent {
  theme: TTheme;
}

export const FooterContent: React.FC<IFooterContent> = ({ theme }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className={cls.content}>
      <div className={cls.leftBlock}>
        <nav className={cls.navigationLinks}>
          {Object.values(routes).map((route) => (
            <Link key={route.label} href={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
        <div className={cls.contacts}>
          <ContactBlock
            label="Контакты"
            contents={[
              companyContactsConstant.formattedPhone,
              companyContactsConstant.email,
            ]}
          />
          <ContactBlock
            label="Адресс"
            contents={[companyContactsConstant.email]}
          />
          <ContactBlock
            label="Режим работы"
            contents={['ПН-ПТ 10:00 - 23:00', 'СБ-ВС 11:00 - 23:00']}
          />
        </div>
      </div>
      <div className={cls.rightBlock}>
        <Checkbox
          theme={theme === 'white' ? 'wineRed' : 'white'}
          checked={checked}
          onChange={() => setChecked((checked) => !checked)}
        >
          Подписаться на наши новости
        </Checkbox>
      </div>
    </div>
  );
};
