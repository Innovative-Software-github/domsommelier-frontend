'use client'

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

export const EventByIdHeader: React.FC<IEventByIdHeaderProps> = ({ event }) => {
  const { price, title, dateTime } = event

  const formattedDate = formatDate(dateTime, timeFormats.dayMonthTime);

  return (
    <div
      className={cls.wrapper}
      style={{
        backgroundImage: `url(/largeEventImage.png)`,
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
          onClick={() => alert('Пашол нахуй')}
          >
            Купить билет
          </Button>
      </ContentContainer>
    </div>
  );
};