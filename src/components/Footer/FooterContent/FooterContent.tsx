'use client';

import React from 'react';
import Link from 'next/link';
import { routes } from '../../../constants/routes/routes';
import cls from './FooterContent.module.scss';
import { companyContactsConstant } from '../../../constants/contacts';
import { ContactBlock } from './ContactBlock/ContactBlock';
import { Checkbox } from '@/ui/Checkbox/Checkbox';
import { TTheme } from '@/constants/theme';
import { Input } from '../../../ui/Input/Input';
import { Button } from '../../../ui/Button/Button';
import { FooterSubscription } from './FooterSubscription/FooterSubscription';
import { FooterNavigation } from './FooterNavigation/FooterNavigation';
import { FooterContacts } from './FooterContacts/FooterContacts';

export interface IFooterContent {
  theme: TTheme;
}

export const FooterContent: React.FC<IFooterContent> = ({ theme }) => {
  return (
    <div className={cls.content}>
      <div className={cls.navigationAndContactsBlock}>
        <FooterNavigation />
        <FooterContacts />
      </div>
      <div className={cls.subscriptionBlock}>
        <FooterSubscription theme={theme} />
      </div>
    </div>
  );
};
