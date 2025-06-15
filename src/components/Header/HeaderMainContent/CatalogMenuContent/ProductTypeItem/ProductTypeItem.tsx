import * as React from 'react';

import cls from './ProductTypeItem.module.scss';
import { Icon } from '../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../ui/Icon/IconsMapping';
import clsx from 'clsx';

export interface IProductTypeItemProps {
  isActiveCategory: boolean;
  title: string;
  onMouseEnter: () => void;
}

export const ProductTypeItem: React.FC<IProductTypeItemProps> = ({
  isActiveCategory,
  title,
  onMouseEnter,
}) => {
  return (
    <div
      className={clsx(cls.catogoryCard, {
        [cls.activeCategory]: isActiveCategory,
      })}
      onMouseEnter={onMouseEnter}
    >
      {title}
      <Icon
        className={cls.arrowIcon}
        type={IconType.ArrowRight_24}
        width={24}
        height={24}
      />
    </div>
  );
};
