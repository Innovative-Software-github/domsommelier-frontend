import { Hovercard, HovercardArrow } from '@ariakit/react';
import { clsx } from 'clsx';
import { IPopoverContentProps } from '../interfaces';

import cls from './PopoverContent.module.scss';

export const PopoverContent: React.FC<IPopoverContentProps> = ({
  children,
  className,
  showArrow = false,
  ...props
}) => {
  return (
    <Hovercard
      gutter={showArrow ? 12 : 8}
      className={clsx(cls.content, className)}
      {...props}
    >
      {showArrow && <HovercardArrow className={cls.arrow} />}
      {children}
    </Hovercard>
  );
};

