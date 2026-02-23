'use client';

import React from 'react';

import { Backdrop } from '@/ui/Backdrop/Backdrop';
import { useAuthModal } from './AuthModalContext';
import { useAuthForm } from './useAuthForm';
import { EmailStep } from './EmailStep/EmailStep';
import { CodeStep } from './CodeStep/CodeStep';

import cls from './AuthModal.module.scss';

export const AuthModal: React.FC = () => {
  const { isOpen, closeAuthModal } = useAuthModal();

  const {
    step,
    email,
    code,
    error,
    isLoading,
    handleEmailChange,
    handleCodeChange,
    handleEmailSubmit,
    handleCodeSubmit,
    handleBackToEmail,
    reset,
  } = useAuthForm(closeAuthModal);

  const handleClose = () => {
    reset();
    closeAuthModal();
  };

  return (
    <Backdrop
      isOpen={isOpen}
      animation="center"
      withCancelIcon
      onClickCancelIcon={handleClose}
      title="Вход"
      contentClassName={cls.modal}
      titleClassName={cls.title}
    >
      {step === 'email' && (
        <EmailStep
          email={email}
          error={error}
          isLoading={isLoading}
          onEmailChange={handleEmailChange}
          onSubmit={handleEmailSubmit}
        />
      )}

      {step === 'code' && (
        <CodeStep
          email={email}
          code={code}
          error={error}
          isLoading={isLoading}
          onCodeChange={handleCodeChange}
          onSubmit={handleCodeSubmit}
          onBackToEmail={handleBackToEmail}
        />
      )}
    </Backdrop>
  );
};
