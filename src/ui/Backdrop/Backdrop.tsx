import * as React from 'react';
import clsx from 'clsx';

import cls from './Backdrop.module.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';

export type BackdropAnimation = 'none' | 'rightSide';

export interface IBackdrop extends React.PropsWithChildren {
  isOpen: boolean;

  backdropClassName?: string;
  contentClassName?: string;

  animation?: BackdropAnimation;

  withCancelIcon?: boolean;
  onClickCancelIcon?: () => void;
}

export const Backdrop = React.forwardRef<HTMLDivElement, IBackdrop>(
  (
    {
      backdropClassName,
      contentClassName,
      isOpen,
      animation = 'none',
      withCancelIcon,
      onClickCancelIcon,
      children,
    },
    ref,
  ) => (
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
        data-animation={animation}
        data-open={isOpen}
      >
        {withCancelIcon && (
          <header className={cls.header}>
            <button
              type="button"
              className={cls.closeButton}
              onClick={onClickCancelIcon}
            >
              <Icon type={IconType.Cancel_24} width={24} height={24} />
            </button>
          </header>
        )}

        {children}
      </div>
    </div>
  ),
);

Backdrop.displayName = 'Backdrop';
