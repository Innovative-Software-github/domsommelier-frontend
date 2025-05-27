'use client';

import React from 'react';
import cls from './FooterContent.module.scss';
import { TTheme } from '@/constants/theme';
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
