import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../../../../constants/routes";
import { IEventCard } from "../../../../services/events/interfaces";

import { EventTypeTag } from "../EventTypeTag/EventTypeTag";
import styles from './EventCard.module.scss';
import { formatDate, timeFormats } from "../../../../utils/dates";
import { formatEventPrice } from "../../utils/formatPrice";

export interface IEventCardProps extends IEventCard {}

/** Плейсхолдер, если у мероприятия ещё не загружено ни одного фото. */
const COVER_FALLBACK = '/eventImage.png';

/** Относительный url (как у productPhoto) проксируется через /api-back на бэкенд. */
function resolveCoverSrc(cover: string | null): string {
  if (!cover) {
    return COVER_FALLBACK;
  }
  return cover.startsWith('http') ? cover : `/api-back${cover}`;
}

export const EventCard: React.FC<IEventCardProps> = ({
  id,
  type,
  price,
  dateTime,
  title,
  smallCover,
}) => {
  const formattedDate = formatDate(dateTime, timeFormats.dayMonthTime);
  const [src, setSrc] = React.useState(resolveCoverSrc(smallCover));

  return (
    <Link href={`${ROUTES.events}/${id}`} id={id} className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={src}
          alt={title}
          fill
          priority
          onError={() => setSrc(COVER_FALLBACK)}
        />
        <EventTypeTag type={type} className={styles.eventType} />
      </div>
      <div className={styles.content}>
        <p className={styles.price}>
          {formatEventPrice(price)}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>
          {formattedDate}
        </span>
      </div>
    </Link>
  );
};