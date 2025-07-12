import { IEventCard } from "../../../../services/events/interfaces";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { EventCard } from "../EventCard/EventCard";
import styles from './EventBoard.module.scss';

export interface IEventBoardProps {
  events: IEventCard[];
}

export const EventBoard: React.FC<IEventBoardProps> = ({ events }) => {
  return (
    <ContentContainer className={styles.container}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </ContentContainer>
  );
};