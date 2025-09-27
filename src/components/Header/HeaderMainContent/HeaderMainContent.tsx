import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import cls from './HeaderMainContent.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { IconLink } from '@/components/Header/HeaderMainContent/IconLink/IconLink';
import { Button } from '../../../ui/Button/Button';
import { Backdrop } from '../../../ui/Backdrop/Backdrop';
import { CatalogMenuContent } from './CatalogMenuContent/CatalogMenuContent';
import { SearchModal } from './SearchModal/SearchModal';
import { ROUTES } from '../../../constants/routes';
import { basketItemsCountSelector } from '../../../store/basket/selectors';

export const HeaderMainContent: React.FC = () => {
  const [isCatalogMenuModalOpen, setIsCatalogMenuModalOpen] =
    React.useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  
  const cartTotalItems = useSelector(basketItemsCountSelector);

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
          onClick={() => setIsSearchModalOpen((prev) => !prev)}
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
          priority
        />
      </div>

      <div className={cls.links}>
        <IconLink 
          href={ROUTES.basket} 
          iconType={IconType.Basket_24} 
          badgeCount={cartTotalItems}
          showBadge
        />
        <IconLink href="/" iconType={IconType.Heart_24} />
        <IconLink href="/" iconType={IconType.Profile_24} />
      </div>

      <Backdrop
        isOpen={isCatalogMenuModalOpen}
        onClickCancelIcon={() => setIsCatalogMenuModalOpen(false)}
      >
        <CatalogMenuContent />
      </Backdrop>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};
