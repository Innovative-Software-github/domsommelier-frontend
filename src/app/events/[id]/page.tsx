
import { getEventById } from '../../../services/events/requests';
import { Layout } from '../../../ui/Layout/Layout';
import { EventByIdHeader } from './components/EventByIdHeader/EventByIdHeader';
import { EventByIdInformation } from './components/EventByIdInformation/EventByIdInformation';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventById(id);

  return (
    <Layout footerTheme="wineRed">
      <EventByIdHeader event={event} />
      <EventByIdInformation eventType={event.type} />
    </Layout>
  );
}
