import { Layout } from '@/ui/Layout/Layout';
import { getEvents } from '../../services/events/requests';
import { getSelectedCitySlug } from '../../services/city/serverRequest';
import { EventsClient } from './components/EventsClient/EventsClient';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { DEFAULT_EVENTS_PAGE, DEFAULT_EVENTS_SIZE } from './constants';

export default async function EventsPage() {
  const citySlug = await getSelectedCitySlug();
  const events = await getEvents({
    page: DEFAULT_EVENTS_PAGE,
    size: DEFAULT_EVENTS_SIZE,
    city: citySlug,
  });

  return (
    <Layout>
      <HeaderTitle title="Мероприятия" />
      <EventsClient initialEvents={events} />
    </Layout>
  );
}
