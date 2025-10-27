import clsx from 'clsx';

import cls from './BlockContainer.module.scss';

export interface IBlockContainerProps extends React.PropsWithChildren {
  className?: string;
}

export const BlockContainer: React.FC<IBlockContainerProps> = ({
  className,
  children,
}) => (
  <div className={clsx(cls.container, className)}>{children}</div>
);
