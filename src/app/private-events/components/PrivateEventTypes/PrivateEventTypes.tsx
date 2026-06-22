import Image from 'next/image';

import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';

import { EVENT_TYPES } from '../../constants';
import cls from './PrivateEventTypes.module.scss';

export const PrivateEventTypes: React.FC = () => {
  return (
    <ContentContainer className={cls.container}>
      <h2 className={cls.heading}>Виды мероприятий</h2>

      <div className={cls.grid}>
        {EVENT_TYPES.map((eventType) => (
          <article key={eventType.id} className={cls.card}>
            <div className={cls.cardImage}>
              <Image
                src="/eventImage.png"
                alt={eventType.title}
                fill
                sizes="(max-width: 767px) 100vw, 420px"
              />
            </div>
            <div className={cls.cardBody}>
              <h3 className={cls.cardTitle}>{eventType.title}</h3>
              <p className={cls.cardText}>{eventType.description}</p>
            </div>
            <a className={cls.cardLink} href="#order">
              Подробнее
            </a>
          </article>
        ))}

        <article className={`${cls.card} ${cls.suggestCard}`}>
          <h3 className={cls.cardTitle}>
            Предложить
            <br />
            свою идею
          </h3>
          <p className={cls.cardText}>
            Винная дегустация — это увлекательный процесс, который позволяет
          </p>
        </article>
      </div>
    </ContentContainer>
  );
};
