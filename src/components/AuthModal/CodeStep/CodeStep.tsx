import React from 'react';

import { Input } from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';

import cls from '../AuthModal.module.scss';

interface ICodeStepProps {
  email: string;
  code: string;
  error: string;
  isLoading: boolean;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToEmail: () => void;
}

export const CodeStep: React.FC<ICodeStepProps> = ({
  email,
  code,
  error,
  isLoading,
  onCodeChange,
  onSubmit,
  onBackToEmail,
}) => {
  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <p className={cls.description}>
        Мы отправили код подтверждения на <strong>{email}</strong>
      </p>

      <Input
        type="text"
        placeholder="Код из письма"
        value={code}
        onChange={onCodeChange}
        errorText={error}
        autoComplete="one-time-code"
      />

      <Button
        type="submit"
        variant="default"
        height="H-50"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Войти
      </Button>

      <button
        type="button"
        className={cls.backButton}
        onClick={onBackToEmail}
      >
        Изменить почту
      </button>
    </form>
  );
};

