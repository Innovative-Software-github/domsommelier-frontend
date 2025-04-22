import * as React from 'react';
import { clsx } from 'clsx';

import cls from './Switch.module.scss';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';

type TLabelPosition = 'start' | 'end';
type TSwitchSize = 'small' | 'medium';
type TSwitchVariant = 'default' | 'thin' | 'square';

type TSwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'size' | 'id'
> & {
  checked: boolean;
  size?: TSwitchSize;
  variant?: TSwitchVariant;
  label?: string;
  labelClassName?: string;
  labelPosition?: TLabelPosition;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const DISPLAY_NAME = 'Switch';

export const Switch: React.FC<TSwitchProps> = (props) => {
  const {
    className,
    checked,
    disabled,
    size = 'medium',
    variant = 'default',
    label,
    labelClassName,
    labelPosition = 'end',
    onChange,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const uniqId = React.useId();

  const renderLabel = () => {
    if (!label) {
      return null;
    }

    return (
      <label htmlFor={uniqId} className={clsx(cls.label, labelClassName)}>
        {label}
      </label>
    );
  };

  return (
    <span
      className={clsx(cls.wrapper, className, {
        [cls.checked]: checked,
        [cls.disabled]: disabled,
      })}
      data-size={size}
      data-variant={variant}
    >
      {labelPosition === 'start' && renderLabel()}
      <span
        className={cls.switchControlWrapper}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          ref={inputRef}
          className={cls.switchControl}
          id={uniqId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span
          className={cls.circle}
          onClick={() => {
            inputRef.current?.click();
          }}
        />
      </span>
      {labelPosition === 'end' && renderLabel()}
    </span>
  );
};

Switch.displayName = DISPLAY_NAME;
