import cls from './SelectItem.module.scss';
import { usePopoverContext } from '@ariakit/react';

export interface ISelectItemProps {
  value: string;
  optionKey: string;
  onClick?: (option: { key: string; value: string }) => void;
}

export const SelectItem: React.FC<ISelectItemProps> = ({
  value,
  optionKey,
  onClick,
}) => {
  const popover = usePopoverContext();

  const handleClick = () => {
    onClick?.({ key: optionKey, value });
    popover?.hide();
  };

  return (
    <div className={cls.item} onClick={handleClick}>
      {value}
    </div>
  )
}
