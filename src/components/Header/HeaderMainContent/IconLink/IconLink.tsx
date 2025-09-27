import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import Link from 'next/link';
import React from 'react';
import cls from './IconLink.module.scss';

export interface IIconLinkProps {
  href: string;
  iconType: IconType;
  badgeCount?: number;
  showBadge?: boolean;
}

export const IconLink: React.FC<IIconLinkProps> = ({ 
  href, 
  iconType, 
  badgeCount = 0, 
  showBadge = false 
}) => {
  return (
    <Link href={href} className={cls.link}>
      <div className={cls.iconContainer}>
        <Icon type={iconType} width={24} height={24} />
        {showBadge && badgeCount > 0 && (
          <span className={cls.badge}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </div>
    </Link>
  );
};
