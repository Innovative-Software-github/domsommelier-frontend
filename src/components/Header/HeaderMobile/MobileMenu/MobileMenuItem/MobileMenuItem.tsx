import * as React from 'react';
import Link from 'next/link';
import cls from './MobileMenuItem.module.scss';
import { IconType } from '../../../../../ui/Icon/IconsMapping';
import { Icon } from '../../../../../ui/Icon/Icon';

export interface IMobileMenuItemProps extends React.PropsWithChildren {
  iconType: IconType;
  href?: string;
  onClick?: () => void;
}

export const MobileMenuItem: React.FC<IMobileMenuItemProps> = ({
  iconType,
  href,
  onClick,
  children,
}) => {
  const content = (
    <>
      <Icon type={iconType} width={24} height={24} />
      {children}
    </>
  );

  if (href) {
    return (
      <Link className={cls.container} href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cls.container} onClick={onClick}>
      {content}
    </button>
  );
};
