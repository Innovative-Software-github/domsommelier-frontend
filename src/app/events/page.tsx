import { Layout } from '@/ui/Layout/Layout';
import { getEvents } from '../../services/events/requests';
import { EventsClient } from './components/EventsClient/EventsClient';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { DEFAULT_EVENTS_PAGE, DEFAULT_EVENTS_SIZE } from './constants';

export default async function EventsPage() {
  const events = await getEvents({
    page: DEFAULT_EVENTS_PAGE,
    size: DEFAULT_EVENTS_SIZE,
  });

  return (
    <Layout>
      <HeaderTitle title="Мероприятия" />
      <EventsClient initialEvents={events} />
    </Layout>
  );
}
