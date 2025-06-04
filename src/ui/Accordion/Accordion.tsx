'use client';

import React from 'react';
import clsx from 'clsx';

import cls from './Accordion.module.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';

export type TAccordionVariant = 'regular' | 'compact';

export interface IAccordion extends React.PropsWithChildren {
  title: string;
  isDefaultOpen?: boolean;
  className?: string;
  variant?: TAccordionVariant;
  bodyClassName?: string;
}

export const Accordion: React.FC<IAccordion> = ({
  title,
  isDefaultOpen = false,
  variant = 'regular',
  children,
  className,
  bodyClassName,
}) => {
  const [isOpen, setIsOpen] = React.useState(isDefaultOpen);
  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={clsx(cls.container, className)}
      data-state={isOpen ? 'opened' : 'closed'}
      data-variant={variant}
    >
      <div className={cls.header} onClick={toggleAccordion}>
        <span>{title}</span>
        <Icon
          type={IconType.ArrowDown_24}
          width={variant === 'compact' ? 20 : 24}
          height={variant === 'compact' ? 20 : 24}
          className={clsx(cls.arrow, { [cls.flip]: isOpen })}
        />
      </div>
      <div className={clsx(cls.body, bodyClassName)}>{children}</div>
    </div>
  );
};
