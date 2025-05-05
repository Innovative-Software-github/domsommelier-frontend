'use client';

import Link from 'next/link';
import cls from './CategoryLink.module.scss';
import { Icon } from '../../../../ui/Icon/Icon';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { MediaQuery } from '../../../../constants/media';
import { useMediaQuery } from 'react-responsive';
import { useIsServer } from '../../../../hooks/useIsServer';

export interface ICategoryLink {
  label: string;
  href: string;
}

export const CategoryLink: React.FC<ICategoryLink> = ({ label, href }) => {
  const isTablet = useMediaQuery({ maxWidth: MediaQuery.Tablet });
  const isMobile = useMediaQuery({ maxWidth: MediaQuery.Mobile });
  const isServer = useIsServer();

  const renderIcon = () => {
    if (isMobile) {
      return (
        <Icon
          className={cls.icon}
          type={IconType.ArrowUpRight_24}
          width={24}
          height={24}
        />
      );
    }

    if (isTablet) {
      return (
        <Icon
          className={cls.icon}
          type={IconType.ArrowUpRight_40}
          width={40}
          height={40}
        />
      );
    }

    return (
      <Icon
        className={cls.icon}
        type={IconType.ArrowUpRight_80}
        width={60}
        height={60}
      />
    );
  };

  return (
    <Link className={cls.container} href={href}>
      <div className={cls.label}>{label}</div>
      {!isServer && renderIcon()}
    </Link>
  );
};
