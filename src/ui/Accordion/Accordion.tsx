import React from 'react';
import clsx from 'clsx';

import cls from './Accordion.module.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';

export interface IAccordion extends React.PropsWithChildren {
  title: string;
  isDefaultOpen?: boolean;
  className?: string;
  bodyClassName?: string;
}

export const Accordion: React.FC<IAccordion> = ({
  title,
  isDefaultOpen = false,
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
    >
      <div className={cls.header} onClick={toggleAccordion}>
        <span>{title}</span>
        <Icon
          type={IconType.ArrowDown_24}
          width={24}
          height={24}
          className={clsx(cls.arrow, { [cls.flip]: isOpen })}
        />
      </div>
      <div className={clsx(cls.body, bodyClassName)}>{children}</div>
    </div>
  );
};
