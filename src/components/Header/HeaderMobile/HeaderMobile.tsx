import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import cls from './HeaderMobile.module.scss';
import Image from 'next/image';
import { Input } from '../../../ui/Input/Input';
import { Icon } from '../../../ui/Icon/Icon';
import { IconType } from '../../../ui/Icon/IconsMapping';

export const HeaderMobile: React.FC = () => {
  const inputPrefix = <Icon type={IconType.Search_24} width={24} height={24} />;

  return (
    <header className={cls.header}>
      <ContentContainer className={cls.container}>
        <Image
          src="/mobileLogotype.png"
          alt="Логотип на мобильные устройства"
          width={72}
          height={72}
        />
        <Input
          className={cls.input}
          elPrefix={inputPrefix}
          placeholder="Вино"
        />

        <button className={cls.burgerMenuButton}>
          <Icon type={IconType.Hamburger_24} width={24} height={24} />
        </button>
      </ContentContainer>
    </header>
  );
};
