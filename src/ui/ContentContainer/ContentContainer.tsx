import React from 'react';
import clsx from 'clsx';

import cls from './ContentContainer.module.scss';

export interface IContentContainerProps extends React.PropsWithChildren {
  className?: string;
}

export const ContentContainer: React.FC<IContentContainerProps> = ({
  children,
  className,
}) => {
  return <div className={clsx(cls.container, className)}>{children}</div>;
};
