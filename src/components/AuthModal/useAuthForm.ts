import React from 'react';
import { useDispatch } from 'react-redux';

import { authInitiate, authConfirm } from '@/services/auth/requests';
import { loginAction } from '@/store/auth/actions';

type TAuthStep = 'email' | 'code';

export const useAuthForm = (onSuccess: () => void) => {
  const dispatch = useDispatch();

  const [step, setStep] = React.useState<TAuthStep>('email');
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (error) setError('');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Введите адрес электронной почты');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Некорректный адрес электронной почты');
      return;
    }

    setIsLoading(true);

    const response = await authInitiate(email);

    setIsLoading(false);

    if (response.error) {
      setError('Не удалось отправить код. Попробуйте ещё раз');
      return;
    }

    setStep('code');
    setError('');
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError('Введите код из письма');
      return;
    }

    setIsLoading(true);

    const response = await authConfirm(email, code);

    setIsLoading(false);

    if (response.error || !response.data) {
      setError('Неверный код. Попробуйте ещё раз');
      return;
    }

    const { token, customerId, firstName, secondName } = response.data;

    dispatch(loginAction({
      token,
      customer: { id: customerId, email, firstName, secondName },
    }));

    onSuccess();
  };

  const handleBackToEmail = () => {
    setStep('email');
    setCode('');
    setError('');
  };

  const reset = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setError('');
    setIsLoading(false);
  };

  return {
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
  };
};

