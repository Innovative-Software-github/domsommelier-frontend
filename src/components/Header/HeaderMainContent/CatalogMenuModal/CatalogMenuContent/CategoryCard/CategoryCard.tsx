import * as React from 'react';

import cls from './CategoryCard.module.scss';
import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';
import clsx from 'clsx';

export interface ICategoryCardProps {
  isActiveCategory: boolean;
  title: string;
  onMouseEnter: () => void;
}

export const CategoryCard: React.FC<ICategoryCardProps> = ({
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
