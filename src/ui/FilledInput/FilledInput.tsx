'use client';

import clsx from 'clsx';
import { IInputProps, Input } from '../Input/Input';
import cls from './FilledInput.module.scss';

export interface IFilledInput extends Omit<IInputProps, 'theme'> {}

export const FilledInput: React.FC<IFilledInput> = (props) => {
  return (
    <Input
      {...props}
      suffixClassName={cls.suffix}
      prefixClassName={cls.prefix}
      className={clsx(cls.filledInput, {
        [cls.dirty]: !!props.value,
      })}
      theme="gray"
    />
  );
};
