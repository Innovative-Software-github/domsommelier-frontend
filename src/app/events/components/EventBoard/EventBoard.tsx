'use client';

import React from "react";
import { IGetEventsResponse } from "../../../../services/events/interfaces";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { Pagination } from "../../../../ui/Pagination/Pagination";
import { EventCard } from "../EventCard/EventCard";
import styles from './EventBoard.module.scss';

export interface IEventBoardProps {
  eventsConfig: IGetEventsResponse;
  page: number;
  onPageChange: (page: number) => void;
}

export const EventBoard: React.FC<IEventBoardProps> = ({ eventsConfig, page, onPageChange }) => {
  const { content: events, totalPages} = eventsConfig;

  return (
    <ContentContainer className={styles.container}>
      <div className={styles.events}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {totalPages > 1 && <Pagination
        className={styles.pagination}
        count={totalPages}
        page={page + 1}
        siblingCount={1}
        boundaryCount={1}
        onChange={(page) => onPageChange(page - 1)}
      />}
    </ContentContainer>
  );
};