'use client';

import React from "react";
import { IEventCard } from "../../../../services/events/interfaces";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { Pagination } from "../../../../ui/Pagination/Pagination";
import { EventCard } from "../EventCard/EventCard";
import styles from './EventBoard.module.scss';

export interface IEventBoardProps {
  events: IEventCard[];
}

export const EventBoard: React.FC<IEventBoardProps> = ({ events }) => {
  const [page, setPage] = React.useState(1);

  console.log(page);

  return (
    <ContentContainer className={styles.container}>
      <div className={styles.events}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      <Pagination
        className={styles.pagination}
        count={10}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        onChange={setPage}
      />
    </ContentContainer>
  );
};