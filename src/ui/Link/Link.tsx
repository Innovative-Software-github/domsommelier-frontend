'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './Link.module.css';

type TNativeLinkAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type TLinkPosition = 'left' | 'right';
export type TLinkSize = 'small' | 'middle';

export interface ILinkProps extends TNativeLinkAttributes {
  children?: React.ReactNode;
  testId?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: TLinkPosition;
  size?: TLinkSize;
  disabled?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>(
  (
    {
      testId,
      id,
      className,
      icon,
      iconPosition = 'left',
      size = 'middle',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        {...props}
        ref={ref}
        id={id}
        className={classNames(styles.link, className)}
        data-testid={testId}
        aria-disabled={disabled}
        data-size={size}
      >
        <span className={styles.content} data-size={size}>
          {iconPosition === 'left' && icon}
          {children}
          {iconPosition === 'right' && icon}
        </span>
      </a>
    );
  },
);

Link.displayName = 'Link';
