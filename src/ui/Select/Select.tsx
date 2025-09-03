import { Dropdown } from "../Dropdown/Dropdown"
import { Icon } from "../Icon/Icon";
import { IconType } from "../Icon/IconsMapping";
import cls from './Select.module.scss';
import { SelectItem } from './SelectItem/SelectItem';

export interface ISelectOptions {
  key: string;
  value: string;
}

export interface ISelectProps {
  anchor: React.ReactNode;
  options: ISelectOptions[];
  selectedOption?: ISelectOptions;
  onSelect: (option: ISelectOptions) => void;
}

export const Select: React.FC<ISelectProps> = ({
  anchor,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <Dropdown>
      <Dropdown.Anchor className={cls.anchor}>
        {selectedOption?.value ?? anchor}
        <Icon type={IconType.ArrowDown_24} />
      </Dropdown.Anchor>
      <Dropdown.Popover
        gutter={12}
        flip={false}
        className={cls.popover}
      >
        {options.map((option) => (
          <SelectItem
            key={option.key}
            optionKey={option.key}
            value={option.value}
            onClick={onSelect}
          />
        ))}
      </Dropdown.Popover>
    </Dropdown>
  )
}