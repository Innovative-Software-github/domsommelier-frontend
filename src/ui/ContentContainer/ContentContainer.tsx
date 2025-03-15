import clsx from 'clsx';

import cls from './ContentContainer.module.scss';

export interface IContentContainer extends React.PropsWithChildren {
  className?: string;
}

export const ContentContainer: React.FC<IContentContainer> = ({
  className,
  children,
}) => {
  return <div className={clsx(cls.container, className)}>{children}</div>;
};
