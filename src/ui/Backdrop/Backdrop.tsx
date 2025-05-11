import * as React from 'react';
import clsx from 'clsx';

import cls from './Backdrop.module.scss';

export interface IBackdrop extends React.PropsWithChildren {
  backdropClassName?: string;
  contentClassName?: string;
  isOpen: boolean;
}

export const Backdrop = React.forwardRef<HTMLDivElement, IBackdrop>(
  ({ backdropClassName, contentClassName, isOpen, children }, ref) => (
    <div
      ref={ref}
      className={clsx(cls.backdrop, backdropClassName, { [cls.open]: isOpen })}
      role="dialog"
      aria-modal="true"
      aria-labelledby="Backdrop-modal"
    >
      <div
        className={clsx(cls.container, contentClassName)}
        data-modal
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  ),
);

Backdrop.displayName = 'Backdrop';
