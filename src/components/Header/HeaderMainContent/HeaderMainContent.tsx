import React from 'react';
import Image from 'next/image';

import cls from './HeaderMainContent.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { IconLink } from '@/components/Header/HeaderMainContent/IconLink/IconLink';

export const HeaderMainContent: React.FC = () => {
  return (
    <div className={cls.container}>
      {/* todo: Заменить на ui компонент Button */}
      <div>
        <button className={cls.catalogButton}>Каталог</button>
        <Icon type={IconType.Search_24} width={24} height={24} />
      </div>

      <div className={cls.logo}>
        <Image src="/logotype.png" alt="logotype" width={271} height={45} />
      </div>

      <div className={cls.links}>
        <IconLink href="/" iconType={IconType.Basket_24} />
        <IconLink href="/" iconType={IconType.Heart_24} />
        <IconLink href="/" iconType={IconType.Profile_24} />
      </div>
    </div>
  );
};
