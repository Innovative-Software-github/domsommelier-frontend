'use client'

import { toast } from 'sonner';
import { IEvent } from '../../../../../services/events/interfaces';
import { Button } from '../../../../../ui/Button/Button';
import { ContentContainer } from '../../../../../ui/ContentContainer/ContentContainer';
import { formatDate, timeFormats } from '../../../../../utils/dates';
import { EventTypeTag } from '../../../components/EventTypeTag/EventTypeTag';
import { formatEventPrice } from '../../../utils/formatPrice';
import cls from './EventByIdHeader.module.scss';

export interface IEventByIdHeaderProps {
  event: IEvent;
}

const COVER_FALLBACK = '/largeEventImage.png';

/** Относительный url (как у productPhoto) проксируется через /api-back на бэкенд. */
function resolveCoverSrc(cover: string | null): string {
  if (!cover) {
    return COVER_FALLBACK;
  }
  return cover.startsWith('http') ? cover : `/api-back${cover}`;
}

export const EventByIdHeader: React.FC<IEventByIdHeaderProps> = ({ event }) => {
  const { price, title, dateTime } = event

  const formattedDate = formatDate(dateTime, timeFormats.dayMonthTime);

  const handleBuyTicket = () => {
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
      return;
    }
    toast.info('Регистрация на это мероприятие скоро откроется');
  };

  return (
    <div
      className={cls.wrapper}
      style={{
        backgroundImage: `url(${resolveCoverSrc(event.largeCover)})`,
      }}
    >
      <ContentContainer className={cls.content}>
        <div className={cls.infoContent}>
          <EventTypeTag type={event.type} />
          <h1 className={cls.title}>{title}</h1>
          <p className={cls.date}>Дата: {formattedDate}</p>
          <p className={cls.price}>Цена: {formatEventPrice(price)}</p>
        </div>
        <Button
          className={cls.buyTicketButton}
          variant="outlined"
          onClick={handleBuyTicket}
          >
            Купить билет
          </Button>
      </ContentContainer>
    </div>
  );
};