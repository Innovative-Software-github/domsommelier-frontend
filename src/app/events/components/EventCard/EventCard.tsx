import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../../../../constants/routes";
import { IEventCard } from "../../../../services/events/interfaces";
import { formatDate } from "./utils";
import styles from './EventCard.module.scss';

export interface IEventCardProps extends IEventCard {}

export const EventCard: React.FC<IEventCardProps> = ({
  id,
  type,
  price,
  dateTime,
  title,
  smallCover,
}) => {
  const { formattedDate, formattedTime } = formatDate(dateTime);

  return (
    <Link href={`${ROUTES.events}/${id}`} id={id} className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={smallCover} alt={title} fill className={styles.image} />
        <span className={styles.eventType}>{type}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.price}>
          {price > 0 ? `${price.toLocaleString()} ₽` : 'Бесплатно'}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>
          {formattedDate}, {formattedTime}
        </span>
      </div>
    </Link>
  );
};