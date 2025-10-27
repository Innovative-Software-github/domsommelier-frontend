import clsx from 'clsx'

import cls from './MethodContainer.module.scss';

export interface IMethodContainerProps extends React.PropsWithChildren {
  className?: string;
  selected: boolean;
  onSelect: () => void;
}

export const MethodContainer: React.FC<IMethodContainerProps> = ({
  className,
  selected,
  children,
  onSelect,
}) => (
  <div
    className={clsx(cls.container, className, {
      [cls.selected]: selected,
    })}
    data-selected={selected}
    onClick={onSelect}
  >
    {children}
  </div>
)