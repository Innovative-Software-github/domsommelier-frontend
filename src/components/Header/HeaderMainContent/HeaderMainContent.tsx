import React from 'react';
import Image from 'next/image';

import cls from './HeaderMainContent.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { IconLink } from '@/components/Header/HeaderMainContent/IconLink/IconLink';
import { Button } from '../../../ui/Button/Button';

export const HeaderMainContent: React.FC = () => {
  return (
    <div className={cls.container}>
      <div className={cls.catalogButton}>
        <Button rightIconType={IconType.Hamburger_24} height="H-42">
          Каталог
        </Button>
        <button className={cls.searchButton}>
          <Icon type={IconType.Search_24} width={24} height={24} />
        </button>
      </div>

      <div className={cls.logo}>
        <Image
          src="/logotype.png"
          alt="logotype"
          width={271}
          height={45}
          unoptimized
        />
      </div>

      <div className={cls.links}>
        <IconLink href="/" iconType={IconType.Basket_24} />
        <IconLink href="/" iconType={IconType.Heart_24} />
        <IconLink href="/" iconType={IconType.Profile_24} />
      </div>
    </div>
  );
};
