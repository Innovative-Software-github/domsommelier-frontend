import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import Link from 'next/link';
import React from 'react';

export interface IIconLinkProps {
  href: string;
  iconType: IconType;
}

export const IconLink: React.FC<IIconLinkProps> = ({ href, iconType }) => {
  return (
    <Link href={href}>
      <Icon type={iconType} width={24} height={24} />
    </Link>
  );
};
