import * as React from 'react';
import cls from './MobileMenuItem.module.scss';
import { IconType } from '../../../../../ui/Icon/IconsMapping';
import { Icon } from '../../../../../ui/Icon/Icon';

export interface IMobileMenuItemProps extends React.PropsWithChildren {
  iconType: IconType;
}

export const MobileMenuItem: React.FC<IMobileMenuItemProps> = ({
  iconType,
  children,
}) => {
  return (
    <div className={cls.container}>
      <Icon type={iconType} width={24} height={24} />
      {children}
    </div>
  );
};
