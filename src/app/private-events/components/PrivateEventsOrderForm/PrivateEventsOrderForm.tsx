'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { createEventOrder } from '@/services/eventOrders/requests';

import cls from './PrivateEventsOrderForm.module.scss';

export const PrivateEventsOrderForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!name.trim() || !phone.trim()) {
      toast.error('Укажите имя и номер телефона.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createEventOrder({ name: name.trim(), phone: phone.trim() });
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      setName('');
      setPhone('');
    } catch {
      toast.error('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentContainer className={cls.container}>
      <div id="order" className={cls.wrap}>
        <form className={cls.form} onSubmit={handleSubmit}>
          <div className={cls.header}>
            <p className={cls.title}>Заказать мероприятие</p>
            <p className={cls.subtitle}>
              Винная дегустация — это увлекательный процесс, который позволяет
              не только насладиться разнообразием вин, но и углубить свои знания
              о культуре виноделия.
            </p>
          </div>

          <div className={cls.fields}>
            <input
              className={cls.input}
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={cls.input}
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="outlined"
            className={cls.submit}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Заказать мероприятие
          </Button>
        </form>

        <div className={cls.image}>
          <Image
            src="/private-events/hero.png"
            alt="Заказать мероприятие"
            fill
            sizes="(max-width: 991px) 100vw, 640px"
          />
        </div>
      </div>
    </ContentContainer>
  );
};
