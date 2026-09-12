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
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(event) => {
      // div с onClick не фокусируется и не активируется с клавиатуры сам по
      // себе — без этого выбрать способ доставки/оплаты клавиатурой или
      // скринридером было нельзя.
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect();
      }
    }}
  >
    {children}
  </div>
)