import type { Metadata } from 'next';
import { Layout } from '@/ui/Layout/Layout';
import { getEvents } from '../../services/events/requests';
import { getSelectedCitySlug } from '../../services/city/serverRequest';
import { SITE_NAME } from '@/constants/site';
import { EventsClient } from './components/EventsClient/EventsClient';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { DEFAULT_EVENTS_PAGE, DEFAULT_EVENTS_SIZE } from './constants';

const EVENTS_DESCRIPTION = `Дегустации и винные казино от «${SITE_NAME}». Расписание, цены и регистрация.`;

export const metadata: Metadata = {
  title: 'Мероприятия',
  description: EVENTS_DESCRIPTION,
  alternates: { canonical: '/events' },
  openGraph: {
    type: 'website',
    url: '/events',
    title: `Мероприятия — ${SITE_NAME}`,
    description: EVENTS_DESCRIPTION,
  },
};

const EMPTY_EVENTS_PAGE = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  size: 0,
};

export default async function EventsPage() {
  const citySlug = await getSelectedCitySlug();
  // Сбой (сеть/таймаут) не должен ронять страницу — пустой список мероприятий
  // вместо краша, EventsClient уже отображает пустой список нормально.
  const events = await getEvents({
    page: DEFAULT_EVENTS_PAGE,
    size: DEFAULT_EVENTS_SIZE,
    city: citySlug,
  }).catch((error) => {
    console.warn('Failed to load events:', error);
    return EMPTY_EVENTS_PAGE;
  });

  return (
    <Layout>
      <HeaderTitle title="Мероприятия" />
      <EventsClient initialEvents={events} />
    </Layout>
  );
}
