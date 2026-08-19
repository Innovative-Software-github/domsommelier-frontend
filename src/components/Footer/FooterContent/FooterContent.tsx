'use client';

import React from 'react';
import cls from './FooterContent.module.scss';
import { TTheme } from '@/constants/theme';
// TODO: подписка на новости временно скрыта из UI, см. FooterSubscription.tsx
// import { FooterSubscription } from './FooterSubscription/FooterSubscription';
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
      {/* TODO: промокоды/подписка временно скрыты из UI, см. FooterSubscription.tsx.
          Блок-обёртку тоже не рендерим — у .subscriptionBlock min-width: 360px
          и родитель на justify-content: space-between, пустой блок оставит дыру. */}
      {/* <div className={cls.subscriptionBlock}>
        <FooterSubscription theme={theme} />
      </div> */}
    </div>
  );
};
