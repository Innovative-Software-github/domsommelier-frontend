'use client';

import * as React from "react";
import { IGetEventsRequest, IGetEventsResponse } from "../../../../services/events/interfaces";
import { EventBoard } from "../EventBoard/EventBoard";
import { EventDatePicker } from "../EventDatePicker/EventDatePicker";
import { EventFilters } from "../EventFilters/EventFilters";
import { getEvents } from "../../../../services/events/requests";
import { useDebouncedCallback } from "../../../../hooks/useDebouncedCallback";
import { DEFAULT_EVENTS_PAGE, DEFAULT_EVENTS_SIZE } from "../../page";

export interface IEventsClientProps {
  initialEvents: IGetEventsResponse;
}

export interface IFilters extends Omit<IGetEventsRequest, 'dateStart' | 'dateEnd'> {
  dateStart?: Date;
  dateEnd?: Date;
}

export const EventsClient: React.FC<IEventsClientProps> = ({
  initialEvents,
}) => {
  const [events, setEvents] = React.useState<IGetEventsResponse>(initialEvents);
  const [filters, setFilters] = React.useState<IFilters>({
    page: DEFAULT_EVENTS_PAGE,
    size: DEFAULT_EVENTS_SIZE,
  });

  const fetchEvents = React.useCallback(async (nextFilters: IFilters) => {
    try {
      const response = await getEvents({
        ...nextFilters,
        dateStart: nextFilters.dateStart
          ? nextFilters.dateStart.toISOString()
          : undefined,
        dateEnd: nextFilters.dateEnd
          ? nextFilters.dateEnd.toISOString()
          : undefined,
      });
      setEvents(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const debouncedFetchEvents = useDebouncedCallback(fetchEvents, 500);
  const immediateFetchEvents = useDebouncedCallback(fetchEvents, 0);

  const updateFilters = (field: keyof IFilters, value: any) => {
    setFilters((prev) => {
      const next = { ...prev, [field]: value, page: DEFAULT_EVENTS_PAGE };
      debouncedFetchEvents(next);
      return next;
    });
  };

  const setPage = (page: number) => {
    setFilters((prev) => {
      const next = { ...prev, page };
      immediateFetchEvents(next);

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  return (
    <>
      <EventDatePicker
        dateStart={filters.dateStart}
        dateEnd={filters.dateEnd}
        onDateStartChange={(date) => updateFilters("dateStart", date)}
        onDateEndChange={(date) => updateFilters("dateEnd", date)}
      />
      <EventFilters />
      <EventBoard eventsConfig={events} page={filters.page} onPageChange={setPage} />
    </>
  );
};