import React from 'react';
import Image from 'next/image';

import cls from './HeaderMainContent.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { IconLink } from '@/components/Header/HeaderMainContent/IconLink/IconLink';
import { Button } from '../../../ui/Button/Button';
import { CatalogMenuModal } from './CatalogMenuModal/CatalogMenuModal';
import { SearchModal } from './SearchModal/SearchModal';

export const HeaderMainContent: React.FC = () => {
  const [isCatalogMenuModalOpen, setIsCatalogMenuModalOpen] =
    React.useState(false);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <div className={cls.container}>
      <div className={cls.catalogButton}>
        <Button
          rightIconType={
            isCatalogMenuModalOpen
              ? IconType.ArrowDown_24
              : IconType.Hamburger_24
          }
          height="H-42"
          onClick={() => setIsCatalogMenuModalOpen((prev) => !prev)}
        >
          Каталог
        </Button>
        <button
          className={cls.searchButton}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        >
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

      <CatalogMenuModal
        isOpen={isCatalogMenuModalOpen}
        onClose={() => setIsCatalogMenuModalOpen(false)}
      />

      <SearchModal isOpen={isSearchOpen} />
    </div>
  );
};
