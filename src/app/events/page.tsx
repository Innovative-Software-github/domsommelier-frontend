import { Layout } from '@/ui/Layout/Layout';
import { EventHeader } from './components/EventHeader/EventHeader';
import { getEvents } from '../../services/events/requests';
import { EventsClient } from './components/EventsClient/EventsClient';

export const DEFAULT_EVENTS_SIZE = 9;
export const DEFAULT_EVENTS_PAGE = 0;

export default async function EventsPage() {
  const events = await getEvents({
    page: DEFAULT_EVENTS_PAGE,
    size: DEFAULT_EVENTS_SIZE,
  });

  return (
    <Layout>
      <EventHeader />
      <EventsClient initialEvents={events} />
    </Layout>
  );
}
