import React from 'react';

import { Input } from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';

import cls from '../AuthModal.module.scss';

interface IEmailStepProps {
  email: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailStep: React.FC<IEmailStepProps> = ({
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
}) => {
  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <p className={cls.description}>
        Введите вашу почту для входа в личный кабинет
      </p>

      <Input
        type="email"
        placeholder="Электронная почта"
        value={email}
        onChange={onEmailChange}
        errorText={error}
        autoComplete="email"
      />

      <Button
        type="submit"
        variant="default"
        height="H-50"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Получить код
      </Button>
    </form>
  );
};

