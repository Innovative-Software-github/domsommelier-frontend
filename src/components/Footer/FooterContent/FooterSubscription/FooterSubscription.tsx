'use client';

import React from 'react';
import cls from './FooterSubscription.module.scss';
import { Checkbox } from '@/ui/Checkbox/Checkbox';
import { TTheme } from '@/constants/theme';
import { Input } from '../../../../ui/Input/Input';
import { Button } from '../../../../ui/Button/Button';

export interface IFooterSubscription {
  theme: TTheme;
}

export const FooterSubscription: React.FC<IFooterSubscription> = ({
  theme,
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <div className={cls.title}>Узнавай о всех новинках первым</div>
      <Input className={cls.emailInput} placeholder="Введите свою почту" />

      <Checkbox
        theme={theme === 'white' ? 'wineRed' : 'white'}
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      >
        Подписаться на наши новости
      </Checkbox>

      <Button className={cls.subscribeButton} variant="outlined">
        Подписаться на новости
      </Button>
    </div>
  );
};
