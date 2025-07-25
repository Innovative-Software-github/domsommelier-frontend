import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../../../../constants/routes";
import { IEventCard } from "../../../../services/events/interfaces";

import { EventTypeTag } from "../EventTypeTag/EventTypeTag";
import styles from './EventCard.module.scss';
import { formatDate, timeFormats } from "../../../../utils/dates";
import { formatEventPrice } from "../../utils/formatPrice";


export interface IEventCardProps extends IEventCard {}

export const EventCard: React.FC<IEventCardProps> = ({
  id,
  type,
  price,
  dateTime,
  title,
  smallCover,
}) => {
  const formattedDate = formatDate(dateTime, timeFormats.dayMonthTime);

  return (
    <Link href={`${ROUTES.events}/${id}`} id={id} className={styles.container}>
      <div className={styles.imageContainer}>
        {/* TODO: Заменить на smallCover, когда будут приходить ссылки */}
        <Image
          className={styles.image}
          src={"/eventImage.png"}
          alt={title}
          fill
          priority
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