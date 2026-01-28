import * as React from 'react';
import clsx from 'clsx';

import cls from './Backdrop.module.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useBackdropClose } from '../../hooks/useBackdropClose';

export type TBackdropAnimation = 'none' | 'rightSide' | 'center';

export interface IBackdrop extends React.PropsWithChildren {
  isOpen: boolean;

  backdropClassName?: string;
  contentClassName?: string;

  animation?: TBackdropAnimation;

  withCancelIcon?: boolean;
  onClickCancelIcon?: () => void;

  title?: string;
  titleClassName?: string;
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
      title,
      titleClassName,
      children,
    },
    ref,
  ) => {
    useBodyScrollLock(isOpen);

    const backdropRef = useBackdropClose(() => {
      if (onClickCancelIcon) {
        onClickCancelIcon();
      }
    });

    const handleKeyDown = React.useCallback(
      (e: KeyboardEvent) => {
        if (onClickCancelIcon && e.key === 'Escape') {
          onClickCancelIcon();
        }
      },
      [onClickCancelIcon],
    );

    React.useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, handleKeyDown]);

    return (
      <div
        ref={(node) => {
          // Поддержка передачи ref снаружи и своего рефа из useBackdropClose
          if (typeof ref === 'function') ref(node);
          (
            backdropRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }}
        className={clsx(cls.backdrop, backdropClassName, {
          [cls.open]: isOpen,
        })}
        data-animation={animation}
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
              {title && <h2 className={clsx(cls.title, titleClassName)}>{title}</h2>}
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
    );
  },
);

Backdrop.displayName = 'Backdrop';
