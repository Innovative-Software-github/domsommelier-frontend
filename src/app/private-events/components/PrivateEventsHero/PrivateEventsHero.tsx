'use client';

import Image from 'next/image';

import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';

import cls from './PrivateEventsHero.module.scss';

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
};

export const PrivateEventsHero: React.FC = () => {
  return (
    <ContentContainer className={cls.container}>
      <div className={cls.head}>
        <h1 className={cls.title}>
          <span>Заказ</span>
          <span>Мероприятия</span>
        </h1>
        <p className={cls.intro}>
          Винная дегустация — это увлекательный процесс, который позволяет не
          только насладиться разнообразием вин
        </p>
      </div>

      <div className={cls.image}>
        <Image
          src="/private-events/hero.png"
          alt="Заказ мероприятия"
          fill
          sizes="1280px"
          priority
        />
      </div>

      <Button className={cls.cta} height="H-50" onClick={scrollToOrder}>
        Заказать мероприятие
      </Button>
    </ContentContainer>
  );
};
