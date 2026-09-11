import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import cls from './MobileMenu.module.scss';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { MobileMenuItem } from './MobileMenuItem/MobileMenuItem';
import { MobileMenuAccordion } from './MobileMenuAccordion/MobileMenuAccordion';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { ROUTES, PRODUCT_TYPES_SEGMENTS } from '../../../../constants/routes';
import {
  PRIMARY_FILTER_FIELD_BY_TYPE,
  productTypeArray,
  productTypeLabels,
} from '../../../../constants/productTypes';
import { filtersConfigSelector } from '../../../../store/filters/selectors';
import { isAuthenticatedSelector } from '../../../../store/auth/selectors';
import { useAuthModal } from '../../../AuthModal/AuthModalContext';

export interface IMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<IMobileMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const filtersConfig = useSelector(filtersConfigSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { openAuthModal } = useAuthModal();

  const handleProfileClick = () => {
    onClose();
    if (isAuthenticated) {
      router.push(ROUTES.profile);
    } else {
      openAuthModal();
    }
  };

  return (
    <Backdrop
      backdropClassName={cls.backdrop}
      contentClassName={cls.backdropContent}
      isOpen={isOpen}
      animation="rightSide"
      withCancelIcon
      onClickCancelIcon={onClose}
    >
      <div className={cls.content}>
        <MobileMenuItem iconType={IconType.Profile_24} onClick={handleProfileClick}>
          Личный кабинет
        </MobileMenuItem>
        <MobileMenuItem iconType={IconType.Heart_24} href={ROUTES.saved} onClick={onClose}>
          Избранное
        </MobileMenuItem>
        <MobileMenuItem iconType={IconType.Basket_24} href={ROUTES.basket} onClick={onClose}>
          Корзина
        </MobileMenuItem>

        {productTypeArray.map((type) => {
          const categoryHref = PRODUCT_TYPES_SEGMENTS[type];
          const categoryLabel = productTypeLabels[type];
          const quickFilterField = PRIMARY_FILTER_FIELD_BY_TYPE[type];
          const quickFilter = quickFilterField
            ? filtersConfig?.[type]?.[quickFilterField]
            : undefined;
          const options =
            quickFilter?.type === 'multi_select' ? quickFilter.options : [];

          if (options.length === 0) {
            return (
              <Link key={type} className={cls.link} href={categoryHref} onClick={onClose}>
                {categoryLabel}
              </Link>
            );
          }

          const accordionOptions = [
            { name: `Все ${categoryLabel.toLowerCase()}`, href: categoryHref },
            ...options.map((option) => ({
              name: option.label,
              // Каталог матчит по значению label, а не по слагу value —
              // см. MultiSelectFilter.tsx (десктопные фильтры делают так же).
              href: `${categoryHref}?${quickFilterField}=${encodeURIComponent(option.label)}`,
            })),
          ];

          return (
            <MobileMenuAccordion
              key={type}
              option={accordionOptions}
              title={categoryLabel}
              onLinkClick={onClose}
            />
          );
        })}

        <Link className={cls.link} href="/" onClick={onClose}>
          О нас
        </Link>
        <Link className={cls.link} href={ROUTES.privateEvents} onClick={onClose}>
          Частные мероприятия
        </Link>
      </div>
    </Backdrop>
  );
};
