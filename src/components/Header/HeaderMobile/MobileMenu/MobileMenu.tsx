import * as React from 'react';
import cls from './MobileMenu.module.scss';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { MobileMenuItem } from './MobileMenuItem/MobileMenuItem';
import { MobileMenuAccordion } from './MobileMenuAccordion/MobileMenuAccordion';
import Link from 'next/link';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';

export interface IMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockOption = [
  {
    href: '/',
    name: 'Белое',
  },
  {
    href: '/',
    name: 'Красное',
  },
  {
    href: '/',
    name: 'Сухое',
  },
  {
    href: '/',
    name: 'Сладкое',
  },
];

export const MobileMenu: React.FC<IMobileMenuProps> = ({ isOpen, onClose }) => {
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
        <MobileMenuItem iconType={IconType.Profile_24}>
          Личный кабинет
        </MobileMenuItem>
        <MobileMenuItem iconType={IconType.Heart_24}>Избранное</MobileMenuItem>
        <MobileMenuItem iconType={IconType.Basket_24}>Корзина</MobileMenuItem>
        <MobileMenuAccordion option={mockOption} title="Вино" />
        <MobileMenuAccordion
          option={mockOption}
          title="Шампанское и игристые"
        />
        <MobileMenuAccordion option={mockOption} title="Крепкое" />
        <MobileMenuAccordion option={mockOption} title="Закуски" />
        <MobileMenuAccordion option={mockOption} title="Аксессуары" />
        <Link className={cls.link} href="/">
          О нас
        </Link>
        <Link className={cls.link} href="/">
          Инвестиции
        </Link>
        <Link className={cls.link} href="/">
          Инвестиции
        </Link>
      </div>
    </Backdrop>
  );
};
