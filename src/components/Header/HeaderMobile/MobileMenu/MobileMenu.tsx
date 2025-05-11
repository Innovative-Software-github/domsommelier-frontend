import * as React from 'react';
import cls from './MobileMenu.module.scss';
import clsx from 'clsx';
import { Icon } from '../../../../ui/Icon/Icon';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { MobileMenuItem } from './MobileMenuItem/MobileMenuItem';
import { MobileMenuAccordion } from './MobileMenuAccordion/MobileMenuAccordion';
import Link from 'next/link';

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
  useBodyScrollLock(isOpen);

  return (
    <div
      className={clsx(cls.container, {
        [cls.open]: isOpen,
      })}
    >
      <div className={cls.header}>
        <button type="button" className={cls.closeButton} onClick={onClose}>
          <Icon type={IconType.Cancel_24} width={24} height={24} />
        </button>
      </div>
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
    </div>
  );
};
